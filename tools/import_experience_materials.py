"""将 KYDW 体验项目材料导入网站副本。

原始材料只读；本脚本只写入仓库中的明确目标目录。00--05 映射为网站项目 01--06。
体验版和暂代的进阶版共用实践 Notebook，进阶教学页与解析页保留独立路径，便于日后替换。
"""

from __future__ import annotations

import argparse
import re
import shutil
from pathlib import Path

from bs4 import BeautifulSoup


MAPPING = [(f"{source:02d}", f"{source + 1:02d}") for source in range(6)]


RETURN_STYLE = """
/* KYDW site return control: kept separate from the source reader styles. */
.site-return{display:inline-flex;align-items:center;justify-content:center;gap:6px;margin-left:10px;padding:6px 10px;border:1px solid currentColor;border-radius:999px;color:inherit;text-decoration:none;font-size:12px;line-height:1.2;white-space:nowrap;opacity:.92}
.site-return:hover{opacity:1;text-decoration:none;transform:translateY(-1px)}
.topbar .site-return{color:inherit;background:transparent}
.top .site-return{margin-left:auto;color:#fff;border-color:rgba(255,255,255,.55)}
@media(max-width:850px){.topbar{padding:0 10px}.topbar>div:first-child{min-width:0;display:flex;align-items:center;flex:1}.topbar .mobile-menu{font-size:11px;padding:4px 5px;min-width:30px;width:auto;white-space:nowrap}.topbar .brand{font-size:12px;white-space:nowrap}.topbar .edition{display:none}.topbar>div.tools{gap:3px;display:flex;align-items:center}.topbar>div.tools button{font-size:11px;padding:5px 4px;margin-left:0;white-space:nowrap}.topbar .site-return{font-size:11px;padding:7px 7px;margin-left:3px}}
@media(max-width:700px){.site-return{font-size:11px;padding:5px 8px;margin-left:6px}.topbar .tools{gap:4px}.topbar .site-return{order:5}}
"""


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8", newline="\n")


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


def ensure_favicon(soup: BeautifulSoup) -> None:
    if soup.select_one('link[rel="icon"]'):
        return
    icon = soup.new_tag("link", rel="icon", type="image/svg+xml", href="../../favicon.svg")
    if soup.head:
        soup.head.append(icon)


def add_return_link(soup: BeautifulSoup, href: str) -> None:
    for old in soup.select(".site-return"):
        old.decompose()
    link = soup.new_tag("a", href=href, **{"class": "site-return"})
    link.string = "返回项目详情"
    # 顶栏左侧的移动端目录按钮也带有 tools 类，必须选择右侧工具栏容器。
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
    """Remove repeated meta-like notes that add no teaching content for readers."""
    for note in soup.select(".simulation-note"):
        note.decompose()


def transform_teaching(source: Path, target: Path, number: str, advanced: bool) -> None:
    soup = BeautifulSoup(read(source), "html.parser")
    remove_template_notes(soup)
    label = f"{'进阶' if advanced else '体验'}教学项目 {number}"
    if soup.title:
        title = soup.title.get_text(" ", strip=True)
        title = re.sub(r"(?:进阶)?体验?教学项目\s*\d+", label, title)
        soup.title.string = title
    for selector in (".edition", ".hero .eyebrow"):
        for element in soup.select(selector):
            if "教学项目" in element.get_text():
                element.string = label
    add_return_link(soup, f"../project-{number}.html")
    ensure_return_style(soup)
    ensure_favicon(soup)
    write(target, "<!doctype html>\n" + str(soup).replace("<!DOCTYPE html>", "", 1).lstrip())


def transform_answer(source: Path, target: Path, number: str, advanced: bool) -> None:
    soup = BeautifulSoup(read(source), "html.parser")
    remove_template_notes(soup)
    prefix = "进阶实践解析" if advanced else "实践项目解析"
    label = f"{prefix} {number}"
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
    add_return_link(soup, f"../project-{number}.html")
    ensure_return_style(soup)
    ensure_favicon(soup)
    # 项目 04 的目标列必须由学习者结合实际表格和数据字典确认，解析页不再留下无法执行的占位语句。
    if number == "05":
        html = str(soup)
        html = html.replace(
            "TARGET_COLUMN='填写原项目目标列'",
            "likely=[c for c in df.columns if c.lower() in {'target','label','class','status','diagnosis','stroke','parkinsons'}]\nTARGET_COLUMN=likely[0] if likely else None\nassert TARGET_COLUMN is not None, '请根据数据字典确认二分类目标列'",
        )
        soup = BeautifulSoup(html, "html.parser")
    source_number = f"{int(number) - 1:02d}"
    html = str(soup).replace(f"实践项目解析 {source_number}", label).replace(f"实践项目解析{source_number}", label)
    soup = BeautifulSoup(html, "html.parser")
    write(target, "<!doctype html>\n" + str(soup).replace("<!DOCTYPE html>", "", 1).lstrip())


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", type=Path, required=True)
    parser.add_argument("--repo", type=Path, required=True)
    args = parser.parse_args()

    source_root = args.source.resolve()
    repo = args.repo.resolve()
    if not source_root.is_dir() or not repo.is_dir():
        raise SystemExit("source/repo 目录不存在")

    teaching_root = source_root / "体验教学项目00-05"
    answer_root = source_root / "体验实践项目解析00-05"
    practice_root = source_root / "体验实践项目00-05"
    (repo / "experience" / "practice").mkdir(parents=True, exist_ok=True)
    for source_no, site_no in MAPPING:
        teaching = teaching_root / f"体验教学项目{source_no}.html"
        answer = answer_root / f"体验实践项目解析{source_no}.html"
        notebook = practice_root / f"体验实践项目{source_no}.ipynb"
        for path in (teaching, answer, notebook):
            if not path.is_file():
                raise SystemExit(f"缺少源文件: {path}")

        transform_teaching(teaching, repo / "experience" / "teaching" / f"project-{site_no}.html", site_no, False)
        transform_teaching(teaching, repo / "experience" / "advanced" / f"project-{site_no}.html", site_no, True)
        transform_answer(answer, repo / "experience" / "answers" / f"project-{site_no}.html", site_no, False)
        transform_answer(answer, repo / "experience" / "advanced-answers" / f"project-{site_no}.html", site_no, True)
        shutil.copy2(notebook, repo / "experience" / "practice" / f"project-{site_no}.ipynb")

    shutil.copy2(
        practice_root / "实践项目额外注意事项.md",
        repo / "experience" / "practice" / "实践项目额外注意事项.md",
    )
    print(f"已导入 {len(MAPPING)} 个项目，体验版与暂代进阶版各两类 HTML 页面，并复制实践 Notebook。")


if __name__ == "__main__":
    main()
