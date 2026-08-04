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
        f'alt="参考结果的{title}"/><figcaption>参考结果的{title}</figcaption></figure>'
    )
    text, count = old_figure.subn(replacement, text, count=1)
    if count != 1:
        raise RuntimeError(f"expected one embedded result figure in {path}, got {count}")
    heading = '<h1>结果解释</h1>'
    block = (
        '<div class="card actual-result-assets"><h2>参考结果</h2>'
        f'<figure><img src="../assets/results/project-{project_no:02d}/{assets[0]}" alt="参考结果的数据检查"/>'
        '<figcaption>参考结果的数据检查</figcaption></figure>'
        f'<figure><img src="../assets/results/project-{project_no:02d}/{assets[1]}" alt="参考结果的训练曲线"/>'
        '<figcaption>参考结果的训练曲线</figcaption></figure>'
        + (f'<figure><img src="../assets/results/project-{project_no:02d}/{assets[3]}" alt="参考结果的像素强度分布"/>'
           '<figcaption>参考结果的像素强度分布</figcaption></figure>' if len(assets) > 3 else '')
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
        '[{"stepIndex": 0, "title": "数据检查", "image": "experience/assets/results/project-02/task1_data_check.png", "caption": "MRI、阳性 mask 与叠加图"}, '
        '{"stepIndex": 4, "title": "训练过程", "image": "experience/assets/results/project-02/task1_training_curve.png", "caption": "训练与验证损失、Dice 曲线"}, '
        '{"stepIndex": 6, "title": "分割结果与指标", "image": "experience/assets/results/project-02/task1_prediction.png", "caption": "阳性测试样本、真实 mask、预测 mask 与 TP/FP/FN 编码", "text": "配对切片：3929；患者：110；训练/验证/测试：2604 / 547 / 778\n平衡训练样本：600（阳性 300、空 mask 300）；最佳阈值：0.75\n测试阳性 mask Dice：0.4870；阳性 mask IoU：0.3725\npixel Dice：0.5259；pixel IoU：0.3567；precision：0.5366；recall：0.5156\n展示图只从测试集中真实 mask 非空的切片中选择，图中绿色为 TP、红色为 FP、蓝色为 FN。"}]',
    )
    patch_answer_page(
        2,
        "MRI、真实 mask 与预测结果",
        ("task1_data_check.png", "task1_training_curve.png", "task1_prediction.png"),
        "配对切片 3929，患者 110；训练/验证/测试 2604 / 547 / 778；训练轮数 20，最佳阈值 0.75；测试阳性 mask Dice 0.4870、阳性 mask IoU 0.3725；展示图包含真实 mask、预测 mask 与 TP/FP/FN 编码。",
    )
    update_content(
        "project-03",
        '[{"stepIndex": 0, "title": "胸片输入", "image": "experience/assets/results/project-03/task2_real_xray_grid.png", "caption": "正常胸片样本网格"}, '
        '{"stepIndex": 2, "title": "训练过程", "image": "experience/assets/results/project-03/task2_training_curve.png", "caption": "残差卷积 VAE 的总损失、重建 L1、边缘 L1 与 KL 损失曲线"}, '
        '{"stepIndex": 3, "title": "输入与生成结果", "image": "experience/assets/results/project-03/task2_input_generated_comparison.png", "caption": "图左侧明确标出 INPUT / REAL CHEST X-RAY 与 GENERATED OUTPUT / LATENT SAMPLE", "text": "数据集：NORMAL 胸片 1341 张；训练/留出：1073 / 268\n模型：ResidualConvVAE；潜变量维度：64\n留出集重建 L1：0.0878；生成样本两两 L1：0.2334\n五项图像特征平均差：0.0114"}, '
        '{"stepIndex": 4, "title": "图像统计", "image": "experience/assets/results/project-03/task2_quality_metrics.png", "caption": "留出集与生成样本的五项图像统计"}]',
    )
    patch_answer_page(
        3,
        "胸片输入、训练曲线与生成样本",
        ("task2_real_xray_grid.png", "task2_training_curve.png", "task2_generated_samples.png", "task2_intensity_histogram.png"),
        "使用 1341 张 NORMAL 胸片，模型为 ResidualConvVAE，训练/留出为 1073 / 268，潜变量维度为 64；留出集重建 L1 为 0.0878，生成样本两两 L1 为 0.2334，五项图像特征平均差为 0.0114。",
    )
    print("attached A01/A02 result assets")
