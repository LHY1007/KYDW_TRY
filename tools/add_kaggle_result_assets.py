"""Attach verified Kaggle result assets to the project data and answer pages."""

import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def update_content(project_id, result_literal):
    path = ROOT / "content.js"
    text = path.read_text(encoding="utf-8")
    record = re.search(r'\{ id: "' + re.escape(project_id) + r'",.*?\n\s*\{ id: "', text, re.S)
    if record and "referenceResults:" in record.group(0):
        return
    if not record:
        record = re.search(r'\{ id: "' + re.escape(project_id) + r'",.*?\n\s*\{ id: "project-07"', text, re.S)
        if record and "referenceResults:" in record.group(0):
            return
    pattern = re.compile(r'(\{ id: "' + re.escape(project_id) + r'",.*?advancedTierText: "[^"]*") \}', re.S)
    text, count = pattern.subn(r"\1, referenceResults: " + result_literal + " }", text, count=1)
    if count != 1:
        raise RuntimeError(f"expected one project record for {project_id}, got {count}")
    path.write_text(text, encoding="utf-8")


def patch_answer_page(project_no, title, assets, metrics):
    path = ROOT / "experience" / "answers" / f"project-{project_no:02d}.html"
    text = path.read_text(encoding="utf-8")
    if "actual-result-assets" in text:
        return
    if project_no == 3:
        old_figure = re.compile(
            r'<figure><img alt="真实胸部 X 射线输入示例" src="https?://[^\"]+"/><figcaption>[^<]*</figcaption></figure>',
            re.S,
        )
    else:
        old_figure = re.compile(
            r'<figure><img alt="[^"]+" src="data:image/[^\"]+"/><figcaption>[^<]*</figcaption></figure>',
            re.S,
        )
    replacement = (
        f'<figure><img src="../assets/results/project-{project_no:02d}/{assets[2]}" '
        f'alt="Kaggle 实际运行的{title}"/><figcaption>Kaggle 实际运行的{title}</figcaption></figure>'
    )
    text, count = old_figure.subn(replacement, text, count=1)
    if count != 1:
        raise RuntimeError(f"expected one embedded result figure in {path}, got {count}")
    heading = '<h1>结果解释</h1>'
    block = (
        '<div class="card actual-result-assets"><h2>实际运行结果</h2>'
        f'<figure><img src="../assets/results/project-{project_no:02d}/{assets[0]}" alt="Kaggle 实际运行的数据检查结果"/>'
        '<figcaption>Kaggle 实际运行的数据检查结果</figcaption></figure>'
        f'<figure><img src="../assets/results/project-{project_no:02d}/{assets[1]}" alt="Kaggle 实际运行的训练曲线"/>'
        '<figcaption>Kaggle 实际运行的训练曲线</figcaption></figure>'
        + (f'<figure><img src="../assets/results/project-{project_no:02d}/{assets[3]}" alt="Kaggle 实际运行的像素强度分布"/>'
           '<figcaption>Kaggle 实际运行的像素强度分布</figcaption></figure>' if len(assets) > 3 else '')
        + f'<p>{metrics}</p></div>'
    )
    heading = '<h1>结果解释</h1>' if project_no == 2 else '<h1>结果阅读与文件核对</h1>'
    if text.count(heading) != 1:
        raise RuntimeError(f"expected one result heading in {path}")
    text = text.replace(heading, heading + block, 1)
    path.write_text(text, encoding="utf-8")


if __name__ == "__main__":
    update_content(
        "project-02",
        '[{"stepIndex": 0, "title": "数据检查", "image": "experience/assets/results/project-02/task1_data_check.png", "caption": "Kaggle 实际运行的 MRI、mask 与叠加图"}, '
        '{"stepIndex": 4, "title": "训练过程", "image": "experience/assets/results/project-02/task1_training_curve.png", "caption": "Kaggle 实际运行的训练与验证损失、Dice 曲线"}, '
        '{"stepIndex": 6, "title": "分割结果与指标", "image": "experience/assets/results/project-02/task1_prediction.png", "caption": "Kaggle 实际运行的测试样本真实 mask 与预测结果", "text": "训练切片：802；验证切片：156；测试切片：242\n最佳阈值：0.5\n测试 Dice：0.6115702\n测试 IoU：0.6115702"}]',
    )
    patch_answer_page(
        2,
        "MRI、真实 mask 与预测结果",
        ("task1_data_check.png", "task1_training_curve.png", "task1_prediction.png"),
        "训练切片 802，验证切片 156，测试切片 242；最佳阈值 0.5；测试 Dice 0.6115702，测试 IoU 0.6115702。",
    )
    update_content(
        "project-03",
        '[{"stepIndex": 0, "title": "真实胸片输入", "image": "experience/assets/results/project-03/task2_real_xray_grid.png", "caption": "Kaggle 实际运行的真实胸片样本网格"}, '
        '{"stepIndex": 2, "title": "训练过程", "image": "experience/assets/results/project-03/task2_training_curve.png", "caption": "Kaggle 实际运行的生成器与判别器损失曲线"}, '
        '{"stepIndex": 3, "title": "生成结果", "image": "experience/assets/results/project-03/task2_generated_samples.png", "caption": "Kaggle 实际运行的固定噪声生成样本网格", "text": "数据集图像：1000；训练轮数：4；潜变量维度：100\n最后一轮生成器平均损失：6.0221351\n最后一轮判别器平均损失：0.0328187\n生成样本两两距离均值：21.0089512"}]',
    )
    patch_answer_page(
        3,
        "胸片输入、训练曲线与生成样本",
        ("task2_real_xray_grid.png", "task2_training_curve.png", "task2_generated_samples.png", "task2_intensity_histogram.png"),
        "使用 1000 张胸片训练 4 轮，潜变量维度为 100；最后一轮生成器平均损失 6.0221351，判别器平均损失 0.0328187，生成样本两两距离均值 21.0089512。",
    )
    print("attached A01/A02 result assets")
