"""将 KYDW 体验版与进阶版项目材料导入网站副本。

原始材料只读；本脚本只写入仓库中的明确目标目录。
公开项目编号保持 00--05，现有站内文件名 project-01--project-06 保持不变，
避免已发布链接失效。进阶材料只有 01--05，对应站内 project-02--project-06。
"""

from __future__ import annotations

import argparse
import hashlib
import re
import shutil
from pathlib import Path

import markdown
from bs4 import BeautifulSoup


EXPERIENCE_MAPPING = [(f"{number:02d}", f"{number + 1:02d}") for number in range(6)]
ADVANCED_MAPPING = [(f"{number:02d}", f"{number + 1:02d}") for number in range(1, 6)]

EXTERNAL_ASSET_MAP = {
    "https://upload.wikimedia.org/wikipedia/commons/2/26/MRI_Brain_T1_Axial_%2811%29.jpg": "../assets/experience/mri-t1.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/b/b7/Normal_axial_T2-weighted_MR_image_of_the_brain.jpg": "../assets/experience/mri-t2.jpg",
    "https://journals.plos.org/plosone/article/figure/image?download=&id=10.1371%2Fjournal.pone.0263006.g005&size=large": "../assets/experience/meningioma-figure-0263006.png",
    "https://journals.plos.org/plosone/article/figure/image?download=&id=10.1371%2Fjournal.pone.0273682.g002&size=large": "../assets/experience/meningioma-tiles-0273682.png",
    "https://journals.plos.org/plosone/article/figure/image?download=&id=10.1371%2Fjournal.pone.0273682.g003&size=large": "../assets/experience/meningioma-stain-0273682.png",
    "https://upload.wikimedia.org/wikipedia/commons/a/ab/Histopathology_of_meningioma.jpg": "../assets/experience/meningioma-histology.jpg",
}


RETURN_STYLE = """
/* KYDW site return control: kept separate from the source reader styles. */
.site-return{display:inline-flex;align-items:center;justify-content:center;gap:6px;margin-left:10px;padding:6px 10px;border:1px solid currentColor;border-radius:999px;color:inherit;text-decoration:none;font-size:12px;line-height:1.2;white-space:nowrap;opacity:.92}
.site-return:hover{opacity:1;text-decoration:none;transform:translateY(-1px)}
.topbar .site-return{color:inherit;background:transparent}
.top .site-return{margin-left:auto;color:#fff;border-color:rgba(255,255,255,.55)}
.source-asset-missing{display:none!important}
@media(max-width:850px){.topbar{padding:0 10px}.topbar>div:first-child{min-width:0;display:flex;align-items:center;flex:1}.topbar .mobile-menu{font-size:11px;padding:4px 5px;min-width:30px;width:auto;white-space:nowrap}.topbar .brand{font-size:12px;white-space:nowrap}.topbar .edition{display:none}.topbar>div.tools{gap:3px;display:flex;align-items:center}.topbar>div.tools button{font-size:11px;padding:5px 4px;margin-left:0;white-space:nowrap}.topbar .site-return{font-size:11px;padding:7px 7px;margin-left:3px}}
@media(max-width:700px){.site-return{font-size:11px;padding:5px 8px;margin-left:6px}.topbar .tools{gap:4px}.topbar .site-return{order:5}}
"""


REPORT_STYLE = """
:root{--ink:#172532;--muted:#5d6f7d;--line:#dbe4e9;--paper:#fff;--soft:#f4f8fa;--blue:#185b7b}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#eef3f5;color:var(--ink);font-family:"Microsoft YaHei","PingFang SC",Arial,sans-serif;line-height:1.78}
.report-top{position:sticky;top:0;z-index:10;display:flex;justify-content:space-between;align-items:center;gap:12px;padding:12px clamp(16px,4vw,42px);background:rgba(255,255,255,.96);border-bottom:1px solid var(--line)}
.report-top b{color:var(--blue)}.report-actions{display:flex;gap:8px;flex-wrap:wrap}.report-actions a{display:inline-flex;padding:8px 13px;border:1px solid #bfd0da;border-radius:999px;color:var(--blue);text-decoration:none;font-size:13px;background:#fff}
.report-shell{width:min(940px,calc(100% - 28px));margin:28px auto 70px;background:var(--paper);border:1px solid var(--line);border-radius:20px;box-shadow:0 16px 42px rgba(33,60,76,.09);padding:clamp(24px,5vw,58px)}
.report-shell h1{font-size:clamp(28px,4vw,44px);line-height:1.3;margin:0 0 28px;color:#153f5a}.report-shell h2{margin-top:36px;padding-bottom:9px;border-bottom:2px solid #e6eef2;color:#194f6d}.report-shell h3{margin-top:27px;color:#245f7c}.report-shell p,.report-shell li{font-size:16px;overflow-wrap:anywhere}.report-shell blockquote{margin:20px 0;padding:13px 17px;border-left:4px solid #4d91a9;background:var(--soft);color:#435b69}.report-shell code{font-family:Consolas,monospace;background:#edf3f6;border-radius:5px;padding:2px 5px}.report-shell pre{overflow:auto;background:#132b3a;color:#eef7fa;border-radius:12px;padding:16px}.report-shell pre code{background:transparent;padding:0}.report-shell table{width:100%;border-collapse:collapse;display:block;overflow:auto}.report-shell th,.report-shell td{border:1px solid var(--line);padding:9px 11px;text-align:left}.report-shell th{background:var(--soft)}.report-shell a{color:#12658b}.report-shell hr{border:0;border-top:1px solid var(--line);margin:32px 0}
@media(max-width:650px){.report-top{align-items:flex-start;flex-direction:column}.report-shell{width:min(100% - 18px,940px);margin-top:12px;padding:22px 18px}.report-shell p,.report-shell li{font-size:15px}}
"""


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    # 百度同步盘可能把既有 HTML 标记为稀疏文件，Windows 会在直接截断写入时
    # 偶发返回 EINVAL。先写同目录临时文件再原子替换，可稳定重复执行导入。
    temporary = path.with_name(f".{path.name}.importing")
    try:
        temporary.write_text(content, encoding="utf-8", newline="\n")
        temporary.replace(path)
    finally:
        temporary.unlink(missing_ok=True)


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def ensure_return_style(soup: BeautifulSoup) -> None:
    old = soup.find("style", id="kydw-site-return-style")
    if old:
        old.decompose()
    style = soup.new_tag("style", id="kydw-site-return-style")
    style.string = RETURN_STYLE
    if soup.head:
        soup.head.append(style)
    else:
        soup.insert(0, style)


def ensure_favicon(soup: BeautifulSoup, href: str = "../../favicon.svg") -> None:
    if soup.select_one('link[rel="icon"]'):
        return
    icon = soup.new_tag("link", rel="icon", type="image/svg+xml", href=href)
    if soup.head:
        soup.head.append(icon)


def add_return_link(soup: BeautifulSoup, href: str) -> None:
    for old in soup.select(".site-return"):
        old.decompose()
    link = soup.new_tag("a", href=href, **{"class": "site-return"})
    link.string = "返回项目详情"
    tools = soup.select_one(".topbar > div.tools")
    if tools:
        tools.append(link)
        return
    top = soup.select_one(".top")
    if top:
        top.append(link)
        return
    body = soup.body or soup
    body.insert(0, link)


def remove_template_notes(soup: BeautifulSoup) -> None:
    """删除不属于教学正文的重复模板提示。"""
    for note in soup.select(".simulation-note"):
        note.decompose()


def localise_known_assets(soup: BeautifulSoup) -> None:
    for element in soup.select("[src]"):
        src = element.get("src", "")
        if src in EXTERNAL_ASSET_MAP:
            element["src"] = EXTERNAL_ASSET_MAP[src]


def serialise(soup: BeautifulSoup) -> str:
    return "<!doctype html>\n" + str(soup).replace("<!DOCTYPE html>", "", 1).lstrip()


def transform_experience_teaching(source: Path, target: Path, public_no: str, site_no: str) -> None:
    soup = BeautifulSoup(read(source), "html.parser")
    remove_template_notes(soup)
    localise_known_assets(soup)
    label = f"体验教学项目 {public_no}"
    if soup.title:
        title = soup.title.get_text(" ", strip=True)
        title = re.sub(r"体验教学项目\s*\d+", label, title)
        soup.title.string = title
    for selector in (".edition", ".hero .eyebrow"):
        for element in soup.select(selector):
            if "教学项目" in element.get_text():
                element.string = label
    add_return_link(soup, f"../project-{site_no}.html")
    ensure_return_style(soup)
    ensure_favicon(soup)
    write(target, serialise(soup))


def transform_experience_answer(source: Path, target: Path, public_no: str, site_no: str) -> None:
    soup = BeautifulSoup(read(source), "html.parser")
    remove_template_notes(soup)
    label = f"实践项目解析 {public_no}"
    if soup.title:
        title = soup.title.get_text(" ", strip=True)
        title = re.sub(r"实践项目解析\s*\d+", label, title)
        soup.title.string = title
    ribbon = soup.select_one(".edition-ribbon")
    if ribbon:
        ribbon.string = label
    top_title = soup.select_one(".top b")
    if top_title:
        top_title.string = label
    add_return_link(soup, f"../project-{site_no}.html")
    ensure_return_style(soup)
    ensure_favicon(soup)
    html = serialise(soup)
    if public_no == "02":
        html = html.replace("核对四个指定输出文件", "核对四个指定输出文件和一个补充输出")
    write(target, html)


def copy_or_hide_local_images(soup: BeautifulSoup, source: Path, target: Path) -> list[str]:
    missing: list[str] = []
    for element in soup.select("[src], [data-src]"):
        for attribute in ("src", "data-src"):
            src = element.get(attribute, "")
            if not src or re.match(r"^(?:https?:|data:|//)", src, re.I):
                continue
            source_asset = (source.parent / src).resolve()
            target_asset = (target.parent / src).resolve()
            if source_asset.is_file():
                target_asset.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(source_asset, target_asset)
                continue
            missing.append(str(source_asset))
            element["data-missing-src"] = src
            del element[attribute]
            holder = element.find_parent(["figure", "div"])
            if holder:
                classes = list(holder.get("class", []))
                if "source-asset-missing" not in classes:
                    classes.append("source-asset-missing")
                holder["class"] = classes
            else:
                element["class"] = list(element.get("class", [])) + ["source-asset-missing"]
    return missing


def transform_advanced_teaching(source: Path, target: Path, site_no: str) -> list[str]:
    soup = BeautifulSoup(read(source), "html.parser")
    remove_template_notes(soup)
    add_return_link(soup, f"../project-{site_no}.html")
    ensure_return_style(soup)
    ensure_favicon(soup)
    missing = copy_or_hide_local_images(soup, source, target)
    html = serialise(soup)
    if site_no == "04":
        # 项目 03 的实际实践没有患者或玻片级临床标签，任务是无标签原图
        # 表征与多实例聚合；保留正文中的弱监督知识，但不能把实践本身写成
        # 已完成的弱监督分类任务。
        html = html.replace(
            "形态测量、弱监督与多尺度表征",
            "形态测量、多实例聚合与多尺度表征",
        )
        html = html.replace(
            "进阶实践任务：原图级弱监督与多实例学习",
            "进阶实践任务：原图级无标签表征与多实例聚合",
        )
        html = html.replace(
            "课程数据没有真实临床等级标签，因此实践使用由原图图块分布构造的教学目标，不能把结果解释为 WHO 分级。无需完成复杂深度模型；清楚说明标签、独立样本单位和验证限制比性能更重要。",
            "课程数据没有患者或玻片级临床标签，因此实践以原图级形态表征、图块聚合和染色稳定性为目标，不能把结果解释为 WHO 分级。无需完成复杂深度模型；清楚说明独立样本单位、聚合方法和验证范围比追求单一性能数字更重要。",
        )
        html = html.replace(
            "设计报告需说明 bag 和实例定义、聚合方式、验证策略、注意力图的解释边界以及如何获得更真实的研究标签。",
            "设计报告需说明 bag 和实例定义、聚合方式、稳定性验证、代表区域的解释边界，以及如要开展弱监督分类应补充何种真实标签。",
        )
    write(target, html)
    return missing


def copy_experience_notebook(source: Path, target: Path, public_no: str) -> None:
    if public_no != "02":
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, target)
        return
    content = read(source).replace(
        "提交检查四个输出文件",
        "提交检查四个指定输出文件和一个补充输出",
    )
    write(target, content)


def markdown_document(source: Path, target: Path, title: str, project_href: str | None, raw_name: str) -> None:
    target.parent.mkdir(parents=True, exist_ok=True)
    raw_target = target.with_suffix(".md")
    shutil.copy2(source, raw_target)
    html = markdown.markdown(read(source), extensions=["tables", "fenced_code", "sane_lists", "toc"])
    soup = BeautifulSoup(html, "html.parser")
    for link in soup.select("a[href]"):
        if re.match(r"^https?://", link.get("href", ""), re.I):
            link["target"] = "_blank"
            link["rel"] = "noreferrer"
    actions = []
    if project_href:
        actions.append(f'<a href="{project_href}">返回项目详情</a>')
    else:
        actions.append('<a href="../index.html">返回项目主页</a>')
    actions.append(f'<a href="{raw_name}" download>下载 Markdown 文件</a>')
    document = f"""<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{title}</title><link rel="icon" type="image/svg+xml" href="../../../favicon.svg"><style>{REPORT_STYLE}</style></head>
<body><header class="report-top"><b>KYDW 本科生科研入门体验项目</b><nav class="report-actions">{''.join(actions)}</nav></header><main class="report-shell">{soup}</main></body></html>
"""
    write(target, document)


def shared_markdown_document(source: Path, target: Path, title: str) -> None:
    target.parent.mkdir(parents=True, exist_ok=True)
    raw_target = target.with_suffix(".md")
    shutil.copy2(source, raw_target)
    html = markdown.markdown(read(source), extensions=["tables", "fenced_code", "sane_lists", "toc"])
    soup = BeautifulSoup(html, "html.parser")
    for link in soup.select("a[href]"):
        if re.match(r"^https?://", link.get("href", ""), re.I):
            link["target"] = "_blank"
            link["rel"] = "noreferrer"
    document = f"""<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{title}</title><link rel="icon" type="image/svg+xml" href="../../favicon.svg"><style>{REPORT_STYLE}</style></head>
<body><header class="report-top"><b>KYDW 本科生科研入门体验项目</b><nav class="report-actions"><a href="../index.html">返回项目主页</a><a href="{raw_target.name}" download>下载 Markdown 文件</a></nav></header><main class="report-shell">{soup}</main></body></html>
"""
    write(target, document)


def require(paths: list[Path]) -> None:
    for path in paths:
        if not path.is_file():
            raise SystemExit(f"缺少源文件: {path}")


def remove_stale_advanced(repo: Path) -> None:
    stale = [repo / "experience" / "advanced" / "project-01.html"]
    stale.extend((repo / "experience" / "advanced-answers").glob("project-*.html"))
    for path in stale:
        if path.is_file():
            path.unlink()


def write_manifest(repo: Path, rows: list[tuple[str, str, Path, str]], missing_assets: list[str]) -> None:
    lines = [
        "# 体验版与进阶版材料映射",
        "",
        "公开编号保持 00—05；站内文件名沿用 project-01—project-06，以保持已发布链接稳定。",
        "",
        "| 公开编号 | 版本 | 原始文件 | 站内项目 | SHA256 |",
        "| --- | --- | --- | --- | --- |",
    ]
    for public_no, version, source, site_no in rows:
        lines.append(f"| {public_no} | {version} | `{source.name}` | `project-{site_no}` | `{sha256(source)}` |")
    lines.extend(["", "## 进阶教学页本地配图检查", ""])
    if missing_assets:
        lines.append("以下配图路径在本次来源目录中不存在，导入时已隐藏对应图框，避免公开页面出现破损图片：")
        lines.extend(f"- `{item}`" for item in sorted(set(missing_assets)))
    else:
        lines.append("进阶教学页引用的本地配图均已复制。")
    write(repo / "content" / "advanced-manifest.md", "\n".join(lines) + "\n")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", type=Path, required=True, help="网站内容目录，内部应含体验项目与进阶项目")
    parser.add_argument("--repo", type=Path, required=True)
    args = parser.parse_args()

    source_root = args.source.resolve()
    repo = args.repo.resolve()
    if not source_root.is_dir() or not repo.is_dir():
        raise SystemExit("source/repo 目录不存在")

    experience_root = source_root / "体验项目"
    advanced_root = source_root / "进阶项目"
    teaching_root = experience_root / "体验教学项目00-05"
    answer_root = experience_root / "体验实践项目解析00-05"
    practice_root = experience_root / "体验实践项目00-05"
    advanced_teaching_root = advanced_root / "教学文档"
    advanced_practice_root = advanced_root / "实践文档"
    advanced_answer_root = advanced_root / "参考答案"

    manifest_rows: list[tuple[str, str, Path, str]] = []
    missing_assets: list[str] = []

    for public_no, site_no in EXPERIENCE_MAPPING:
        teaching = teaching_root / f"体验教学项目{public_no}.html"
        answer = answer_root / f"体验实践项目解析{public_no}.html"
        notebook = practice_root / f"体验实践项目{public_no}.ipynb"
        require([teaching, answer, notebook])
        transform_experience_teaching(teaching, repo / "experience" / "teaching" / f"project-{site_no}.html", public_no, site_no)
        transform_experience_answer(answer, repo / "experience" / "answers" / f"project-{site_no}.html", public_no, site_no)
        target_notebook = repo / "experience" / "practice" / f"project-{site_no}.ipynb"
        copy_experience_notebook(notebook, target_notebook, public_no)
        manifest_rows.append((public_no, "体验版", teaching, site_no))

    remove_stale_advanced(repo)
    for public_no, site_no in ADVANCED_MAPPING:
        teaching = advanced_teaching_root / f"进阶教学项目{public_no}.html"
        notebook = advanced_practice_root / f"进阶实践项目{public_no}.ipynb"
        answer = advanced_answer_root / f"进阶实践项目{public_no}_参考答案.ipynb"
        template = advanced_practice_root / "设计报告模板" / f"项目{public_no}_设计报告模板.md"
        reference_report = advanced_answer_root / f"项目{public_no}_参考设计报告.md"
        require([teaching, notebook, answer, template, reference_report])

        missing_assets.extend(transform_advanced_teaching(teaching, repo / "experience" / "advanced" / f"project-{site_no}.html", site_no))
        practice_target = repo / "experience" / "advanced-practice" / f"project-{site_no}.ipynb"
        answer_target = repo / "experience" / "advanced-answers" / f"project-{site_no}.ipynb"
        practice_target.parent.mkdir(parents=True, exist_ok=True)
        answer_target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(notebook, practice_target)
        shutil.copy2(answer, answer_target)

        template_target = repo / "experience" / "advanced-reports" / "templates" / f"project-{site_no}.html"
        reference_target = repo / "experience" / "advanced-reports" / "examples" / f"project-{site_no}.html"
        markdown_document(template, template_target, f"项目 {public_no} 设计报告模板", f"../../project-{site_no}.html", f"project-{site_no}.md")
        markdown_document(reference_report, reference_target, f"项目 {public_no} 参考设计报告", f"../../project-{site_no}.html", f"project-{site_no}.md")
        manifest_rows.append((public_no, "进阶版", teaching, site_no))

    require([
        practice_root / "实践项目额外注意事项.md",
        advanced_root / "README.md",
        advanced_root / "资料与文献索引.md",
        advanced_practice_root / "Kaggle数据与运行说明.md",
    ])
    shutil.copy2(practice_root / "实践项目额外注意事项.md", repo / "experience" / "practice" / "实践项目额外注意事项.md")
    shared_markdown_document(advanced_root / "README.md", repo / "experience" / "advanced-resources" / "index.html", "进阶项目说明")
    shared_markdown_document(advanced_practice_root / "Kaggle数据与运行说明.md", repo / "experience" / "advanced-resources" / "data-guide.html", "进阶项目数据与运行说明")
    shared_markdown_document(advanced_root / "资料与文献索引.md", repo / "experience" / "advanced-resources" / "references.html", "进阶项目资料与文献索引")
    write_manifest(repo, manifest_rows, missing_assets)
    print("已导入体验版 00—05 与进阶版 01—05；进阶实践、参考答案、报告模板和参考报告均已复制。")
    if missing_assets:
        print(f"警告：来源目录缺少 {len(set(missing_assets))} 个进阶教学本地配图，已隐藏破损图框，详见 content/advanced-manifest.md。")


if __name__ == "__main__":
    main()
