"""Repair and synchronise experience projects 03--05.

The student materials under the student checkout are the source of truth.  This
script makes the small notebook/task corrections, rebuilds complete reference
answer pages from the verified reference runners, and copies only projects
03--05 into the local website checkout.  It deliberately does not publish
anything and does not touch the locked advanced directories.
"""

from __future__ import annotations

import ast
import copy
import html
import json
import shutil
from pathlib import Path


STUDENT = Path(r"D:\00_同步\BaiduSyncdisk\01_学术研究\学生\KYDW\网站内容")
SITE = Path(__file__).resolve().parents[1]
EXPERIENCE = STUDENT / "体验项目"
TEACHING = EXPERIENCE / "体验教学项目00-05"
PRACTICE = EXPERIENCE / "体验实践项目00-05"
ANSWERS = EXPERIENCE / "体验实践项目解析00-05"
RESULTS = EXPERIENCE / "assets" / "results"
RUNNER = Path(r"D:\00_同步\BaiduSyncdisk\01_学术研究\展示\山大\tools\run_experience_0305_reference.py")


def load_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def _clean_public_language(value):
    """Remove internal AI/tool instructions before materials reach readers."""
    phrases = (
        "合理利用 AI 工具理解问题并尝试给出适当的解决方案。",
        "合理利用 AI 工具理解问题、学习知识并尝试给出适当的解决方案。",
        "合理利用 AI 工具理解问题与尝试给出适当的解决方案。",
    )
    if isinstance(value, str):
        for phrase in phrases:
            value = value.replace(phrase, "")
        return value
    if isinstance(value, list):
        return [_clean_public_language(item) for item in value]
    if isinstance(value, dict):
        return {key: _clean_public_language(item) for key, item in value.items()}
    return value


def save_json(path: Path, value: dict) -> None:
    value = _clean_public_language(value)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")


def source(cell: dict) -> str:
    return "".join(cell.get("source", []))


def set_source(cell: dict, text: str) -> None:
    cell["source"] = [line + "\n" for line in text.rstrip("\n").splitlines()]
    if cell.get("cell_type") == "code":
        cell["execution_count"] = None
        cell["outputs"] = []
    else:
        # nbformat forbids code-only fields on markdown cells.  Removing them
        # also repairs older copies created by the previous helper version.
        cell.pop("execution_count", None)
        cell.pop("outputs", None)


def sanitize_practice_notebooks() -> None:
    """Remove stale code-only fields from all experience markdown cells."""
    for public_no in ("03", "04", "05"):
        path = PRACTICE / f"体验实践项目{public_no}.ipynb"
        nb = load_json(path)
        for cell in nb.get("cells", []):
            if cell.get("cell_type") == "markdown":
                cell.pop("execution_count", None)
                cell.pop("outputs", None)
        save_json(path, nb)


def make_cell(cell_type: str, text: str, cell_id: str) -> dict:
    cell = {
        "cell_type": cell_type,
        "metadata": {},
        "source": [line + "\n" for line in text.rstrip("\n").splitlines()],
        "id": cell_id,
    }
    if cell_type == "code":
        cell["execution_count"] = None
        cell["outputs"] = []
    return cell


def insert_after_task_one(nb: dict, markdown: str, code: str) -> None:
    """Insert the missing project-05 visualisation task after task 1."""
    index = next(
        i
        for i, cell in enumerate(nb["cells"])
        if cell.get("cell_type") == "code" and "项目05·任务1·学生填写区" in source(cell)
    )
    nb["cells"][index + 1:index + 1] = [
        make_cell("markdown", markdown, "project05-task2-markdown"),
        make_cell("code", code, "project05-task2-code"),
    ]


def repair_notebook_03() -> None:
    path = PRACTICE / "体验实践项目03.ipynb"
    nb = load_json(path)
    nb["cells"] = [
        make_cell("markdown", """# 实践项目 03：脑膜瘤 H&E 形态代理分类

本 Notebook 使用课程准备的真实脑膜瘤 H&E 图块数据，完成数据核对、形态特征分类、原图级测试和染色变化比较。三档标签由核密度代理分数生成，只用于教学分类，不对应临床病理分级。

Kaggle 是本项目的首选实践入口。打开公开 Notebook 后，点击“复制并编辑”保存到自己的账户，再按单元格顺序运行。下载 Notebook 到电脑运行是补充方式。

代码中用整行注释标出了需要填写的位置。先阅读当前单元格的输入、处理和输出，再修改标记区域。合理利用 AI 工具理解问题并尝试给出适当的解决方案。

## 任务总览

1. 找到固定的课程 NPZ，并核对图块 shape、标签、原图编号、坐标和数据划分。
2. 查看 RGB 统计与 H&E 形态特征，理解标签来源并建立简单比较。
3. 补全随机森林分类器；输入只使用图像测得的形态特征，不使用 `proxy_score`。
4. 用验证集选择树数量，在独立测试集输出混淆矩阵、宏平均 F1 和错误图块。
5. 观察颜色变化后模型的表现，并说明代理标签的结果边界。

## 需要保存的结果

`task3_data_visualization.png`、`task3_training_curve.png`、`task3_prediction_visualization.png`、`task3_pytorch_result.json`。""", "project03-overview"),
        make_cell("code", """from pathlib import Path  # 导入当前步骤需要的工具
import json, random  # 导入当前步骤需要的工具
import numpy as np  # 导入当前步骤需要的工具
import matplotlib.pyplot as plt  # 导入当前步骤需要的工具
from sklearn.ensemble import RandomForestClassifier  # 导入随机森林分类器
from sklearn.linear_model import LogisticRegression  # 导入颜色统计基线
from sklearn.metrics import accuracy_score, f1_score, confusion_matrix  # 导入评价指标

SEED = 42  # 固定随机状态以便复现实验
random.seed(SEED); np.random.seed(SEED)  # 固定随机状态以便复现实验
INPUT = Path('/kaggle/input')  # 保存当前步骤使用的中间结果
OUT = Path('/kaggle/working'); OUT.mkdir(exist_ok=True)  # 保存输出文件目录
DATA_PATH = None  # 可在本地填写课程 NPZ 路径；Kaggle 自动查找固定文件名
candidates = sorted(INPUT.rglob('meningioma_public_morphology_tiles.npz'))  # 读取本任务需要的数据
if DATA_PATH is None and candidates:  # 根据当前条件选择处理分支
    DATA_PATH = candidates[0]  # 保存当前步骤使用的中间结果
assert DATA_PATH is not None, '请挂载包含 meningioma_public_morphology_tiles.npz 的课程数据集。'  # 执行当前步骤并保留结果
data = np.load(DATA_PATH, allow_pickle=True)  # 读取本任务需要的数据
required = {'images','labels','proxy_scores','morphology_features','feature_names','source_image_ids','coordinates_yx','split'}  # 核对输入字段
assert required.issubset(data.files), required - set(data.files)  # 执行当前步骤并保留结果
images = data['images']; labels = data['labels'].astype(np.int64)  # 读取图像与标签
proxy_scores = data['proxy_scores'].astype(np.float32)  # 读取连续代理分数，仅用于说明标签来源
morphology_features = data['morphology_features'].astype(np.float32)  # 读取图像测得的形态统计
feature_names = data['feature_names'].astype(str)  # 读取形态特征名称
source_image_ids = data['source_image_ids'].astype(str)  # 读取图块对应的原图编号
coordinates_yx = data['coordinates_yx'].astype(np.int32)  # 读取图块在原图中的左上角坐标
split = data['split'].astype(str)  # 读取预先划分的数据集合
print('data:', images.shape, 'splits:', {k: int((split == k).sum()) for k in np.unique(split)})  # 显示核对结果""", "project03-setup"),
        make_cell("markdown", "## 任务 1：完成数据核对\n\n输入包含图像、标签、连续代理分数、形态统计、原图编号、坐标和 `split`。请输出每个 split 的图块数、原图编号、坐标范围和三类标签数量。", "project03-task1-markdown"),
        make_cell("code", """# ===== 项目03·任务1·学生填写区（开始） =====
# TODO：根据 images、labels、source_image_ids、coordinates_yx 和 split 生成 summary。
summary = None  # 保存当前步骤的核对结果
# ===== 项目03·任务1·学生填写区（结束） =====
print(summary)  # 显示便于检查的关键信息""", "project03-task1-code"),
        make_cell("markdown", "## 任务 2：查看图像统计与形态特征\n\n`morphology_features` 的第一列 `proxy_score` 只用于说明标签生成规则，不能作为模型输入；其余五列由 H&E 图像测得，可以用于观察核相关信号、深色比例和染色统计。", "project03-task2-markdown"),
        make_cell("code", """# ===== 项目03·任务2·学生填写区（开始） =====
# TODO：输出训练集的 feature_names[1:]、均值和标准差，并用 RGB 均值建立一个颜色统计比较。
usable_features = morphology_features[:, 1:]  # 排除由标签规则得到的 proxy_score
feature_summary = None  # 保存当前步骤的核对结果
# ===== 项目03·任务2·学生填写区（结束） =====
print(feature_summary)  # 显示便于检查的关键信息""", "project03-task2-code"),
        make_cell("markdown", "## 任务 3：补全形态特征随机森林\n\n训练数据来自不同原图。模型输入为五个图像测得的形态特征，输出三个代理标签；`proxy_score` 已明确排除，避免把标签生成规则直接喂给模型。", "project03-task3-markdown"),
        make_cell("code", """# ===== 项目03·任务3·学生填写区（开始） =====
# TODO：补全随机森林参数，使用 morphology_features[:, 1:] 训练三分类模型。
train_idx = np.where(split == 'train')[0]  # 取出训练图块
val_idx = np.where(split == 'validation')[0]  # 取出验证图块
test_idx = np.where(split == 'test')[0]  # 取出测试图块
model = None  # 保存当前步骤的模型
# ===== 项目03·任务3·学生填写区（结束） =====
print(model)  # 显示便于检查的模型结构""", "project03-task3-code"),
        make_cell("markdown", "## 任务 4：验证集选模与独立测试\n\n比较不同树数量的验证集宏平均 F1，固定最佳设置后只在测试集评价一次，并显示混淆矩阵和错误图块。", "project03-task4-markdown"),
        make_cell("code", """# ===== 项目03·任务4·学生填写区（开始） =====
# TODO：完成树数量比较、验证集选模、测试评价和混淆矩阵。
# ===== 项目03·任务4·学生填写区（结束） =====
print('请先完成验证集选模和测试评价。')  # 显示便于检查的提示""", "project03-task4-code"),
        make_cell("markdown", "## 任务 5：错误图块与染色变化\n\n查看测试集错误图块，固定模型后改变 RGB 通道，再比较宏平均 F1。最后写出代理标签、图像来源和模型评价各自能支持的判断。", "project03-task5-markdown"),
        make_cell("code", """# ===== 项目03·任务5·学生填写区（开始） =====
# TODO：完成错误图块可视化、染色变化比较和 JSON 保存。
# ===== 项目03·任务5·学生填写区（结束） =====
print('输出文件应写入', OUT)  # 显示便于检查的关键信息""", "project03-task5-code"),
    ]
    save_json(path, nb)


def repair_notebook_04() -> None:
    path = PRACTICE / "体验实践项目04.ipynb"
    nb = load_json(path)
    set_source(
        nb["cells"][4],
        "## 任务 2：划分数据、拟合预处理并建立基线\n\n预处理只能使用训练集拟合。验证集用于比较逻辑回归和 XGBoost，测试集在模型设置确定后只评价一次。当前 `Data.csv` 的缺失值总数为 0；代码仍保留训练集内的填补步骤，并在下一段用一小段复制数据观察填补行为。",
    )
    cell = source(nb["cells"][5])
    marker = "print(len(X_train), len(X_val), len(X_test))  # 显示便于检查的关键信息"
    demo = """# 用训练集复制数据制造一个缺失值，仅观察填补动作，不改动原始 Data.csv  # 保持原始数据不变
demo_col = numeric_cols[0]  # 选择第一个数值变量作为演示列
demo_values = X_train[[demo_col]].copy()  # 复制训练集中的一列
demo_values.iloc[:5, 0] = np.nan  # 在副本中放入几个缺失值
demo_imputer = SimpleImputer(strategy='median')  # 使用训练集规则建立中位数填补器
demo_imputer.fit(X_train[[demo_col]])  # 只用训练集拟合填补规则
demo_filled = demo_imputer.transform(demo_values)  # 将训练规则应用到带缺失值的副本
print('缺失演示:', demo_col, '缺失数=', int(demo_values.isna().sum().iloc[0]), '填补后缺失数=', int(np.isnan(demo_filled).sum()))  # 检查填补结果
"""
    if "缺失演示:" not in cell:
        cell = cell.replace(marker, marker + "\n" + demo.rstrip())
    else:
        # Older copies already contain the demonstration.  Replace the
        # original self-fit line so the inserted NaNs are actually passed
        # through the fitted training rule.
        cell = cell.replace(
            "demo_filled = demo_imputer.fit_transform(X_train[[demo_col]])  # 只用训练集拟合并转换",
            "demo_imputer.fit(X_train[[demo_col]])  # 只用训练集拟合填补规则\n"
            "demo_filled = demo_imputer.transform(demo_values)  # 将训练规则应用到带缺失值的副本",
        )
    set_source(nb["cells"][5], cell)
    set_source(
        nb["cells"][8],
        "## 任务 4：评价四分类结果\n\n先在验证集比较基线和 XGBoost，再在设置确定后查看测试集的混淆矩阵、每类 precision/recall/F1、宏平均 F1 和预测概率。",
    )
    save_json(path, nb)


def repair_notebook_05() -> None:
    path = PRACTICE / "体验实践项目05.ipynb"
    nb = load_json(path)
    nb["cells"] = [
        make_cell("markdown", """# 实践项目 05：空间转录组表达超分辨率

本 Notebook 使用课程准备的配对 H&E、LR、HR 和 split 数据。LR 表示 16 μm Snap25 输入，HR 表示 2 μm 参考表达图，模型学习在细网格上估计一个高表达基因的局部表达。

Kaggle 是本项目的首选实践入口。打开公开 Notebook 后，点击“复制并编辑”保存到自己的账户，再按单元格顺序运行。下载 Notebook 到电脑运行是补充方式。

代码中用整行注释标出了需要填写的位置。先阅读当前单元格的输入、处理和输出，再修改标记区域。合理利用 AI 工具理解问题并尝试给出适当的解决方案。

## 任务总览

1. 核对四个字段的 shape、split 数量和 Snap25 表达范围。
2. 选择中心区域，查看同一位置的大图、小图、H&E、LR 和 HR。
3. 补全 H&E 与粗尺度表达联合输入的轻量网络。
4. 完成 log 空间损失和 8×8 区域总量约束。
5. 比较模型与插值基线的 MAE、相关性、聚合误差和空间图。

## 需要保存的结果

`task5_data_visualization.png`、`task5_scale_overview.png`、`task5_training_curve.png`、`task5_prediction_visualization.png`、`task5_result.json`。""", "project05-overview"),
        make_cell("code", """from pathlib import Path  # 导入当前步骤需要的工具
import json, random  # 导入当前步骤需要的工具
import numpy as np  # 导入当前步骤需要的工具
import matplotlib.pyplot as plt  # 导入当前步骤需要的工具
import torch  # 导入当前步骤需要的工具
import torch.nn as nn  # 导入当前步骤需要的工具
from torch.utils.data import Dataset, DataLoader  # 导入当前步骤需要的工具

SEED = 42; random.seed(SEED); np.random.seed(SEED); torch.manual_seed(SEED)  # 固定随机状态以便复现实验
DEVICE = torch.device('cuda' if torch.cuda.is_available() else 'cpu')  # 保存当前步骤使用的中间结果
OUT = Path('/kaggle/working'); OUT.mkdir(exist_ok=True)  # 保存输出文件目录
DATA_PATH = None  # 可在本地填写课程 NPZ 路径；Kaggle 自动查找固定文件名
candidates = sorted(Path('/kaggle/input').rglob('kydw-try-a05-paired-patches.npz'))  # 读取本任务需要的数据
if DATA_PATH is None and candidates: DATA_PATH = candidates[0]  # 根据当前条件选择处理分支
assert DATA_PATH is not None, '请挂载包含 kydw-try-a05-paired-patches.npz 的课程数据集。'  # 执行当前步骤并保留结果
data = np.load(DATA_PATH, allow_pickle=True)  # 读取本任务需要的数据
required = {'he','lr','hr','split'}  # 核对输入字段
assert required.issubset(data.files), required - set(data.files)  # 执行当前步骤并保留结果
he = data['he'].astype(np.float32) / 255.0  # 读取 H&E 图像并归一化
lr = data['lr'].astype(np.float32)  # 读取 16 μm 粗尺度表达总量
hr = data['hr'].astype(np.float32)  # 读取 2 μm 参考表达图
split = data['split'].astype(str)  # 读取预先划分的数据集合
print('he/lr/hr:', he.shape, lr.shape, hr.shape, 'splits:', {k: int((split == k).sum()) for k in np.unique(split)})  # 显示核对结果""", "project05-setup"),
        make_cell("markdown", "## 任务 1：核对输入字段与空间划分\n\nH&E、LR 和 HR 覆盖同一空间区域。LR 在每个 8×8 区域内记录粗尺度总量；`split` 是课程数据预先提供的空间划分。", "project05-task1-markdown"),
        make_cell("code", """# ===== 项目05·任务1·学生填写区（开始） =====
# TODO：统计各 split 数量、shape、非零比例和最大值，并确认 split 只包含 train、validation、test。
summary = None  # 保存当前步骤的核对结果
# ===== 项目05·任务1·学生填写区（结束） =====
print(summary)  # 显示便于检查的关键信息""", "project05-task1-code"),
        make_cell("markdown", "## 任务 2：配对大图、小图与表达图\n\n从 train 样本中选择组织覆盖较完整、表达信号可见的一项，把 H&E、LR 粗尺度密度和 HR 参考表达图放在同一行，再截取中心区域放大。三列来自同一个空间区域，色标可以分别设置。", "project05-task2-markdown"),
        make_cell("code", """# ===== 项目05·任务2·学生填写区（开始） =====
# TODO：选择中心组织覆盖完整且 HR 非零比例较高的 train 样本，绘制大图与中心小图。
sample_index = None  # 填写一个 train 样本的整数索引
# ===== 项目05·任务2·学生填写区（结束） =====
print('请完成同一区域的大图、小图、H&E、LR 和 HR 可视化。')  # 提示当前任务的输出""", "project05-task2-code"),
        make_cell("markdown", "## 任务 3：补全融合网络\n\n输入为 4 个通道（H&E 三通道和 LR 密度），输出为 1 个通道的细尺度表达预测。", "project05-task3-markdown"),
        make_cell("code", """# ===== 项目05·任务3·学生填写区（开始） =====
class STDataset(Dataset):  # 定义本任务使用的数据结构
    def __init__(self, kind): self.ids = np.where(split == kind)[0]  # 保存指定集合的样本编号
    def __len__(self): return len(self.ids)  # 返回样本数量
    def __getitem__(self, k):  # 读取一个样本
        i = int(self.ids[k]); lr_total = lr[i]  # 读取样本和粗尺度总量
        x = np.concatenate([he[i], np.log1p(lr_total / 64.0)], axis=0)  # 拼接四通道输入
        y = np.log1p(hr[i])  # 使用 log1p 压缩稀疏表达范围
        return torch.from_numpy(x), torch.from_numpy(y), torch.from_numpy(lr_total), i  # 返回输入、目标和编号

class SRNet(nn.Module):  # 定义本任务使用的模型
    def __init__(self):  # 初始化网络
        super().__init__()  # 初始化父类
        # TODO：补全 4 通道输入、1 通道输出的卷积结构。
        self.body = None  # 保存模型主体
    def forward(self, x): return torch.nn.functional.softplus(x[:, 3:4] + self.body(x))  # 保持非负输出

model = None  # TODO：实例化 SRNet 并移动到 DEVICE
# ===== 项目05·任务3·学生填写区（结束） =====
print(model)  # 显示便于检查的模型结构""", "project05-task3-code"),
        make_cell("markdown", "## 任务 4：损失和 8×8 总量约束\n\n预测值按 8×8 区域求和后，应与 LR 中的粗尺度总量接近；这项约束让输出保留观测到的总量。", "project05-task4-markdown"),
        make_cell("code", """# ===== 项目05·任务4·学生填写区（开始） =====
def aggregate8(x): return torch.nn.functional.avg_pool2d(x, 8, 8) * 64  # 计算每个 8×8 区域的总量

def loss_fn(pred_log, target_log, lr_raw):  # 定义训练损失
    pred = torch.expm1(pred_log).clamp_min(0)  # 把预测恢复到原始计数尺度
    target = torch.expm1(target_log).clamp_min(0)  # 把目标恢复到原始计数尺度
    l1 = (pred_log - target_log).abs().mean()  # 计算 log 空间误差
    # TODO：计算 aggregate8(pred) 与 avg_pool2d(lr_raw, 8, 8) 的差异。
    consistency = None  # 保存聚合一致性损失
    return l1 + .1 * consistency  # 合并逐像素和区域级损失
# ===== 项目05·任务4·学生填写区（结束） =====
print('请完成 8×8 聚合一致性损失。')  # 提示当前任务的输出""", "project05-task4-code"),
        make_cell("markdown", "## 任务 5：训练与结果比较\n\n完成训练后，比较模型与插值基线的 MAE、Pearson 相关性和 8×8 聚合误差，并查看预测、参考和误差图。", "project05-task5-markdown"),
        make_cell("code", """# ===== 项目05·任务5·学生填写区（开始） =====
# TODO：完成训练、验证选模、模型与插值基线比较，以及结果保存。
# 参考答案会使用较长训练和稳定的模型设置，但题目版不直接给出完整结果。
# ===== 项目05·任务5·学生填写区（结束） =====
print('输出文件应写入', OUT)  # 显示便于检查的关键信息""", "project05-task5-code"),
    ]
    save_json(path, nb)


def rebuild_notebook_05_clean() -> None:
    """Replace the older duplicated-task copy with the five-task student flow."""
    path = PRACTICE / "体验实践项目05.ipynb"
    nb = load_json(path)
    nb["cells"] = [
        make_cell("markdown", """# 实践项目 05：空间转录组表达超分辨率

本 Notebook 使用课程准备的配对 H&E、LR、HR 和 split 数据。LR 表示 16 μm Snap25 输入，HR 表示 2 μm 参考表达图，模型学习在细网格上估计一个高表达基因的局部表达。

Kaggle 是本项目的首选实践入口。打开公开 Notebook 后，点击“复制并编辑”保存到自己的账户，再按单元格顺序运行。下载 Notebook 到电脑运行是补充方式。

代码中用整行注释标出了需要填写的位置。先阅读当前单元格的输入、处理和输出，再修改标记区域。合理利用 AI 工具理解问题并尝试给出适当的解决方案。

## 任务总览

1. 核对四个字段的 shape、split 数量和 Snap25 表达范围。
2. 选择中心区域，查看同一位置的大图、小图、H&E、LR 和 HR。
3. 补全 H&E 与粗尺度表达联合输入的轻量网络。
4. 完成 log 空间损失和 8×8 区域总量约束。
5. 比较模型与插值基线的 MAE、相关性、聚合误差和空间图。

## 需要保存的结果

`task5_data_visualization.png`、`task5_scale_overview.png`、`task5_training_curve.png`、`task5_prediction_visualization.png`、`task5_result.json`。""", "project05-overview"),
        make_cell("code", """from pathlib import Path  # 导入当前步骤需要的工具
import json, random  # 导入当前步骤需要的工具
import numpy as np  # 导入当前步骤需要的工具
import matplotlib.pyplot as plt  # 导入当前步骤需要的工具
import torch  # 导入当前步骤需要的工具
import torch.nn as nn  # 导入当前步骤需要的工具
from torch.utils.data import Dataset, DataLoader  # 导入当前步骤需要的工具

SEED = 42; random.seed(SEED); np.random.seed(SEED); torch.manual_seed(SEED)  # 固定随机状态以便复现实验
DEVICE = torch.device('cuda' if torch.cuda.is_available() else 'cpu')  # 保存当前步骤使用的中间结果
OUT = Path('/kaggle/working'); OUT.mkdir(exist_ok=True)  # 保存输出文件目录
DATA_PATH = None  # 可在本地填写课程 NPZ 路径；Kaggle 自动查找固定文件名
candidates = sorted(Path('/kaggle/input').rglob('kydw-try-a05-paired-patches.npz'))  # 读取本任务需要的数据
if DATA_PATH is None and candidates: DATA_PATH = candidates[0]  # 根据当前条件选择处理分支
assert DATA_PATH is not None, '请挂载包含 kydw-try-a05-paired-patches.npz 的课程数据集。'  # 执行当前步骤并保留结果
data = np.load(DATA_PATH, allow_pickle=True)  # 读取本任务需要的数据
required = {'he','lr','hr','split'}  # 核对输入字段
assert required.issubset(data.files), required - set(data.files)  # 执行当前步骤并保留结果
he = data['he'].astype(np.float32) / 255.0  # 读取 H&E 图像并归一化
lr = data['lr'].astype(np.float32)  # 读取 16 μm 粗尺度表达总量
hr = data['hr'].astype(np.float32)  # 读取 2 μm 参考表达图
split = data['split'].astype(str)  # 读取预先划分的数据集合
print('he/lr/hr:', he.shape, lr.shape, hr.shape, 'splits:', {k: int((split == k).sum()) for k in np.unique(split)})  # 显示核对结果""", "project05-setup"),
        make_cell("markdown", "## 任务 1：核对输入字段与空间划分\n\nH&E、LR 和 HR 覆盖同一空间区域。LR 在每个 8×8 区域内记录粗尺度总量；`split` 是课程数据预先提供的空间划分。", "project05-task1-markdown"),
        make_cell("code", """# ===== 项目05·任务1·学生填写区（开始） =====
# TODO：统计各 split 数量、shape、非零比例和最大值，并确认 split 只包含 train、validation、test。
summary = None  # 保存当前步骤的核对结果
# ===== 项目05·任务1·学生填写区（结束） =====
print(summary)  # 显示便于检查的关键信息""", "project05-task1-code"),
        make_cell("markdown", "## 任务 2：配对大图、小图与表达图\n\n从 train 样本中选择组织覆盖较完整、表达信号可见的一项，把 H&E、LR 粗尺度密度和 HR 参考表达图放在同一行，再截取中心区域放大。三列来自同一个空间区域，色标可以分别设置。", "project05-task2-markdown"),
        make_cell("code", """# ===== 项目05·任务2·学生填写区（开始） =====
# TODO：选择中心组织覆盖完整且 HR 非零比例较高的 train 样本，绘制大图与中心小图。
sample_index = None  # 填写一个 train 样本的整数索引
# ===== 项目05·任务2·学生填写区（结束） =====
print('请完成同一区域的大图、小图、H&E、LR 和 HR 可视化。')  # 提示当前任务的输出""", "project05-task2-code"),
        make_cell("markdown", "## 任务 3：补全融合网络\n\n输入为 4 个通道（H&E 三通道和 LR 密度），输出为 1 个通道的细尺度表达预测。", "project05-task3-markdown"),
        make_cell("code", """# ===== 项目05·任务3·学生填写区（开始） =====
class STDataset(Dataset):  # 定义本任务使用的数据结构
    def __init__(self, kind): self.ids = np.where(split == kind)[0]  # 保存指定集合的样本编号
    def __len__(self): return len(self.ids)  # 返回样本数量
    def __getitem__(self, k):  # 读取一个样本
        i = int(self.ids[k]); lr_total = lr[i]  # 读取样本和粗尺度总量
        x = np.concatenate([he[i], np.log1p(lr_total / 64.0)], axis=0)  # 拼接四通道输入
        y = np.log1p(hr[i])  # 使用 log1p 压缩稀疏表达范围
        return torch.from_numpy(x), torch.from_numpy(y), torch.from_numpy(lr_total), i  # 返回输入、目标和编号

class SRNet(nn.Module):  # 定义本任务使用的模型
    def __init__(self):  # 初始化网络
        super().__init__()  # 初始化父类
        # TODO：补全 4 通道输入、1 通道输出的卷积结构。
        self.body = None  # 保存模型主体
    def forward(self, x): return torch.nn.functional.softplus(x[:, 3:4] + self.body(x))  # 保持非负输出

model = None  # TODO：实例化 SRNet 并移动到 DEVICE
# ===== 项目05·任务3·学生填写区（结束） =====
print(model)  # 显示便于检查的模型结构""", "project05-task3-code"),
        make_cell("markdown", "## 任务 4：损失和 8×8 总量约束\n\n预测值按 8×8 区域求和后，应与 LR 中的粗尺度总量接近；这项约束让输出保留观测到的总量。", "project05-task4-markdown"),
        make_cell("code", """# ===== 项目05·任务4·学生填写区（开始） =====
def aggregate8(x): return torch.nn.functional.avg_pool2d(x, 8, 8) * 64  # 计算每个 8×8 区域的总量

def loss_fn(pred_log, target_log, lr_raw):  # 定义训练损失
    pred = torch.expm1(pred_log).clamp_min(0)  # 把预测恢复到原始计数尺度
    target = torch.expm1(target_log).clamp_min(0)  # 把目标恢复到原始计数尺度
    l1 = (pred_log - target_log).abs().mean()  # 计算 log 空间误差
    # TODO：计算 aggregate8(pred) 与 avg_pool2d(lr_raw, 8, 8) 的差异。
    consistency = None  # 保存聚合一致性损失
    return l1 + .1 * consistency  # 合并逐像素和区域级损失
# ===== 项目05·任务4·学生填写区（结束） =====
print('请完成 8×8 聚合一致性损失。')  # 提示当前任务的输出""", "project05-task4-code"),
        make_cell("markdown", "## 任务 5：训练与结果比较\n\n完成训练后，比较模型与插值基线的 MAE、Pearson 相关性和 8×8 聚合误差，并查看预测、参考和误差图。", "project05-task5-markdown"),
        make_cell("code", """# ===== 项目05·任务5·学生填写区（开始） =====
# TODO：完成训练、验证选模、模型与插值基线比较，以及结果保存。
# 参考答案会使用较长训练和稳定的模型设置，但题目版不直接给出完整结果。
# ===== 项目05·任务5·学生填写区（结束） =====
print('输出文件应写入', OUT)  # 显示便于检查的关键信息""", "project05-task5-code"),
    ]
    save_json(path, nb)


def patch_teaching() -> None:
    p04 = TEACHING / "体验教学项目04.html"
    text = p04.read_text(encoding="utf-8")
    old = '<div class="lecture-open">缺失值可能来自未检查、设备故障、随访中断或记录遗漏。不同形成机制会改变处理方式，简单删除可能让剩余样本不再代表目标人群。</div>'
    new = old + '<p>课程提供的 <code>Data.csv</code> 当前没有缺失值，所以主流程不会删去样本。Notebook 仍保留训练集内的中位数和众数填补器，并用复制出的几行数据演示填补动作；这样可以把数据现状与可迁移的预处理方法放在同一个流程中理解。</p>'
    if old in text and "课程提供的 <code>Data.csv</code> 当前没有缺失值" not in text:
        text = text.replace(old, new, 1)
    old = '<p>实践 Notebook 使用固定的 Data.csv 和 label 列，需要完成数据检查、预处理、XGBoost 参数、四分类评价和变量贡献分析。合理利用 AI 工具理解问题、学习知识并尝试给出适当的解决方案。</p><p>确认每行代表一名受试者，检查四类数量和输入变量来源。</p><p>完成缺失值处理、类别编码和 XGBoost 模型参数。</p><p>在测试集输出混淆矩阵、分类指标和预测概率。</p><p>完成一次变量置换比较，说明结果可以支持什么判断。</p>'
    new = '<p>实践 Notebook 使用固定的 Data.csv 和 label 列，需要完成数据检查、预处理、XGBoost 参数、验证集比较、测试集评价和变量贡献分析。合理利用 AI 工具理解问题、学习知识并尝试给出适当的解决方案。</p><p>确认每行代表一名受试者，检查四类数量和输入变量来源。</p><p>观察训练集规则如何处理缺失值和类别变量，并完成缺失值演示。</p><p>完成 XGBoost 模型参数，在验证集比较基线和 XGBoost，再在测试集输出混淆矩阵、分类指标和预测概率。</p><p>完成一次变量置换比较，说明结果可以支持什么判断。</p>'
    if old in text:
        text = text.replace(old, new, 1)
    # Keep public headings as neutral knowledge-point phrases.  The teaching
    # pages are read by students, so internal labels such as "体验版" and
    # narrative headings such as "从……到……" should not appear there.
    text = text.replace("<h2>1. 表格预测先确定样本和目标</h2>", "<h2>1. 样本单位与预测目标</h2>")
    text = text.replace("受试者级表格如何形成", "受试者级表格的形成")
    text = text.replace("<h2>4. 从逻辑回归到决策树</h2>", "<h2>4. 逻辑回归、决策树与基线模型</h2>")
    text = text.replace("<span>从逻辑回归到决策树</span>", "<span>逻辑回归、决策树与基线模型</span>")
    text = text.replace("从逻辑回归到决策树", "逻辑回归、决策树与基线模型")
    # Rewrite the practice checklist as one compact block so wording changes
    # remain aligned with the five cells in the revised notebook.
    start = text.index('<section class="lesson" id="practice">')
    end = text.index('</section>', start) + len('</section>')
    text = text[:start] + (
        '<section class="lesson" id="practice"><h2>9. 实践项目：XGBoost 脑疾病表格分类</h2>'
        '<div class="lecture-open">实践 Notebook 使用固定的 Data.csv 和 label 列，需要完成数据检查、预处理、XGBoost 参数、验证集比较、测试集评价和变量贡献分析。合理利用 AI 工具理解问题、学习知识并尝试给出适当的解决方案。</div>'
        '<p>确认每行代表一名受试者，检查四类数量和输入变量来源。</p>'
        '<p>观察训练集规则如何处理缺失值和类别变量，并完成缺失值演示。</p>'
        '<p>完成 XGBoost 模型参数，在验证集比较基线和 XGBoost，再在测试集输出混淆矩阵、分类指标和预测概率。</p>'
        '<p>完成一次变量置换比较，说明结果可以支持什么判断。</p>'
        '<p>完成后查看结果，记录自己对数据和模型的理解。</p></section>'
    ) + text[end:]
    p04.write_text(_clean_public_language(text), encoding="utf-8")

    p03 = TEACHING / "体验教学项目03.html"
    text = p03.read_text(encoding="utf-8")
    text = text.replace("<h2>2. 病理诊断如何观察组织</h2>", "<h2>2. 病理观察与组织结构</h2>")
    text = text.replace("图块如何代表一张切片", "图块与切片层级")
    text = text.replace("实践项目使用颜色统计作为简单基线，再让 CNN 学习局部纹理和组织结构。由于教学标签本身来自核密度代理分数，颜色基线表现较好是预期现象，比较的重点是模型是否提供额外的空间信息。", "实践项目先用 RGB 统计建立颜色比较，再使用由 H&amp;E 图像测得的核相关信号、深色比例、饱和度和苏木精均值训练随机森林。由于教学标签本身来自核密度代理分数，模型结果表示对图像派生规则的复现，不表示临床分级能力。")
    text = text.replace("本实践把苏木精通道的核相关信号汇总为连续代理分数，再根据训练集分布划分为低、中、高三档。这个过程让学生看到标签如何由图像计算得到，也能观察颜色基线为什么会有较强表现。", "本实践把苏木精通道的核相关信号汇总为连续代理分数，再根据训练集分布划分为低、中、高三档。模型使用代理分数以外的形态统计，学生可以观察不把标签生成规则直接放入输入时，图像测量仍能否支持分类。")
    text = text.replace("颜色统计可以建立简单基线，卷积网络进一步学习核边缘、纹理和组织结构。评价时要按原图或患者划分，并用混淆矩阵和错误图块查看模型混淆。", "颜色统计可以建立简单比较，形态特征随机森林进一步组合核相关信号、深色比例、饱和度和苏木精强度。评价时要按原图或患者划分，并用混淆矩阵和错误图块查看模型混淆。")
    text = text.replace("颜色基线可以提取每个图块的 RGB 均值、标准差、颜色分位数和核相关像素比例，再使用逻辑回归、决策树或其他简单分类器。基线结构透明、训练快速，能够判断标签是否主要由颜色统计决定。", "颜色基线可以提取每个图块的 RGB 均值和标准差，再使用逻辑回归进行透明比较。形态特征模型使用核相关像素比例、深色比例、饱和度和苏木精均值，再交给随机森林组合非线性关系。")
    text = text.replace("CNN 只有在使用空间排列、核轮廓或组织构筑后，才有机会提供额外价值。", "形态特征模型的输入仍是图块级统计，不能替代细胞级分割或完整空间模型。")
    text = text.replace("基线和 CNN 同时明显下降", "两种分类器同时明显下降")
    text = text.replace("颜色基线与卷积网络的比较", "颜色统计与形态特征模型的比较")
    text = text.replace("<b>卷积神经网络</b>在颜色之外学习核边缘、局部纹理、细胞排列和组织构筑。", "<b>形态特征随机森林</b>组合五个图像测得的统计量，proxy_score 不进入输入。")
    text = text.replace("当前模型的混淆矩阵、基线比较和代表性测试图块。", "形态特征随机森林的混淆矩阵、颜色统计比较和代表性测试图块。")
    text = text.replace("若复杂网络在这个任务上取得高分，需要与颜色基线比较，才能判断性能是否来自局部形态和空间结构。", "若形态特征模型在这个任务上取得高分，需要检查输入字段和原图级划分，确认性能来自可解释的图像测量。")
    text = text.replace("卷积层使用小型卷积核在图像上滑动，提取边缘、纹理和局部颜色组合。浅层特征可以响应细胞核边界、染色变化和纤维纹理；多层卷积逐步扩大感受野，组合细胞簇、旋涡和组织束。池化或步长卷积压缩空间尺寸，最终分类头把特征转换为类别得分。", "随机森林由多棵决策树组成，每棵树在特征和样本的随机子集上建立分支，最后以多数投票给出类别。单棵树可以把核相关比例、深色比例或苏木精强度切成不同区间，多棵树的组合减少某一棵树对训练样本的依赖。")
    text = text.replace("连续卷积逐步扩大每个深层特征对应的输入区域。加入池化或步长时，感受野增长更快，同时空间分辨率下降。", "树模型没有卷积网络的感受野概念，输入特征的定义决定了它能看到的组织证据。图像测量得到的是图块级统计，因此结果仍然不能解释细胞级空间关系。")
    text = text.replace("颜色基线已经达到较高准确率时，继续训练 CNN 的主要分析价值是什么", "颜色统计和形态特征模型都达到较高准确率时，结果还需要怎样解释")
    text = text.replace("CNN 可以检验局部空间结构是否提供颜色统计之外的信息。比较还应包括颜色扰动、遮挡、跨原图验证和错误样本。若 CNN 仅复制颜色基线，复杂结构没有产生额外的形态学证据。", "需要先确认 proxy_score 没有进入模型输入，再结合跨原图划分、染色变化和错误图块判断结果边界。高分说明模型能够复现图像派生的核密度档位，不能直接推断临床病理等级。")
    text = text.replace(
        "我们从疾病、肿瘤和病理诊断讲起，随后进入 H&amp;E、数字病理、全切片图像、多实例学习和脑膜瘤形态分析。",
        "本章内容包括疾病、肿瘤与病理诊断、H&amp;E、数字病理、全切片图像、多实例学习和脑膜瘤形态分析。",
    )
    text = text.replace("当前体验版模型的混淆矩阵、基线比较和代表性测试图块。", "形态特征随机森林的混淆矩阵、颜色统计比较和代表性测试图块。")
    disease_marker = '</div></section><section class="lesson" id="pathology">'
    disease_figure = (
        '<figure class="actual-data"><img alt="真实脑膜瘤 H&amp;E 图块总览" loading="lazy" '
        'src="../assets/results/project-03/task3_real_he_overview.png"/>'
        '<figcaption>课程数据中的真实脑膜瘤 H&amp;E 局部图块。蓝紫色主要对应细胞核，粉红色对应胞质和间质；行间标签是核密度代理标签，不是临床病理分级。</figcaption></figure>'
    )
    if "task3_real_he_overview.png" not in text and disease_marker in text:
        text = text.replace(disease_marker, f'</div>{disease_figure}</section><section class="lesson" id="pathology">', 1)
    patch_start = text.find('<div class="miniapp" id="app03patch">')
    split_start = text.find('<div class="miniapp" id="app03split">', patch_start)
    if patch_start >= 0 and split_start > patch_start:
        patch_figure = (
            '<figure class="actual-data"><img alt="真实脑膜瘤 H&amp;E 图块坐标与步长" loading="lazy" '
            'src="../assets/results/project-03/task3_patch_stride_overview.png"/>'
            '<figcaption>真实数据的图块抽样几何：每个图块为 128×128 像素，记录的相邻左上角坐标间隔为 256 像素。图中红、蓝框来自同一张原图的真实图块，间隔大于图块边长，因此这组相邻图块没有重叠。</figcaption></figure>'
        )
        text = text[:patch_start] + patch_figure + text[split_start:]
    practice_start = text.find('<section class="lesson" id="practice">')
    practice_end = text.find('</section>', practice_start)
    if practice_start >= 0 and practice_end > practice_start:
        practice = (
            '<section class="lesson" id="practice"><h2>9. 实践项目：脑膜瘤 H&amp;E 形态代理分类</h2>'
            '<div class="lecture-open">实践 Notebook 已给出数据读取和主要流程，需要完成数据检查、形态特征模型、验证集选模、评价和结果保存。合理利用 AI 工具理解问题并尝试给出适当的解决方案。</div>'
            '<p>先确认图块数量、标签分布和原图级划分，再开始训练。</p>'
            '<p>查看 RGB 统计和形态特征，补全随机森林并用验证集选择树数量。</p>'
            '<p>查看混淆矩阵、错误图块和染色变化结果，说明模型在哪些情形下容易混淆。</p>'
            '<p>完成后查看结果，记录自己对图像、标签和错误的理解。</p></section>'
        )
        text = text[:practice_start] + practice + text[practice_end + len('</section>'):]
    p03.write_text(_clean_public_language(text), encoding="utf-8")

    p05 = TEACHING / "体验教学项目05.html"
    text = p05.read_text(encoding="utf-8")
    old = "训练区域和测试区域需要留出空间距离，避免模型通过相邻位置直接记住局部表达模式。体验项目只观察这种划分思想，复杂空间统计留到进阶项目。"
    new = "训练区域和测试区域需要留出空间距离，避免模型通过相邻位置直接记住局部表达模式。课程数据中的 `split` 已经按照空间区域预先写入，Notebook 可以核对各集合的样本数，但当前 NPZ 没有坐标或区域编号，不能在实践中重新计算空间距离。页面中的划分图用于理解随机点、空间区块和缓冲带的差别。"
    if old in text:
        text = text.replace(old, new, 1)
    text = text.replace("<h2>2. 转录组从平均值走向空间</h2>", "<h2>2. 转录组数据的空间层级</h2>")
    text = text.replace("<span>转录组从平均值走向空间</span>", "<span>转录组数据的空间层级</span>")
    text = text.replace("转录组从平均值走向空间", "转录组数据的空间层级")
    text = text.replace("<h2>7. H&amp;E 与表达信息怎样进入模型</h2>", "<h2>7. H&amp;E 与表达信息的模型输入</h2>")
    text = text.replace(
        "我们从基因表达和转录组测量讲起，逐步认识空间坐标、组织图像、空间结构、表达超分辨率和多模态模型。",
        "本章内容包括基因表达、转录组测量、空间坐标、组织图像、空间结构、表达超分辨率和多模态模型。",
    )
    text = text.replace("体验版使用轻量模型，重点是理解输入、输出和评价方法，不要求比较多种复杂网络。", "本次实践使用轻量模型，重点是理解输入、输出和评价方法，不要求比较多种复杂网络。")
    text = text.replace(
        "本次实践使用轻量模型，重点是理解输入、输出和评价方法，不要求比较多种复杂网络。",
        "本次实践只预测高表达基因 Snap25。模型把 H&amp;E 颜色、局部图像特征和 16 μm 表达作为输入，学习每个 8×8 区域内部的表达份额，再按原始总量恢复 2 μm 预测。",
    )
    text = text.replace(
        "使用 真实小鼠脑组织图像 的真实 H&amp;E、全阵列 spots 和 in_tissue spots。背景 spots 使用浅灰空心圆，组织内 spots 使用固定轮廓。表达颜色暂不叠加，避免组织覆盖与表达强度混在一起。",
        "使用课程准备的配对 H&amp;E、低分辨率表达图和高分辨率参考表达图，先核对组织覆盖，再分别阅读形态和空间表达。",
    )
    old = '<div class="lecture-open">实践 Notebook 使用课程准备的配对 H&amp;E、LR、HR 和 split 数据，需要完成输入核对、模型补全、聚合一致性、训练和结果比较。合理利用 AI 工具理解问题并尝试给出适当的解决方案。</div><p>先查看四个字段的 shape、split 数量和表达范围。</p><p>补全 H&amp;E 与粗尺度表达联合输入的轻量网络，确认输出与参考表达图形状一致。</p><p>完成损失计算和训练，记录验证 MAE。</p><p>比较模型与插值基线，查看预测、参考表达和误差图。</p>'
    if old not in text:
        old = '<div class="lecture-open">实践 Notebook 使用课程准备的配对 H&amp;E、LR、HR 和 split 数据，需要完成输入核对、模型补全、聚合一致性、训练和结果比较。合理利用 AI 工具理解问题与尝试给出适当的解决方案。</div><p>先查看四个字段的 shape、split 数量和表达范围。</p><p>补全 H&amp;E 与粗尺度表达联合输入的轻量网络，确认输出与参考表达图形状一致。</p><p>完成损失计算和训练，记录验证 MAE。</p><p>比较模型与插值基线，查看预测、参考表达和误差图。</p>'
    new = '<div class="lecture-open">实践 Notebook 使用课程准备的配对 H&amp;E、LR、HR 和 split 数据，需要完成输入核对、同一区域三种输入的可视化、模型补全、聚合一致性、训练和结果比较。合理利用 AI 工具理解问题并尝试给出适当的解决方案。</div><p>先查看四个字段的 shape、split 数量和表达范围。</p><p>选择一个样本，把 H&amp;E、LR 粗尺度密度和 HR 参考表达图放在同一行阅读。</p><p>补全 H&amp;E 与粗尺度表达联合输入的轻量网络，确认输出与参考表达图形状一致。</p><p>完成损失计算和训练，记录验证 MAE。</p><p>比较模型与插值基线，查看预测、参考表达和误差图。</p>'
    if old in text:
        text = text.replace(old, new, 1)
    pair_figure = (
        '<figure class="actual-data"><img alt="配对 H&amp;E、16 μm LR 与 2 μm HR 表达图" loading="lazy" '
        'src="../assets/results/project-05/task5_data_visualization.png"/>'
        '<figcaption>同一组织区域的配对数据：左侧为 H&amp;E 形态，中间为 16 μm 低分辨率表达观测，右侧为 2 μm 参考表达图。三列不是三个样本。</figcaption></figure>'
    )
    omics_start = text.find('<section class="lesson" id="omics">')
    omics_end = text.find('</section>', omics_start)
    qc_start = text.find('<section class="lesson" id="qc">')
    if qc_start >= 0:
        fig_start = text.find('<figure class="actual-data">', qc_start)
        fig_end = text.find('</figure>', fig_start)
        if fig_start >= 0 and fig_end >= 0:
            text = text[:fig_start] + text[fig_end + len('</figure>'):]
            omics_start = text.find('<section class="lesson" id="omics">')
            omics_end = text.find('</section>', omics_start)
    if omics_start >= 0 and omics_end >= 0 and "task5_data_visualization.png" not in text[omics_start:omics_end]:
        text = text[:omics_end] + pair_figure + text[omics_end:]
    scale_figure = (
        '<figure class="actual-data"><img alt="空间表达大图与中心小图" loading="lazy" '
        'src="../assets/results/project-05/task5_scale_overview.png"/>'
        '<figcaption>上排显示 256×256 的完整配对区域，下排显示红框中心的 160×160 裁剪。小图来自同一坐标区域，用于说明显示尺度与表达网格之间的对应关系。</figcaption></figure>'
    )
    super_start = text.find('<section class="lesson" id="super">')
    super_end = text.find('</section>', super_start)
    if super_start >= 0 and super_end >= 0 and "task5_scale_overview.png" not in text[super_start:super_end]:
        text = text[:super_end] + scale_figure + text[super_end:]
    start = text.index('<section class="lesson" id="practice">')
    end = text.index('</section>', start) + len('</section>')
    text = text[:start] + (
        '<section class="lesson" id="practice"><h2>9. 实践项目：空间转录组表达超分辨率</h2>'
        '<div class="lecture-open">实践 Notebook 使用课程准备的配对 H&amp;E、LR、HR 和 split 数据，只预测高表达基因 Snap25。需要完成输入核对、同一区域三种输入的可视化、局部特征模型、表达份额和 8×8 总量约束、训练与结果比较。合理利用 AI 工具理解问题并尝试给出适当的解决方案。</div>'
        '<p>先查看四个字段的 shape、split 数量和表达范围。</p>'
        '<p>选择一个样本，把 H&amp;E、LR 粗尺度密度和 HR 参考表达图放在同一行阅读。</p>'
        '<p>建立 H&amp;E 与粗尺度表达的局部特征，训练 Snap25 表达份额模型，确认输出与参考表达图形状一致。</p>'
        '<p>按 8×8 区域恢复低分辨率观测的总量，记录验证 MAE 和空间相关性。</p>'
        '<p>比较特征模型与插值基线，查看预测、参考表达和误差图。</p>'
        '<p>完成后查看结果，记录自己对输入、输出和评价指标的理解。</p></section>'
    ) + text[end:]
    p05.write_text(_clean_public_language(text), encoding="utf-8")


def extract_function(name: str) -> str:
    raw = RUNNER.read_text(encoding="utf-8")
    tree = ast.parse(raw)
    lines = raw.splitlines()
    node = next(n for n in tree.body if isinstance(n, ast.FunctionDef) and n.name == name)
    return "\n".join(lines[node.lineno - 1:node.end_lineno])


def runner_preamble(function_name: str) -> str:
    """Return only the imports and helpers needed by one reference function."""
    raw = RUNNER.read_text(encoding="utf-8")
    tree = ast.parse(raw)
    nodes = list(tree.body)
    first_function = next(node for node in nodes if isinstance(node, ast.FunctionDef))
    parts = []
    for node in nodes:
        if node.lineno >= first_function.lineno:
            break
        if isinstance(node, (ast.Import, ast.ImportFrom, ast.Assign, ast.AnnAssign, ast.Expr)):
            parts.append(ast.get_source_segment(raw, node) or "")
    dependencies = {
        "run_project03": {"save_json", "_representative_meningioma_picks", "_save_meningioma_visuals"},
        "run_project04": {"save_json"},
        "run_project05": {"save_json", "_choose_spatial_sample", "_expression_vmax"},
    }.get(function_name, {"save_json"})
    for node in nodes:
        if isinstance(node, ast.FunctionDef) and node.name in dependencies:
            parts.append(ast.get_source_segment(raw, node) or "")
    return "\n\n".join(part for part in parts if part).rstrip()


def annotate(code: str) -> str:
    """Add concise Chinese end-of-line notes to important reference lines."""
    notes = {
        "data = np.load(data_path, allow_pickle=True)": "  # 读取课程准备的配对数据",
        "train_idx = np.where(split == \"train\")[0]": "  # 训练集只用于拟合模型",
        "val_idx = np.where(split == \"validation\")[0]": "  # 验证集用于选择模型设置",
        "test_idx = np.where(split == \"test\")[0]": "  # 测试集只在设置确定后评价",
        "baseline.fit(features[train_idx], labels[train_idx])": "  # 拟合颜色统计基线",
        "model = RandomForestClassifier(": "  # 创建形态特征随机森林模型",
        "model.load_state_dict(best_state)": "  # 恢复验证集表现最好的参数",
        "test_prob = model.predict_proba(X_test)": "  # 取得四个类别的测试概率",
        "model.fit(X_train, y_train)": "  # 使用训练集拟合 XGBoost",
        "importance = permutation_importance(": "  # 通过打乱单列观察性能变化",
        "model = SRNet().to(device)": "  # 创建表达图预测模型",
        "model.load_state_dict(best_state)": "  # 恢复验证 MAE 最低的参数",
    }
    out = []
    for line in code.splitlines():
        stripped = line.strip()
        if stripped and not stripped.startswith("#") and not stripped.endswith("# 读取课程准备的配对数据"):
            for prefix, note in notes.items():
                if stripped.startswith(prefix) and "#" not in line:
                    line += note
                    break
        out.append(line)
    return "\n".join(out)


def answer_html(public_no: str, site_no: str, title: str, description: str, result_names: list[str], function: str, data_name: str) -> str:
    full = runner_preamble(f"run_project{public_no}") + "\n\n" + function + f"\n\n# 在 Kaggle 中自动找到课程数据并运行参考流程\nDATA_PATH = sorted(Path('/kaggle/input').rglob('{data_name}'))[0]  # 定位已挂载的课程数据\nOUT = Path('/kaggle/working')  # 保存图像和 JSON 结果\nrun_project{public_no}(DATA_PATH, OUT)  # 运行完整参考流程"
    escaped = html.escape(annotate(full), quote=False)
    image_html = "".join(
        f'<figure><img loading="lazy" src="../assets/results/project-{public_no}/assets" alt="项目 {public_no} 参考结果：{name}"><figcaption>{name}</figcaption></figure>'
        for name in result_names
    )
    # Replace the temporary image suffix with the actual relative asset path.
    image_html = image_html.replace("/assets\"", "\"")
    image_html = "".join(
        f'<figure><img loading="lazy" src="../assets/results/project-{public_no}/{name}" alt="项目 {public_no} 参考结果：{name}"><figcaption>{name}</figcaption></figure>'
        for name in result_names
        if name.lower().endswith((".png", ".jpg", ".jpeg", ".webp"))
    )
    return f'''<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" href="data:,">
<title>实践项目参考答案 {public_no}：{title}｜KYDW</title>
<style>
body{{margin:0;background:#f3f6f7;color:#17242b;font-family:"Microsoft YaHei",Arial,sans-serif;line-height:1.75}}
main{{max-width:980px;margin:auto;padding:28px 20px 64px}}h1{{font-size:2rem;margin:.2em 0}}h2{{font-size:1.25rem;margin-top:0}}
.hero,.card{{background:#fff;border:1px solid #d9e2e6;border-radius:16px;padding:22px;margin:16px 0;box-shadow:0 8px 24px rgba(31,55,66,.06)}}
.note{{border-left:4px solid #287d86;background:#edf7f7;padding:12px 14px;border-radius:8px}}
pre{{overflow:auto;background:#14232b;color:#e9f2f4;border-radius:12px;padding:16px;line-height:1.55;white-space:pre-wrap}}code{{font-family:Consolas,"SFMono-Regular",monospace}}
ul{{padding-left:1.4em}}a{{color:#176c75}}.results{{display:grid;grid-template-columns:1fr;gap:20px}}figure{{margin:0}}figure img{{display:block;width:auto;max-width:100%;max-height:620px;margin:auto;object-fit:contain;border:1px solid #d9e2e6;border-radius:12px}}figcaption{{font-size:.86rem;color:#58717d;margin-top:6px;word-break:break-all}}
</style></head><body><main>
<section class="hero"><div>KYDW 本科生科研入门体验项目</div><h1>实践项目参考答案 {public_no}：{title}</h1><p>{description}</p>
<p class="note">参考答案展示一种完整写法，代码中的路径和参数可以根据运行环境调整。打开公开 Kaggle Notebook 后，先复制到自己的账户，再运行并观察每一步输出。</p></section>
<section class="card"><h2>任务对应关系</h2><p>题目 Notebook 的任务顺序与下面的完整脚本一致：数据读取和核对、基线或输入可视化、模型结构、训练与验证、测试评价和结果文件。</p><p>先阅读各任务的输入与输出，再查看完整代码。结果图与指标文件来自同一份课程数据。</p></section>
<section class="card"><h2>完整参考脚本</h2><p>以下代码可以从头运行。它会自动查找 Kaggle 已挂载的数据集，并把图像与 JSON 写入 <code>/kaggle/working</code>。</p><pre><code>{escaped}</code></pre></section>
<section class="card"><h2>本次参考结果</h2><p>结果用于理解数据、模型和评价指标之间的关系。数值会随环境、随机状态和库版本产生小幅变化，阅读时同时查看图像、错误类型和结果边界。</p><div class="results">{image_html}</div></section>
<section class="card"><h2>结果文件</h2><p>完成参考版运行后，按下列文件核对输入、输出和指标。</p><ul>{''.join(f'<li><code>{name}</code></li>' for name in result_names)}</ul></section>
</main></body></html>\n'''


def write_answers() -> None:
    specs = {
        "03": ("脑膜瘤 H&E 形态代理分类", "使用固定的脑膜瘤 H&E 图块数据，先观察真实组织图块和坐标，再用不包含 proxy_score 的形态特征随机森林完成原图级评价和染色变化比较。", ["task3_sample_he_tile.png", "task3_real_he_overview.png", "task3_data_visualization.png", "task3_patch_stride_overview.png", "task3_training_curve.png", "task3_prediction_visualization.png", "task3_pytorch_result.json"], "run_project03", "meningioma_public_morphology_tiles.npz"),
        "04": ("XGBoost 脑疾病表格分类", "使用课程提供的 Data.csv，完成四分类表格预处理、逻辑回归基线、XGBoost、验证集比较、测试评价和变量贡献分析。", ["task4_data_summary.png", "task4_confusion.png", "task4_roc_pr.png", "task4_importance.png", "task4_result.json"], "run_project04", "Data.csv"),
        "05": ("空间转录组表达超分辨率", "使用同一组织区域的配对 H&E、16 μm LR 和 2 μm HR 数据，只预测高表达基因 Snap25；先阅读大图与中心小图，再用带正则化的 XGBoost Poisson 模型从 H&E 局部特征和 LR 观测建立表达份额，并检查 8×8 总量约束、验证指标和空间图。", ["task5_data_visualization.png", "task5_scale_overview.png", "task5_training_curve.png", "task5_prediction_visualization.png", "task5_result.json"], "run_project05", "kydw-try-a05-paired-patches.npz"),
    }
    for public_no, (title, description, results, function, data_name) in specs.items():
        (ANSWERS / f"体验实践项目解析{public_no}.html").write_text(
            answer_html(public_no, f"{int(public_no)+1:02d}", title, description, results, extract_function(function), data_name),
            encoding="utf-8",
        )


def sync_site() -> None:
    # Import only the transformer helpers; the full importer would remove locked
    # advanced directories from this working tree.
    import importlib.util

    importer_path = SITE / "tools" / "import_experience_materials.py"
    spec = importlib.util.spec_from_file_location("kydw_importer", importer_path)
    if spec is None or spec.loader is None:
        raise RuntimeError("无法加载网站材料导入工具")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    for public_no in ("03", "04", "05"):
        site_no = f"{int(public_no)+1:02d}"
        module.transform_experience_teaching(
            TEACHING / f"体验教学项目{public_no}.html",
            SITE / "experience" / "teaching" / f"project-{site_no}.html",
            public_no,
            site_no,
        )
        module.transform_experience_answer(
            ANSWERS / f"体验实践项目解析{public_no}.html",
            SITE / "experience" / "answers" / f"project-{site_no}.html",
            public_no,
            site_no,
        )
        shutil.copy2(PRACTICE / f"体验实践项目{public_no}.ipynb", SITE / "experience" / "practice" / f"project-{site_no}.ipynb")
        src = RESULTS / f"project-{public_no}"
        dst = SITE / "experience" / "assets" / "results" / f"project-{site_no}"
        if src.is_dir():
            shutil.copytree(src, dst, dirs_exist_ok=True)


def main() -> None:
    repair_notebook_03()
    repair_notebook_04()
    repair_notebook_05()
    rebuild_notebook_05_clean()
    patch_teaching()
    write_answers()
    sync_site()
    print("已修复并同步体验项目 03—05（仅本地）。")


if __name__ == "__main__":
    main()
