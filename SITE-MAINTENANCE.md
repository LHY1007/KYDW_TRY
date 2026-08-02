# KYDW 网站维护手册

更新日期：2026-08-02

本文件是 GitHub Pages 与 Notion 的统一维护入口，不作为网站正文展示。修改网站前先阅读本文件，再查对应的专题维护文档。

## 一、维护目标

网站首先说明 KYDW 是什么，再分别承载团队介绍、项目与活动、资源中心。任何新增内容都必须进入明确的合集或项目，不在首页孤立增加专题。

固定导航为：

1. 主页
2. 团队介绍
3. 项目与活动
4. 资源中心

专业、行业和细分研究方向归入资源中心的“专业解读”；教学、实践和答案归入项目详情与教学文档库；课程、培训和专题交流归入“项目与活动”。

## 二、内容来源与修改顺序

| 内容层 | 文件或平台 | 职责 |
| --- | --- | --- |
| 结构化事实 | `content.js` | 团队、成果、动态、负责人、成员去向、活动、课程、资源合集、周次、项目状态和材料入口 |
| 页面组合 | `site.js` | 导航、页面模板、排序、锁定、返回关系和首页摘要 |
| 统一样式 | `styles.css` | 数据驱动页面的桌面端与移动端布局 |
| 页面壳 | 带 `data-page` 的 HTML | 声明页面身份，不重复保存正文 |
| 独立教学正文 | 教学、解析、报告和环境准备 HTML | 保存真实正文与交互；必须有返回入口 |
| 项目母版 | 对应 Markdown 与来源 HTML/Notebook | 报告、通用资料和导入材料的上游文件 |
| Notion | 本文件第八节列出的页面 | 面向 Notion 读者的完整阅读副本，不是只有跳转链接的目录 |

默认修改顺序：

1. 修改唯一事实来源。
2. 检查首页摘要、上级合集和详情页。
3. 同步 Notion 对应页面与重复阅读页。
4. 运行语法、链接、桌面端和移动端检查。
5. 提交 GitHub，等待 Pages 部署后回读线上页面。

当前公开状态：Week 1 已开放；Week 2—5 均由数据层和渲染层锁定。体验项目 00—02 可进入体验版材料，项目 03—05 随 Week 2 一并锁定。项目 01—05 的进阶教学、进阶实践、实践项目参考答案、设计报告模板、参考设计报告和随附说明文件当前均不进入公开仓库；相关源文件保存在仓库外的本地内部归档，只有用户明确开放后才恢复发布。

体验项目实践入口：当前项目 00—05 分别对应 Kaggle Notebook 标题 `KYDW_TRY_A00`—`KYDW_TRY_A05`；后续项目继续按同一编号和入口规则追加，不改变上层目录。项目详情中的实践卡只保留入口，实践说明统一放在体验版/进阶版材料块下方的全宽“实践项目与参考答案”说明块；Kaggle 入口把“复制并编辑到自己的账户后运行和修改”作为首选方式，下载到电脑运行是补充。网页材料页顶部只保留一次“模拟运行的注意事项”，页面展示对应实践项目参考答案中已经保存的真实运行结果，不得用概括性文字冒充运行结果。当前 00—02 已接入 Kaggle 实际运行的图像和 JSON 结果，新增项目完成真实运行后再按同一映射接入。每个实践项目都要提醒学生：看不懂时可以向 AI 询问并逐步尝试，完成后使用“实践项目参考答案”核对。

## 三、首页推送与排序

### 3.1 团队近期动态

- 完整动态保存在 `team.news`，按日期从新到旧排列。
- 首页只显示前 `team.homeNewsLimit` 条；新增动态放到数组首位后，最旧一条自动退出首页，但仍保留在完整成果页。
- Notion 主页保留相同数量的最新动态；Notion“代表性成果”页保留完整动态。
- 动态改变累计数量时，同时检查 `team.achievementMetrics`。
- 动态构成长期代表性成果时，同时检查 `team.achievements`。
- 首页动态位只放团队近期动态，不混入课程通知、项目简介或维护说明。

### 3.2 项目与课程

- 本科生科研入门体验项目始终作为当前项目单独展示。
- 其他活动由 `modules.order` 决定顺序；持续活动与当前课程在历史课程之前。
- 同类课程按开展时间从近到远排列；课程内部按 `lessons` 的教学顺序从前到后排列。
- 新课程加入课程区域，不插入团队成果或专业解读区域。
- 项目卡片的快捷入口由真实课程、周次或章节数据生成，不再维护第二份手写链接。

### 3.3 资源

- 首页只展示合集，不把合集内的单篇文章并列成顶层模块。
- 新专业、行业或细分方向进入“专业解读”。
- 新项目说明进入“项目与活动资料”。
- 新教学、实践、答案和报告进入“教学文档库”及其所属项目详情。

### 3.4 首页团队概况布局

- 桌面端采用两列组合：左侧为团队说明和成员高校，右侧为代表性成果和负责人。
- 首页动态和负责人列表在块内滚动，成员高校与负责人卡可伸展补齐少量高差，使两列总高度接近且不靠大块空白对齐。
- 成员高校使用横向学校标签并允许自然换行；已毕业成员继续按直博、国内学硕/海外研究型硕士分组。
- 窄屏改为单列，不保留桌面端左右关系。

## 四、GitHub 页面清单：数据驱动页面

以下页面由 `content.js` 与 `site.js` 生成正文；新增页面应补入本手册，不把当前页面数量写进公开文案。

### 4.1 主页与团队

| 页面 | 页面职责 | 主要数据 | 修改时联动 |
| --- | --- | --- | --- |
| `index.html` | 建立 KYDW 身份；展示团队概况、负责人、成果、近期动态、当前项目、其他活动和资源合集 | `team`、`experience`、`modules`、`resourceCollections` | Notion 主页、团队页、项目与资源合集 |
| `team/index.html` | 完整团队介绍、成员高校、工作方式、成果摘要、去向、活动和负责人入口 | `team.*` | 首页和四个团队子页 |
| `team/achievements.html` | 先展示完整团队近期动态，再展示论文、项目和竞赛分类 | `team.news`、`team.achievements` | 首页成果卡、Notion 团队介绍和代表性成果页 |
| `team/destinations.html` | 按直博、国内学硕/海外研究型硕士展示已毕业成员去向，并列在校本科生高校 | `destinationRecords`、`destinationUniversityOrder`、`undergraduateNetwork` | 首页成员高校、团队介绍、Notion 团队概况和去向页 |
| `team/activities.html` | 汇总团队活动体系并进入各活动详情 | `modules`、`team.activities` | 项目与活动总页、Notion 项目与活动 |
| `team/people.html` | 展开显示五名负责人的详细介绍；首页负责人链接应打开对应条目 | `team.leaders` | 首页、团队介绍、Notion 负责人页 |

### 4.2 项目与活动

| 页面 | 页面职责 | 主要数据 | 修改时联动 |
| --- | --- | --- | --- |
| `programs/index.html` | 本科生科研入门体验项目置前，随后展示培训、课程和专题交流 | `experience`、`modules` | 首页项目区、Notion 项目与活动 |
| `programs/training.html` | KYDW科研入门培训总览、已开放章节、锁定章节和培训路径 | `modules[id=training]`、`training` | 培训章节页、Notion 培训页 |
| `programs/sdu.html` | 山东大学本科生暑期名校课程-神经影像学与人工智能总览及实践目录 | `modules[id=sdu]` | 已整理实践页、Kaggle、Notion 山大课程；新增课程材料沿用同一目录 |
| `programs/fudan.html` | 复旦大学秋季学期本科生践悟课程总览及七节课程目录 | `modules[id=fudan]` | 首页快捷入口、Notion 复旦课程 |
| `programs/workshop.html` | 生物医学人工智能专题交流介绍 | `modules[id=workshop]` | 首页、活动目录、Notion 专题交流 |

山东大学当前已整理的实践页：

| 页面 | 描述 |
| --- | --- |
| `programs/sdu-lesson-00.html` | 基础编程与人工智能实践说明及对应 Kaggle 入口 |
| `programs/sdu-lesson-01.html` | MRI 肿瘤图像分割实践说明及对应 Kaggle 入口 |
| `programs/sdu-lesson-02.html` | 胸部 X 射线与生成模型实践说明及对应 Kaggle 入口 |
| `programs/sdu-lesson-03.html` | 计算病理与脑膜瘤形态分析实践说明及对应 Kaggle 入口 |
| `programs/sdu-lesson-04.html` | 脑疾病表格数据与 XGBoost 预测实践说明及对应 Kaggle 入口 |
| `programs/sdu-lesson-05.html` | 空间转录组与表达超分辨率实践说明及对应 Kaggle 入口 |

科研入门培训页面：

| 页面 | 描述 | 状态来源 |
| --- | --- | --- |
| `programs/training/preface.html` | 序言与学习路径 | `training.chapters[preface]` |
| `programs/training/foundation.html` | 电脑、文献、数据和科研表达基础 | `training.chapters[foundation]` |
| `programs/training/ai-basics.html` | Python、人工智能、回归、分类和医学数据任务 | `training.chapters[ai-basics]` |
| `programs/training/challenges.html` | 医学人工智能挑战赛、任务拆解和学术报告 | `training.chapters[challenges]` |
| `programs/training/research-basics.html` | 深度学习、信号、图像生成和 PyTorch 实践 | `training.chapters[research-basics]` |
| `programs/training/advanced-research.html` | 进阶科研章节；数据层锁定时只显示未开放页 | `training.chapters[advanced-research]` |
| `programs/training/frontiers.html` | 学科前沿章节；数据层锁定时只显示未开放页 | `training.chapters[frontiers]` |
| `programs/training/practice.html` | 综合实践章节；数据层锁定时只显示未开放页 | `training.chapters[practice]` |
| `programs/training/tools.html` | 科研工具与技能章节；数据层锁定时只显示未开放页 | `training.chapters[tools]` |
| `programs/training/cooperation.html` | KYDW 合作项目附录；数据层锁定时只显示未开放页 | `training.chapters[cooperation]` |
| `programs/training/practice-projects.html` | 实战项目附录；数据层锁定时只显示未开放页 | `training.chapters[practice-projects]` |
| `programs/training/path.html` | 基础学习、项目考核、实践进阶和合作交流路径 | `training.plan` |

### 4.3 本科生科研入门体验项目

| 页面 | 描述 |
| --- | --- |
| `experience/index.html` | 说明项目来源、开放时间、体验版与进阶版区别、项目构成、环境准备、项目目录和底部答疑/反馈渠道 |
| `experience/week-01.html` | 展示项目 00—02；开放状态来自 Week 1 |
| `experience/week-02.html` | Week 2 未开放时只显示锁定状态，不展示项目入口；开放后展示项目 03—05 |
| `experience/week-03.html` | 预留 Week 3 路由；未开放时不展示项目入口 |
| `experience/week-04.html` | 预留 Week 4 路由；未开放时不展示项目入口 |
| `experience/week-05.html` | 预留 Week 5 路由；未开放时不展示项目入口 |

项目详情页：

| 页面 | 公开编号与主题 | 页面职责 |
| --- | --- | --- |
| `experience/project-01.html` | 00 基础编程与人工智能 | 单层项目：教学、实践、实践项目参考答案 |
| `experience/project-02.html` | 01 MRI 肿瘤图像分割 | 体验版材料可用；进阶版区域统一锁定 |
| `experience/project-03.html` | 02 胸部 X 射线与生成模型 | 体验版材料可用；进阶版区域统一锁定 |
| `experience/project-04.html` | 03 计算病理与脑膜瘤形态分析 | Week 2 未开放时整页锁定 |
| `experience/project-05.html` | 04 脑疾病表格数据与 XGBoost 预测 | Week 2 未开放时整页锁定 |
| `experience/project-06.html` | 05 空间转录组与表达超分辨率 | Week 2 未开放时整页锁定 |
| `experience/project-07.html` | 06 基于空间转录组学的细胞通讯 | 预留路由；登记真实教学材料并开放所属周后才进入目录 |
| `experience/project-08.html` | 07 基于传感器的人类活动识别 | 预留路由；登记真实教学材料并开放所属周后才进入目录 |
| `experience/project-09.html` | 08 组织学图像虚拟染色 | 预留路由；登记真实教学材料并开放所属周后才进入目录 |
| `experience/project-10.html` | 09 人体生理信号分析 | 预留路由；登记真实教学材料并开放所属周后才进入目录 |
| `experience/project-11.html` | 10 后续方向 | 仅预留稳定路由，不得用占位内容进入公开目录 |
| `experience/project-12.html` | 11 后续方向 | 仅预留稳定路由，不得用占位内容进入公开目录 |
| `experience/project-13.html` | 12 后续方向 | 仅预留稳定路由，不得用占位内容进入公开目录 |
| `experience/project-14.html` | 13 后续方向 | 仅预留稳定路由，不得用占位内容进入公开目录 |
| `experience/project-15.html` | 14 后续方向 | 仅预留稳定路由，不得用占位内容进入公开目录 |

### 4.4 资源中心与专业解读

| 页面 | 页面职责 | 主要数据 |
| --- | --- | --- |
| `resources/index.html` | 展示专业解读、项目与活动资料、教学文档库三个合集 | `resourceCollections` 与已开放 `projects` |
| `professional/index.html` | 生物医学工程专业介绍正文 | `professional.intro`、`professional.sections` |
| `professional/faq.html` | 分为“专业本身”和“升学与职业”的独立答疑页 | `professional.faq` |
| `professional/destinations.html` | 东北大学生物医学工程（中外合办）按年度展示保研与申研去向；有逐项数据时以表格呈现 | `professional.destinationOverview` |

## 五、GitHub 页面清单：独立内容页面

以下页面保存独立正文或交互，不能只改 `content.js` 代替正文修改。

### 5.1 环境、体验教学与解析

| 页面 | 描述 | 返回关系 |
| --- | --- | --- |
| `resources/environment.html` | 科研基础环境准备；包含编号章节、网络访问、账户注册、Kaggle 和图片 | 返回体验项目或资源中心 |
| `assets/contact/` | 项目公告群、本项目群、微信公众号和负责人微信二维码；由体验项目页与 Notion 项目页共同引用 | `experience.contact.channels`、Notion 体验项目页 |
| `experience/teaching/index.html` | 体验教学辅助目录；不是主导航唯一入口 | 返回体验项目 |
| `experience/teaching/project-01.html` | 项目 00 体验教学正文 | 返回项目 00 |
| `experience/teaching/project-02.html` | 项目 01 体验教学正文 | 返回项目 01 |
| `experience/teaching/project-03.html` | 项目 02 体验教学正文 | 返回项目 02 |
| `experience/teaching/project-04.html` | 项目 03 体验教学正文 | 返回项目 03 |
| `experience/teaching/project-05.html` | 项目 04 体验教学正文 | 返回项目 04 |
| `experience/teaching/project-06.html` | 项目 05 体验教学正文 | 返回项目 05 |
| `experience/answers/project-01.html` | 项目 00 实践项目参考答案 | 返回项目 00 |
| `experience/answers/project-02.html` | 项目 01 实践项目参考答案 | 返回项目 01 |
| `experience/answers/project-03.html` | 项目 02 实践项目参考答案 | 返回项目 02 |
| `experience/answers/project-04.html` | 项目 03 实践项目参考答案 | 返回项目 03 |
| `experience/answers/project-05.html` | 项目 04 实践项目参考答案 | 返回项目 04 |
| `experience/answers/project-06.html` | 项目 05 实践项目参考答案 | 返回项目 05 |

### 5.4 宣传文案

| 文件 | 使用场景 | 内容要求 |
| --- | --- | --- |
| `docs/promotions/公众号公告.md` | 公众号正式发布 | 说明项目定位、开放时间、项目结构、体验版与进阶版区别、参加方式和联系渠道；随项目目录扩展更新主题列表，不写固定总数量。 |
| `docs/promotions/普通群聊宣传.md` | 普通群聊预告或转发 | 保留项目变动原因、开放时间、体验重点和站内入口，篇幅短，适合直接发送。 |
| `docs/promotions/项目专属群公告.md` | 已进群同学的首次说明 | 先列环境准备，再列国内/国外入口、HTML 页面、Kaggle 与网络配置位置；本月 Kaggle 兑换码为“飞天螳螂”，兑换码每月更新。 |

### 5.2 进阶页面与材料（当前不进入公开仓库）

| 页面 | 描述 |
| --- | --- |
| `D:\00_同步\BaiduSyncdisk\01_学术研究\学生\KYDW\网站内容\进阶项目` | 项目 01—05 进阶教学源文件；当前不在 GitHub Pages 和公开导航中 |

进阶教学、进阶实践、进阶项目参考答案和报告材料当前均不进入公开仓库，也不生成学生可点击入口；`site.js` 中 `isAdvancedOpen()` 固定返回关闭状态。重新开放时必须先从本地内部归档恢复源文件，再同时检查项目详情、教学文档库、Notion 项目页和独立材料页。进阶教学原始材料缺失配图清单仅作维护记录，不能作为学生资料发布。

### 5.3 设计报告与进阶说明文件（本地内部归档）

| 归档目录 | 描述 | 母版 |
| --- | --- | --- |
| `D:\00_同步\BaiduSyncdisk\01_学术研究\学生\KYDW\网站内容\进阶项目\实践文档\设计报告模板` | 项目 01—05 设计报告模板 | 同目录 `.md` |
| `D:\00_同步\BaiduSyncdisk\01_学术研究\学生\KYDW\网站内容\进阶项目\参考答案` | 项目 01—05 参考设计报告 | 同目录 `.md` |
| `D:\00_同步\BaiduSyncdisk\01_学术研究\学生\KYDW\网站内容\进阶项目` | 进阶项目说明、数据与运行说明、资料与文献索引；仅供内部维护 | 原始 Markdown |

用户明确开放后，先改 Markdown，再使用 `tools/import_experience_materials.py` 生成 HTML；当前不得把这些内部说明文件当作学生资料发布。

## 六、新增文档与版式

| 新内容 | 放置位置 | 排序与页面结构 |
| --- | --- | --- |
| 团队近期动态 | `team.news`、Notion 主页和成果页 | 最新在前；首页自动截取前若干条，完整成果页保留全部 |
| 代表性论文、项目、竞赛 | `team.achievements` 与指标 | 先按论文、国家级项目、学科竞赛分类，再按时间更新详情 |
| 新活动 | `programs/<slug>.html` + `modules` | 当前或持续活动在前，历史活动后置 |
| 新课程 | 对应 `programs/` 页面和 `modules.lessons` | 课程按时间从近到远；课次按教学顺序从前到后 |
| 新培训章节 | `programs/training/<chapter>.html` + `training.chapters` | 按学习顺序追加；未完成时设置 `locked: true` |
| 新体验项目 | 教学、实践、答案三份材料 + 项目页 | 先登记所属 Week 和公开编号，再进入目录 |
| 新进阶项目 | 先存仓库外内部归档；开放后再恢复进阶教学、实践、实践项目参考答案、报告模板和参考报告 | 与同编号体验项目相邻，不单独成为顶层活动 |
| 新专业或行业解读 | `professional/` 下独立页面 | 先进入“专业解读”合集，再决定是否在资源中心预览 |
| 新专业答疑 | 对应专题独立答疑页 | 问题按主题分栏或分组，不与介绍正文混成一页 |
| 通用教学文档 | `resources/` 或专题资料目录 | 先写完整文档，再加入教学文档库；不要创建只有链接的空页面 |
| 宣传文案 | `docs/promotions/` | 公众号、普通群聊和项目群分别维护；项目开放状态和站内入口改变时同步检查三份文案 |

版式统一规则：

- 合集页展示同一层级的页面卡片。
- 项目详情只展示教学项目、实践项目、实践项目参考答案及必要的报告入口；进阶内容未开放时只显示锁定状态。
- 长文章使用连续正文、明确章节和必要图片，不用模板化信息小块凑版面。
- 数据驱动页保留统一页眉、页脚和返回层级；独立教学页至少提供“返回项目详情”。
- 未开放内容用统一锁定状态，不提供可点击的空入口。
- 标题和栏目使用中文；专业术语、论文名、会议名和代码环境可保留必要英文。

## 七、内容联动表

| 修改对象 | 唯一来源 | 必须检查的 GitHub 页面 | 必须检查的 Notion 页面 |
| --- | --- | --- | --- |
| 团队定位与人数 | `team.lead`、`paragraphs`、`facts` | 首页、团队介绍、页脚 | 主页、团队介绍、团队概况 |
| 负责人 | `team.leaders` | 首页、团队介绍、负责人页 | 团队介绍、负责人 |
| 近期动态 | `team.news` | 首页、完整成果页 | 主页、团队介绍、代表性成果 |
| 成果数量与分类 | `achievementMetrics`、`achievements` | 首页、团队介绍、成果页 | 团队介绍、代表性成果 |
| 成员去向 | `destinationRecords`、排序数组 | 首页、团队介绍、去向页 | 团队介绍、团队概况、去向页 |
| 活动名称、受众、日期 | `modules` | 首页、项目总览、活动页、资源中心 | 主页、项目与活动、项目资料、活动详情 |
| 培训章节 | `training` | 培训总览与章节页 | KYDW科研入门培训 |
| 项目开放状态 | `experience.weeks`、`projects` | 首页快捷入口、项目总览、周页、项目页、教学文档库 | 主页、项目与活动、体验项目、项目资料、教学文档库及项目副本 |
| 项目标题与材料 | `projects` + 实际文件 | 周页、项目页、教学文档库、返回按钮 | 体验项目主树与教学文档库重复阅读页 |
| 专业解读 | `professional` | 资源中心、专业介绍、专业答疑 | 资源中心、专业解读合集及两个专题页 |
| 环境准备 | `resources/environment.html` 与 Notion 原生页 | 首页项目区、体验目录、教学文档库 | 体验项目、教学文档库、科研基础环境准备 |
| 宣传文案 | `docs/promotions/*.md` | 无网站正文渲染；链接、日期、开放状态改变时检查三份文案 | Notion 项目页、群公告和公众号发布稿 |

## 八、Notion 页面清单与 GitHub 对应

Notion 根页：`3af9e718-eb68-80cd-8039-c2f794e20a65`。

### 8.1 主页与团队

| Notion 页面 | 页面 ID | 对应 GitHub |
| --- | --- | --- |
| 科研大王KYDW | `3af9e718-eb68-80cd-8039-c2f794e20a65` | `index.html` |
| 团队介绍 | `3af9e718-eb68-8116-b844-de9818562d6b` | `team/index.html` |
| 团队概况 | `3af9e718-eb68-81b7-8ef9-f88f39e89850` | 首页团队概况、`team/index.html` |
| 代表性成果（成员一作/项目负责人） | `3af9e718-eb68-8162-84c5-ef6a0a3093db` | `team/achievements.html` |
| 已毕业成员去向 | `3af9e718-eb68-8100-9309-cc22af836da1` | `team/destinations.html` |
| 负责人 | `3af9e718-eb68-81e3-b4ce-c11653ed48b7` | `team/people.html` |

### 8.2 项目与活动

| Notion 页面 | 页面 ID | 对应 GitHub |
| --- | --- | --- |
| 项目与活动 | `3af9e718-eb68-8173-b088-d031f2cae02f` | `programs/index.html` |
| 本科生科研入门体验项目 | `3af9e718-eb68-81a9-8e5e-f1da670ce3c0` | `experience/index.html` |
| 基础编程与人工智能 | `3af9e718-eb68-8114-b09b-cfe3daa3fbbe` | `experience/project-01.html` |
| MRI 肿瘤图像分割 | `3af9e718-eb68-819d-b0c8-d015bffefa0c` | `experience/project-02.html` |
| 胸部 X 射线与生成模型 | `3af9e718-eb68-81e2-8f2b-dce1e7a839f5` | `experience/project-03.html` |
| 计算病理与脑膜瘤形态分析 | `3af9e718-eb68-812a-ba8f-fab342e049d9` | `experience/project-04.html` |
| 脑疾病表格数据与 XGBoost 预测 | `3af9e718-eb68-81e8-a307-dc530e6fe458` | `experience/project-05.html` |
| 空间转录组与表达超分辨率 | `3af9e718-eb68-8169-bc74-c1dff4e57d43` | `experience/project-06.html` |
| KYDW科研入门培训 | `3af9e718-eb68-81ec-9f81-f26e4781862a` | `programs/training.html` |
| 山东大学本科生暑期名校课程-神经影像学与人工智能 | `3af9e718-eb68-814f-ac3e-f487800cc727` | `programs/sdu.html` |
| 基础编程与人工智能 | `3af9e718-eb68-81fa-ad54-ecc50d72f9d0` | `programs/sdu-lesson-00.html` |
| MRI 肿瘤图像分割 | `3af9e718-eb68-81c8-b09b-e77a1034ac49` | `programs/sdu-lesson-01.html` |
| 胸部 X 射线与生成模型 | `3af9e718-eb68-8151-ba1b-e0cbdb3cfdd1` | `programs/sdu-lesson-02.html` |
| 计算病理与脑膜瘤形态分析 | `3af9e718-eb68-818b-b734-c484df82834f` | `programs/sdu-lesson-03.html` |
| 脑疾病表格数据与 XGBoost 预测 | `3af9e718-eb68-8156-b3dc-e2cf1a2c9758` | `programs/sdu-lesson-04.html` |
| 空间转录组与表达超分辨率 | `3af9e718-eb68-81dd-9991-fca754e0d140` | `programs/sdu-lesson-05.html` |
| 复旦大学秋季学期本科生践悟课程 | `3af9e718-eb68-81cb-a388-ec09219c7371` | `programs/fudan.html` |
| 生物医学人工智能专题交流 | `3af9e718-eb68-812a-8277-cd742806cbf2` | `programs/workshop.html` |

### 8.3 资源中心

| Notion 页面 | 页面 ID | 对应 GitHub |
| --- | --- | --- |
| 资源中心 | `3af9e718-eb68-81e3-bd5f-dc0945a6f2df` | `resources/index.html` |
| 专业解读 | `3af9e718-eb68-819e-9d37-ef1f6672dfe9` | 资源中心专业解读合集 |
| 生物医学工程专业解读 | `3af9e718-eb68-8133-bbf1-cd5270ed8f8a` | `professional/index.html` |
| 生物医学工程专业答疑 | `3af9e718-eb68-81fd-89b6-d54f3f153969` | `professional/faq.html` |
| 项目与活动资料 | `3af9e718-eb68-813e-aaf5-ca20c3f1861e` | 资源中心项目与活动资料、`programs/index.html` |
| 教学文档库 | `3af9e718-eb68-8155-a0bd-cb8de30f8bf0` | `resources/index.html#teaching-library` |
| 科研基础环境准备 | `3af9e718-eb68-811f-9c73-f7ce61dbf272` | `resources/environment.html` |
| 东北大学生物医学工程（中外合办）历年去向表 | 待建立或现有专业解读子页 | `professional/destinations.html` |
| 基础编程与人工智能 | `3af9e718-eb68-8137-9c08-e0c04935ed05` | 项目 00 教学、实践与答案 |
| MRI 肿瘤图像分割 | `3af9e718-eb68-8125-adfe-d1d3d7029be9` | 项目 01 体验与进阶材料 |
| 胸部 X 射线与生成模型 | `3af9e718-eb68-81c5-bbb4-c9c9c9ea53da` | 项目 02 体验与进阶材料 |
| 计算病理与脑膜瘤形态分析 | `3af9e718-eb68-8196-83c4-d01f3c876974` | 项目 03 体验与进阶材料 |
| 脑疾病表格数据与 XGBoost 预测 | `3af9e718-eb68-81cf-aa19-cc414dbfeec0` | 项目 04 体验与进阶材料 |
| 空间转录组与表达超分辨率 | `3af9e718-eb68-81bc-b5d9-f98b07ac35d1` | 项目 05 体验与进阶材料 |

Notion 的项目主树与教学文档库是同一材料的两个阅读场景：

- 项目主树负责面向对象、开放时间、项目说明和参与路径。
- 教学文档库负责按文档检索材料，可以省略参与说明。
- 两处的项目标题、体验/进阶关系、核心任务说明、实践要求和材料链接必须一致。
- 两处 HTML 嵌入是不同附件，更新教学 HTML 后必须分别替换。

## 九、发布前检查

1. `node --check content.js`
2. `node --check site.js`
3. `python -m py_compile tools/import_experience_materials.py`
4. `git diff --check`
5. 检查全部 HTML 返回 200，没有可见破图和横向溢出。
6. 检查主导航在普通页、山东大学实践页和专业答疑页均高亮正确合集。
7. 从首页点击每名负责人，确认负责人详情页打开对应折叠项。
8. 检查 Week 锁定状态、项目编号、体验/进阶关系和所有返回按钮。
9. 检查桌面端与窄屏布局。
10. 推送后检查 GitHub Pages 部署状态，并回读线上首页、成果页、负责人页、资源中心和代表性项目页。
11. 回读所有本轮修改的 Notion 页面。

发布宣传文案前，再检查 `docs/promotions/项目专属群公告.md` 中的国内入口、国外入口和 Kaggle 入口占位是否已经替换为实际链接；未补链接时不要把占位符当作正式入口发送。

## 十、相关维护文件

- `docs/site-architecture.md`：设计原则、页面层级和公开文案边界。
- `docs/experience-materials.md`：体验/进阶材料、公开编号和文件映射。
- `docs/environment-materials.md`：科研基础环境准备的 GitHub、Notion 和图片维护方式。
- `content/advanced-manifest.md`：进阶材料哈希与缺失配图。
- `_codex_state/current_task_state.md`：最近一次任务状态，不代替本手册。
