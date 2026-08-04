# KYDW 要求登记表

更新日期：2026-08-04

本文件是 KYDW 长期维护的要求总表，不属于网站正文。它把会话中的要求整理为当前有效口径、已被替代的旧口径、待确认事项和后续维护规则。后续维护时优先读取本文件，不需要重新通读全部历史会话。

## 一、后续 AI 的阅读顺序

1. 先读本文件，确认当前有效要求和待确认事项。
2. 再读本地状态文件 `_codex_state/current_task_state.md`（若存在），确认上次任务停在哪里。
3. 涉及页面、数据或同步时，再读 [`SITE-MAINTENANCE.md`](../SITE-MAINTENANCE.md)、[`DESIGN-LINKAGE.md`](DESIGN-LINKAGE.md) 和对应专题文档。
4. [`session-requirements-audit-2026-08-04.md`](session-requirements-audit-2026-08-04.md) 只作为本次历史要求的详细合并审查，不作为重复执行所有检查的理由。
5. 只有当前表、状态文件和专题文档无法解决冲突时，才回看原始会话。

新的明确用户要求优先于旧记录。发现冲突时，先在本表登记新要求和被替代的编号，再修改页面；不要只在代码中留下无法追溯的改动。

## 二、状态和记录规则

| 状态 | 含义 |
| --- | --- |
| `active` | 当前有效，后续修改必须遵守 |
| `pending` | 已提出但缺少用户确认、原始材料或外部结果 |
| `deferred` | 用户暂时不要求执行，除非再次明确提出 |
| `superseded` | 已被后来的要求替代，只保留历史关系 |
| `blocked` | 外部状态未完成，暂时不能作为公开入口或完成项 |
| `resolved` | 本次问题已处理并完成最小验证 |

每条新要求至少登记：编号、日期、类别、当前口径、影响范围、状态、来源文件和验证方式。修改完成后补充实际改动文件和证据，不使用“已处理”作为唯一结论。

## 三、当前有效要求

| 编号 | 类别 | 当前口径 | 主要影响范围 | 状态 | 权威记录 |
| --- | --- | --- | --- | --- | --- |
| REQ-001 | 公开入口 | 当前唯一公开主页为 `https://lhy1007.github.io/KYDW_TRY/`；`kydw.is-a.dev` 完成注册、DNS、Pages 绑定和线上回读前不得作为公开入口。 | GitHub Pages、仓库 Homepage、README、宣传入口 | `active` | [`SITE-MAINTENANCE.md`](../SITE-MAINTENANCE.md) 主页地址规则 |
| REQ-002 | 数据源 | 团队、成果、动态、负责人、去向、活动、课程、资源和项目状态优先维护 `content.js`；页面模板只负责组合和渲染。 | `content.js`、`site.js`、首页及子页面 | `active` | [`SITE-MAINTENANCE.md`](../SITE-MAINTENANCE.md) 内容来源与修改顺序 |
| REQ-003 | 页面职责 | 顶部导航固定为“主页、团队介绍、项目与活动、资源中心”；专业解读属于资源中心，课程和培训属于项目与活动。 | 顶部导航、合集页、详情页 | `active` | [`site-architecture.md`](site-architecture.md) |
| REQ-004 | 团队信息 | 成员高校按“直博、国内学硕/海外研究型硕士、在校本科生成员高校”分组；负责人信息从首页跳转到负责人子页面；首页和详情页使用同一数据源。 | `team` 数据、首页、团队页、去向页、负责人页 | `active` | [`SITE-MAINTENANCE.md`](../SITE-MAINTENANCE.md) 内容联动表 |
| REQ-005 | 团队近期动态 | 动态按日期倒序完整保存于 `team.news`；首页作为浏览区，团队近期动态子页面显示同一套内容；成员姓名、论文题目、期刊和会议按已确认口径呈现。 | 首页、`team/news.html`、成果页、宣传文案 | `active` | `content.js`、[`SITE-MAINTENANCE.md`](../SITE-MAINTENANCE.md) 首页推送与排序 |
| REQ-006 | 项目入口 | 项目与活动中先进入项目主页详情；材料页和项目页不得绕过详情页提供额外实践/答案快捷块。环境准备可作为必看入口，其他项目使用“项目预览”。 | `programs`、`experience`、材料卡、快捷入口 | `active` | [`site-architecture.md`](site-architecture.md) 项目层级 |
| REQ-007 | 开放状态 | Week 1 当前开放；Week 2—5 和所有进阶项目保持锁定。锁定材料不进入公开资源中心，也不生成可点击入口。 | 周页、项目页、资源中心、材料目录 | `active` | `content.js`、[`docs/experience-materials.md`](experience-materials.md) |
| REQ-008 | 体验版与进阶版 | 体验版用于理解和完成实践，不要求提交报告；进阶版需要方法设计、方法选择说明和报告，但未开放前只保留本地内部归档。 | 体验项目说明、项目材料、进阶材料 | `active` | [`docs/experience-materials.md`](experience-materials.md) |
| REQ-009 | 材料卡按钮 | 项目详情中的教学项目、实践项目和实践项目参考答案卡只保留一个“打开”按钮。下载、Kaggle 运行和参考答案核对入口放在打开后的对应页面。 | `site.js`、项目详情页、实践页、答案页 | `active` | [`SITE-MAINTENANCE.md`](../SITE-MAINTENANCE.md) 项目与体验材料规则 |
| REQ-010 | Kaggle 入口 | Kaggle 是实践首选：打开公开 Notebook，复制到自己的账户后修改和运行；下载到电脑是补充方式。题目版保留待完成位置，参考版补全同一位置。 | 实践 Notebook、Kaggle 副本、实践页 | `active` | [`docs/experience-materials.md`](experience-materials.md) |
| REQ-011 | 参考答案 | 统一名称为“实践项目参考答案”；使用真正的代码块，删除无效上一页/下一页按钮；参考代码和结果完整展示，并说明答案不是唯一写法。 | `experience/answers`、答案 Notebook、材料阅读器 | `active` | `site.js`、[`SITE-MAINTENANCE.md`](../SITE-MAINTENANCE.md) |
| REQ-012 | 结果展示 | 网页结果区放真实保存的输入、输出、图像和指标；“模拟运行的注意事项”只说明网页阅读方式，不用它替代实际结果。项目 00—02 的数据模态和结果口径以当前维护文档为准。 | 教学页、实践页、答案页、Notebook、Kaggle | `active` | [`SITE-MAINTENANCE.md`](../SITE-MAINTENANCE.md) 实践材料规则 |
| REQ-013 | 教学语言 | 面向学生使用自然、朴素的陈述；删除“闭环”“回到”“最小训练闭环”等模板化或作者内部编排表达，不出现 AI 对话泄露、制作过程和防御性回避语句。 | 所有公开 HTML、Markdown、Notebook Markdown | `active` | 根目录 `AGENTS.md`、[`site-architecture.md`](site-architecture.md) |
| REQ-014 | 环境准备 | 科研基础环境准备保留章节编号、图片和原意；当前兑换码为“飞天螳螂”，并明确每月更新。GitHub 保留 HTML，Notion 使用原生块。 | `resources/environment.html`、图片、PDF、Notion 原生页 | `active` | [`docs/environment-materials.md`](environment-materials.md) |
| REQ-015 | 宣传文案 | 公众号、普通群聊和项目专属群公告分开维护；日期、开放状态、入口和联系方式改变时一起检查。 | `docs/promotions/` | `active` | [`SITE-MAINTENANCE.md`](../SITE-MAINTENANCE.md) 宣传文案规则 |
| REQ-016 | Notion/飞书 | 当前优先完成 GitHub，Notion 和飞书不作为本轮默认验收项；再次明确同步时，按 GitHub 内容核对并处理公开权限和原生内容。 | Notion、飞书、同步记录 | `deferred` | 本表历史合并记录、[`SITE-MAINTENANCE.md`](../SITE-MAINTENANCE.md) |
| REQ-017 | 本地浏览器 | Tabbit 的旧自定义域名跳转属于本机缓存问题，不修改网站代码；已清理缓存并验证 GitHub Pages 地址正常。 | Tabbit 本地配置、状态文件 | `resolved` | 本地 `_codex_state/current_task_state.md` |
| REQ-018 | 长会话维护 | 长任务先读取本表和状态文件；新要求先分类、判断是否替代旧要求、登记影响范围，再实施和按影响范围验证。不得因为历史会话很长而默认重做全站检查。 | 所有后续 KYDW 维护任务 | `active` | 本文件、项目 `AGENTS.md` |
| REQ-019 | 快速处理 | 简单文字、按钮和局部样式只做直接文件定位、最小补丁、目标检查和必要语法检查；只有涉及部署、云端同步、Notebook 运行或用户明确要求时才做外部核验。 | 执行流程、验证流程、推送流程 | `active` | `Extra-Materials/AGENTS.md` |
| REQ-020 | 设计联动 | 页面、合集、区块和教学材料按单一数据源与明确职责维护；新需求先判断新增、替代或局部修正，再更新设计联动文档、要求登记表和受影响数据/页面。 | 页面架构、`content.js`、`site.js`、教学材料、维护文档 | `active` | [`DESIGN-LINKAGE.md`](DESIGN-LINKAGE.md)、[`SITE-MAINTENANCE.md`](../SITE-MAINTENANCE.md) |

## 四、已被后文替代的历史要求

| 旧要求或旧做法 | 当前口径 | 处理关系 |
| --- | --- | --- |
| 用 `kydw.is-a.dev` 作为网站正式入口 | 使用 GitHub Pages；域名完成注册和绑定后再切换 | 被 REQ-001 替代 |
| 首页直接给 Week 或项目材料快捷链接 | 先进入项目主页详情；首页入口改为项目预览，环境准备保留必看入口 | 被 REQ-006 替代 |
| 项目详情页增加“实践项目与参考答案”跳转块 | 详情页材料卡只保留“打开”，入口分别放在对应材料页 | 被 REQ-009 替代 |
| Kaggle 题目版直接提供完整可运行结果 | 题目版保留待完成位置，完整版本归入参考答案 | 被 REQ-010 替代 |
| 用“模拟运行输出”文字代替结果 | 网页展示真实保存结果，模拟运行说明只放在指定注意事项中 | 被 REQ-012 替代 |
| 把当前上传数量写成“只有六个方向/项目” | 使用可扩展合集，不把当前数量写成全集 | 被 `site-architecture.md` 扩展规则替代 |
| 公开文案强调训练轮次、实运行或制作过程 | 面向学生只说明任务、方法和结果；内部参数留在代码或维护记录 | 被 REQ-013 替代 |
| 同时把 GitHub、Notion、飞书作为每次修改的必做项 | 当前优先 GitHub，其他平台只有明确要求时同步 | 被 REQ-016 替代 |
| 每次局部修改都执行全站、全平台和完整浏览器回归 | 按影响范围采用最小验证；复杂任务才使用完整流程 | 被 REQ-018、REQ-019 替代 |

## 五、当前待处理或待确认事项

| 事项 | 当前状态 | 处理条件 | 记录位置 |
| --- | --- | --- | --- |
| Kaggle 远端题目版/参考版逐字回读 | `pending` | 获得远端可读正文后，比对标题、任务、注释、占位和结果 | `SITE-MAINTENANCE.md` Kaggle 记录 |
| 东北大学生物医学工程（中外合办）历年去向明细 | `pending` | 获得原始图片、学院、专业和人数后补充年度左右分块 | `professional/destinations.html`、会话审查文档 |
| `kydw.is-a.dev` 注册与绑定 | `blocked` | is-a.dev 审核通过、DNS/Pages 配置完成、线上回读无跳转 | `SITE-MAINTENANCE.md` 主页地址规则 |
| Notion/飞书完整同步 | `deferred` | 用户再次明确要求同步时，按 GitHub 当前版本执行 | `SITE-MAINTENANCE.md` 第八节 |
| 论文总数与分类统计口径 | `pending` | 用户确认是否允许同一论文跨类别统计 | `session-requirements-audit-2026-08-04.md` |

未完成事项不得写成已完成；“本地生成”“已提交”“远端已上传”“公开可读”“内容已核对”分别记录，不能互相替代。

## 六、按影响范围选择验证

| 改动类型 | 必做检查 | 默认不做的检查 |
| --- | --- | --- |
| 一句话、标题、按钮文字 | `rg` 定位、最小补丁、目标内容回读、`git diff --check` | 全站浏览器、Notion、Kaggle、全量 Pages 回归 |
| `content.js` 数据 | `node --check content.js`；回读首页、所属合集和直接详情页 | 不受影响的 Notebook 和外部平台 |
| `site.js` 或 `styles.css` 交互/布局 | 语法检查；目标桌面/窄屏页面一次浏览器检查 | 不相关页面的全量视觉检查 |
| 教学 HTML/Markdown | HTML 引用、编号、目标图片和文字检查；必要时检查对应材料页 | 不改动的首页和外部平台 |
| Notebook、结果图或 Kaggle | Notebook JSON/语法、对应实践页和答案页；用户要求或远端受影响时再做 Kaggle 回读 | 仅改文案时重新运行 Notebook |
| Notion/飞书同步 | 只核对被同步页面的正文、权限和附件 | 用户未要求时不自动同步 |
| 域名、Pages 或浏览器问题 | 对应 DNS/HTTP/浏览器实际回读 | 不因浏览器问题重做站点内容审查 |

## 七、后续要求登记流程

### 7.1 接收新要求

先给新要求分配编号和类别：内容、交互/布局、实践材料、同步、部署/域名、维护流程。若它只是已有要求的改写，更新原编号并记录替代关系，不重复创建一条相同要求。

### 7.2 判断影响范围

用 `SITE-MAINTENANCE.md` 的内容联动表查找依赖页面。只把真正受影响的文件列入本次任务；没有受影响的平台不加入验收清单。

### 7.3 实施和验证

先改唯一来源，再检查直接依赖页面。验证结果写入本表的变更记录和状态文件；涉及 GitHub 时区分本地改动、已提交、已推送和 Pages 已回读。

### 7.4 关闭任务

任务完成后更新：要求状态、实际文件、验证命令、外部证据和剩余风险。若被用户打断，保留状态文件，不把中断视为任务结束。

## 八、变更记录模板

以后每次有新要求或口径变化，在下面追加一行：

| 日期 | 要求编号 | 变化摘要 | 替代编号 | 实际文件/平台 | 验证证据 | 状态 |
| --- | --- | --- | --- | --- | --- | --- |
| 2026-08-04 | REQ-017/018/019 | 建立要求登记表；定位 Tabbit 旧跳转缓存；启用长会话快速处理规则 | 旧的重复全量检查流程 | 本表、项目 AGENTS、Tabbit 本地缓存 | Tabbit 实际打开 GitHub Pages 后最终 URL 正确；本地文档已回读 | `resolved` |
| 2026-08-04 | REQ-020 | 新建设计与联动文档，记录页面/合集/区块职责、单一数据源、材料关系、扩展方式和按影响范围验证规则；补充首页联系人标题上下文规则 | 无 | `docs/DESIGN-LINKAGE.md`、`SITE-MAINTENANCE.md`、`README.md`、`content.js`、`site.js`、项目 AGENTS | 定向语法检查、内容回读、首页与体验项目页联系人标题检查 | `resolved` |
