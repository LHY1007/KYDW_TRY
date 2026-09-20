"""Replace KYDW group 1, group 2 and project QR assets using fixed templates.

The WeChat screenshots used for the two group QR codes have stable dimensions
and QR locations.  This tool keeps those coordinates in one place so future
updates do not require manual cropping or a site-wide search.

Examples
--------
    python tools/update_contact_qr.py --announcement "D:/path/new-announcement.jpg"
    python tools/update_contact_qr.py --project "D:/path/new-project.jpg"
    python tools/update_contact_qr.py --group1 "..." --group2 "..." --project "..."
    python tools/update_contact_qr.py announcement "D:/path/new-announcement.jpg"

Use ``--dry-run`` to validate a screenshot and preview the generated asset
without changing the repository.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import shutil
import sys
import tempfile
from dataclasses import dataclass
from datetime import datetime
from io import BytesIO
from pathlib import Path
from typing import Iterable

from PIL import Image, ImageChops


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_SIZE = (759, 759)


@dataclass(frozen=True)
class QrTemplate:
    key: str
    label: str
    aliases: tuple[str, ...]
    source_size: tuple[int, int]
    crop_box: tuple[int, int, int, int]
    target: Path


TEMPLATES = {
    "group1": QrTemplate(
        key="group1",
        label="KYDW 项目公告群（一群）",
        aliases=("group1", "一群", "1群", "公告一群", "科研实习项目发布"),
        source_size=(1059, 1487),
        crop_box=(150, 486, 909, 1245),
        target=Path("assets/contact/project-announcement-group1-qr-cropped.png"),
    ),
    "announcement": QrTemplate(
        key="announcement",
        label="KYDW 项目公告群（二群）",
        aliases=(
            "group2",
            "二群",
            "2群",
            "公告二群",
            "科研实习项目发布2群",
            "announcement",
            "project-announcement",
            "projectannouncement",
            "公告群",
            "公告群二维码",
            "项目公告群",
            "项目公告群二维码",
            "ky项目公告群",
            "kydw项目公告群",
            "kydw项目公告群新二群",
            "kydw项目公告群二维码",
            "kydw项目公告群新二群二维码",
        ),
        source_size=(1059, 1532),
        crop_box=(150, 531, 909, 1290),
        target=Path("assets/contact/project-announcement-qr-cropped.png"),
    ),
    "project": QrTemplate(
        key="project",
        label="KYDW 本科生科研入门体验项目群",
        aliases=(
            "project",
            "project-group",
            "projectgroup",
            "project-group-qr",
            "experience",
            "体验项目群",
            "体验项目群二维码",
            "项目专属群",
            "项目专属群二维码",
            "项目群",
            "本科生科研入门体验项目",
            "本科生科研入门体验项目二维码",
            "kydw26夏本科生科研入门体验项目",
            "kydw26夏本科生科研入门体验项目二维码",
        ),
        source_size=(1059, 1532),
        crop_box=(150, 531, 909, 1290),
        target=Path("assets/contact/project-group-qr-cropped.png"),
    ),
}


@dataclass
class PreparedUpdate:
    template: QrTemplate
    source: Path
    image: Image.Image
    png_bytes: bytes
    source_sha256: str
    output_sha256: str
    target_sha256: str | None
    unchanged: bool


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def sha256_file(path: Path) -> str:
    return sha256_bytes(path.read_bytes())


def normalize_group(value: str) -> str:
    """Normalize a group name while retaining Chinese characters."""

    return re.sub(r"[\s_\-—–:：()（）·]+", "", value).casefold()


def resolve_template(group: str) -> QrTemplate:
    normalized = normalize_group(group)
    for template in TEMPLATES.values():
        if normalized == normalize_group(template.key):
            return template
        if any(normalized == normalize_group(alias) for alias in template.aliases):
            return template
    valid = ", ".join(sorted(TEMPLATES))
    raise ValueError(f"无法识别群名 {group!r}；可用群名：{valid}")


def encode_png(image: Image.Image) -> bytes:
    buffer = BytesIO()
    image.save(buffer, format="PNG", optimize=False)
    return buffer.getvalue()


def prepare_update(template: QrTemplate, source: Path, root: Path) -> PreparedUpdate:
    source = source.expanduser().resolve()
    if not source.is_file():
        raise FileNotFoundError(f"找不到输入图片：{source}")

    target = root / template.target
    if not target.parent.is_dir():
        raise FileNotFoundError(f"找不到官网资源目录：{target.parent}")

    try:
        with Image.open(source) as opened:
            source_size = opened.size
            if source_size != template.source_size:
                expected = "×".join(map(str, template.source_size))
                actual = "×".join(map(str, source_size))
                raise ValueError(
                    f"{template.label}输入尺寸为 {actual}，模板要求 {expected}；"
                    "未执行任何替换。"
                )
            # The input is a screenshot rather than a transparent web asset.
            # RGB also makes the output deterministic for JPG and PNG inputs.
            image = opened.convert("RGB")

    except OSError as exc:
        raise ValueError(f"无法读取输入图片：{source}（{exc}）") from exc

    left, top, right, bottom = template.crop_box
    if (right - left, bottom - top) != OUTPUT_SIZE:
        raise ValueError(f"模板 {template.key} 的裁剪框不是 {OUTPUT_SIZE[0]}×{OUTPUT_SIZE[1]}：{template.crop_box}")
    if not (0 <= left < right <= image.width and 0 <= top < bottom <= image.height):
        raise ValueError(f"模板 {template.key} 的裁剪框超出输入图片边界：{template.crop_box}")

    cropped = image.crop(template.crop_box)
    if cropped.size != OUTPUT_SIZE:
        raise ValueError(f"裁剪结果尺寸异常：{cropped.size}")
    png_bytes = encode_png(cropped)

    # Reopen the encoded bytes so a future Pillow change cannot silently emit
    # an unexpected format or size.
    with Image.open(BytesIO(png_bytes)) as encoded:
        if encoded.format != "PNG" or encoded.size != OUTPUT_SIZE:
            raise ValueError(f"PNG 输出校验失败：format={encoded.format}, size={encoded.size}")
        encoded_rgb = encoded.convert("RGB")

    unchanged = False
    if target.is_file():
        with Image.open(target) as current:
            current_rgb = current.convert("RGB")
            unchanged = current_rgb.size == OUTPUT_SIZE and ImageChops.difference(current_rgb, encoded_rgb).getbbox() is None

    return PreparedUpdate(
        template=template,
        source=source,
        image=cropped,
        png_bytes=png_bytes,
        source_sha256=sha256_file(source),
        output_sha256=sha256_bytes(png_bytes),
        target_sha256=sha256_file(target) if target.is_file() else None,
        unchanged=unchanged,
    )


def parse_updates(args: argparse.Namespace) -> list[tuple[QrTemplate, Path]]:
    updates: list[tuple[QrTemplate, Path]] = []
    if args.group1 is not None:
        updates.append((TEMPLATES["group1"], args.group1))
    if args.announcement is not None:
        updates.append((TEMPLATES["announcement"], args.announcement))
    if args.project is not None:
        updates.append((TEMPLATES["project"], args.project))

    positional_given = args.group is not None or args.image is not None
    if positional_given:
        if not (args.group is not None and args.image is not None):
            raise ValueError("位置参数必须同时提供群名和图片路径，例如：announcement <图片路径>")
        if updates:
            raise ValueError("位置参数与 --announcement/--project 不能混用")
        updates.append((resolve_template(args.group), args.image))

    if not updates:
        raise ValueError("请提供 --group1、--group2、--project，或使用 <群名> <图片路径>")

    keys = [template.key for template, _ in updates]
    if len(keys) != len(set(keys)):
        raise ValueError("同一群名不能在一次调用中重复提供")
    return updates


def print_prepared(update: PreparedUpdate, root: Path) -> None:
    template = update.template
    target = root / template.target
    print(f"[{template.key}] {template.label}")
    print(f"  输入：{update.source}")
    print(f"  输入 SHA-256：{update.source_sha256}")
    print(f"  固定裁剪框：{template.crop_box} → {OUTPUT_SIZE[0]}×{OUTPUT_SIZE[1]} PNG")
    print(f"  输出 SHA-256：{update.output_sha256}")
    print(f"  目标：{target}")
    print(f"  当前目标 SHA-256：{update.target_sha256}")
    print(f"  状态：{'unchanged（像素未变化）' if update.unchanged else '待替换'}")


def make_backup_dir(root: Path) -> Path:
    stamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    base = root / "_codex_state" / "backups" / f"qr-update-{stamp}"
    backup_dir = base
    suffix = 2
    while backup_dir.exists():
        backup_dir = root / "_codex_state" / "backups" / f"qr-update-{stamp}-{suffix}"
        suffix += 1
    backup_dir.mkdir(parents=True, exist_ok=False)
    return backup_dir


def atomic_write(path: Path, data: bytes) -> None:
    fd, temp_name = tempfile.mkstemp(prefix=f".{path.stem}.", suffix=".tmp", dir=path.parent)
    temp_path = Path(temp_name)
    try:
        with os.fdopen(fd, "wb") as handle:
            handle.write(data)
            handle.flush()
            os.fsync(handle.fileno())
        os.replace(temp_path, path)
    finally:
        if temp_path.exists():
            temp_path.unlink()


def apply_updates(updates: Iterable[PreparedUpdate], root: Path) -> Path | None:
    changed = [update for update in updates if not update.unchanged]
    if not changed:
        print("没有需要替换的 canonical 资源，未创建备份，也未修改文件。")
        return None

    backup_dir = make_backup_dir(root)
    manifest: dict[str, object] = {
        "created_at": datetime.now().isoformat(timespec="seconds"),
        "tool": "tools/update_contact_qr.py",
        "output_size": list(OUTPUT_SIZE),
        "updates": [],
    }

    for update in changed:
        target = root / update.template.target
        backup_target = backup_dir / target.name
        if target.is_file():
            shutil.copy2(target, backup_target)
        atomic_write(target, update.png_bytes)
        manifest["updates"].append(
            {
                "group": update.template.key,
                "label": update.template.label,
                "source": str(update.source),
                "source_sha256": update.source_sha256,
                "crop_box": list(update.template.crop_box),
                "target": str(update.template.target),
                "backup": backup_target.name if backup_target.is_file() else None,
                "old_target_sha256": update.target_sha256,
                "new_target_sha256": sha256_file(target),
            }
        )

    (backup_dir / "manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(f"已备份并替换 {len(changed)} 个 canonical 资源：{backup_dir}")
    return backup_dir


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="按固定模板更新 KYDW 一群、二群和体验项目群二维码；输入尺寸不符时会拒绝修改。"
    )
    parser.add_argument("group", nargs="?", help="群名别名：group1/group2/project 或中文群名")
    parser.add_argument("image", nargs="?", type=Path, help="完整微信截图路径")
    parser.add_argument("--group1", type=Path, help="项目公告一群完整截图路径")
    parser.add_argument("--group2", "--announcement", dest="announcement", type=Path, help="项目公告二群完整截图路径")
    parser.add_argument("--project", type=Path, help="本科生科研入门体验项目群完整截图路径")
    parser.add_argument("--dry-run", action="store_true", help="只校验和预览，不修改官网资源")
    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    try:
        requested = parse_updates(args)
        prepared = [prepare_update(template, source, ROOT) for template, source in requested]
        for update in prepared:
            print_prepared(update, ROOT)
        if args.dry_run:
            print("dry-run：未修改官网资源。")
            return 0
        apply_updates(prepared, ROOT)
        return 0
    except (FileNotFoundError, OSError, ValueError) as exc:
        print(f"错误：{exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
