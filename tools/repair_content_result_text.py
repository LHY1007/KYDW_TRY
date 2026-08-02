"""Repair escaped newlines in the generated JavaScript result record."""

from pathlib import Path


path = Path(__file__).resolve().parents[1] / "content.js"
text = path.read_text(encoding="utf-8")
replacements = [
    (
        '"text": "训练切片：802；验证切片：156；测试切片：242\n最佳阈值：0.5\n测试 Dice：0.6115702\n测试 IoU：0.6115702"',
        '"text": "训练切片：802；验证切片：156；测试切片：242\\n最佳阈值：0.5\\n测试 Dice：0.6115702\\n测试 IoU：0.6115702"',
    ),
    (
        '"text": "数据集图像：1000；训练轮数：4；潜变量维度：100\n最后一轮生成器平均损失：6.0221351\n最后一轮判别器平均损失：0.0328187\n生成样本两两距离均值：21.0089512"',
        '"text": "数据集图像：1000；训练轮数：4；潜变量维度：100\\n最后一轮生成器平均损失：6.0221351\\n最后一轮判别器平均损失：0.0328187\\n生成样本两两距离均值：21.0089512"',
    ),
]
for old, new in replacements:
    if text.count(old) == 1:
        text = text.replace(old, new)
    elif old.replace("\n", "\\n") in text:
        continue
    else:
        raise RuntimeError(f"expected one result text, got {text.count(old)}")
path.write_text(text, encoding="utf-8")
print(path)
