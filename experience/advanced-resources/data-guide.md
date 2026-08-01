# Kaggle 数据与运行说明

## 通用操作

1. 新建 Kaggle Notebook；
2. 右侧选择 **Add Data**；
3. 公开数据可直接搜索数据集名称或 slug；体验项目产生的本地文件可创建私人 Dataset 后挂载；
4. 首次运行保持轻量参数，先确认文件、shape、患者/玻片/空间 ID 和划分；
5. 只有真实数据检测成功后才把结果写入设计报告。参考答案在没有真实数据时会使用 `demo` 回退，演示结果不能作为研究结论。

## 项目 01

- 推荐复用体验项目 01 的数据，Kaggle slug：`mateuszbuda/lgg-mri-segmentation`。
- 预期文件：MRI `.tif` 与同名 `_mask.tif`，患者文件夹作为 group。
- 数据页：https://www.kaggle.com/datasets/mateuszbuda/lgg-mri-segmentation

## 项目 02

- 推荐复用体验项目 02 的数据，Kaggle slug：`paultimothymooney/chest-xray-pneumonia`。
- 原始公开页：https://data.mendeley.com/datasets/rscbjbr9sj/2
- 文件名中的 `personN` 尽量作为患者 ID。目录标签是粗条件。

## 项目 03

- 使用体验项目 03 的 12 张完整脑膜瘤 H&E 原图。将文件夹创建为私人 Kaggle Dataset。
- 不要上传教学页面中的论文示意图、拼图或局部截图。
- 可选公开方法数据：CAMELYON16，但体积很大且不是脑膜瘤。

## 项目 04

- 官方 UCI 数据：https://archive.ics.uci.edu/dataset/174/parkinsons
- 下载 `parkinsons.data` 后上传为私人 Kaggle Dataset，或搜索相同公开镜像。
- 受试者 ID 为删除 `name` 最后录音编号后的字符串，例如 `phon_R01_S01_1 → phon_R01_S01`。

## 项目 05

- 使用体验项目 05 的 NPZ，字段为 `he/lr/hr/split`。
- 在体验 Notebook 中可用 `np.savez('advanced05_data.npz',he=he,lr=lr,hr=hr,split=split)` 保存。
- 10x 公共数据：https://www.10xgenomics.com/datasets 。普通 Visium 通常没有高分辨率全转录组真值，不能直接替代该监督任务。

## AI/Agent

允许使用 AI/Agent 检查目录、解释代码、修复报错、比较方法、检索论文和整理报告。需要保留主要提示词，并人工核对数据 ID、划分、公式、论文链接和结论。不得把 AI 生成的不存在论文或未运行代码写入报告。
