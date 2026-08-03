# KYDW 网站当前任务状态

更新日期：2026-08-03

## 目标

完成当前阶段的网站公开内容与三个已开放体验项目的同步，重点处理汤昊天简介、三份项目宣传文案、项目 02 生成结果、题目版/参考版 Notebook 一致性，并在本地验证后统一推送 GitHub。

## 当前目录

- 仓库：`D:\00_同步\BaiduSyncdisk\01_学术研究\展示\山大\Extra-Materials\kydw_try_site`
- 分支：`agent/project-preview-overview-20260803`
- Notion：本阶段不处理；GitHub Pages 是公开入口。

## 已完成或已确认

- 已对照 GitHub `origin/main=eccd521`：远端 Pages API 状态为 built，source 为 `main:/`，`cname=null`，仓库主页为 `https://lhy1007.github.io/KYDW_TRY/`；远端未包含本地工作区的完整修改。
- 本地 `HEAD=dbb00cf` 与远端分叉；本地提交中的项目预览、团队概况、按钮和布局调整尚未进入远端，工作区另有宣传文案、Notebook、结果资产和维护文档未提交。
- 汤昊天负责人简介已收敛为用户指定的一句话；三份宣传文案已存在于 `docs/promotions/`。
- 题目 Notebook 与参考 Notebook 的注释一致性脚本已存在：`tools/sync_kaggle_notebook_copies.py`。
- A00、A01、A02 的 Notebook 已补单元格 ID并通过 JSON、nbformat、AST 基础检查；A02 需要核验公开结果和模型口径。
- 本地源材料显示项目 02 是“胸部 X 射线与生成模型”，不是 CT；公开页面不得自行改成 CT。
- 项目 02 当前公开结果采用 ResidualConvVAE 50 轮，已有结果图片和指标；已将实践 Notebook 的潜空间输出文件名与现有结果资产统一，并补齐 `task2_latent_result.json`。
- 本地页面检查确认：项目详情材料卡只有“打开”；实践/答案页顶部按“返回项目详情 → 下载实践 Notebook → 在 Kaggle 中打开”；体验项目首页只有环境准备可直接进入，其余项目均为预览；Week 2 和进阶项目锁定；参考结果定位按钮可用；答案页无上下页按钮。

## 本轮并行任务

- 宣传文案：仅修改 `docs/promotions/` 三份文件。
- 汤昊天简介：仅修改 `content.js` 对应负责人条目。
- 项目 02 模型：保留已验证的 ResidualConvVAE 50 轮结果，不采用较差的候选版本。
- Kaggle：只读核对六个 Kernel 状态与日志。
- 页面：只读审查公开文案、材料卡和结果入口。
- 维护文档：仅补充 `SITE-MAINTENANCE.md`。

## 固定规则

- 体验版不要求提交报告；Week 2 和所有进阶项目继续锁定。
- 项目详情材料卡只保留“打开”；Kaggle 运行入口放在打开后的实践页面或宣传文案中。
- 题目版与参考版 Notebook 的 Markdown、代码注释必须一致；参考版只补齐可运行实现。
- 公开页面不得出现 AI 对话、内部版本对照、制作流程或防御性回避语言。
- 结果页面展示已保存的真实参考运行结果；实践者应在 Kaggle 复制到自己的账户后运行、修改和观察自己的输出。
- 项目 02 的用户可见名称和内容按源材料统一为胸部 X 射线；若未来要做 CT，必须先有对应 CT 数据与源材料。

## 下一步

1. 完成本地链接、页面、Notebook 题目版/参考版一致性和结果资产检查。
2. 提交全部属于本轮的本地修改；合并 `origin/main` 时保留本地 ResidualConvVAE 项目 02 教学页，避免云端旧 DCGAN 页面覆盖。
3. 推送 `main`，等待 Pages 部署后回读首页、项目材料页、答案页、团队动态页和 Pages 配置，确认主页不再进入 `is-a.dev`。
