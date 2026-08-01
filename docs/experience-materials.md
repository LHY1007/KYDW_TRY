# 本科生科研入门体验项目材料维护表

## 一、唯一来源与编号映射

本轮导入的来源是：

`D:\00_同步\BaiduSyncdisk\01_学术研究\学生\KYDW\网站内容\体验项目`

本表记录本轮导入的原材料与网站项目编号对应关系。原材料编号不是网站显示编号；今后新增材料时在表格末尾追加对应关系，再修改页面和内容数据。

| 原材料 | 网站项目 | 教学页面 | 实践代码 | 解析页面 |
| --- | --- | --- | --- | --- |
| 00 | 01 基础编程与人工智能 | `experience/teaching/project-01.html` | `experience/practice/project-01.ipynb` | `experience/answers/project-01.html` |
| 01 | 02 MRI 肿瘤图像分割 | `experience/teaching/project-02.html` | `experience/practice/project-02.ipynb` | `experience/answers/project-02.html` |
| 02 | 03 胸部 X 射线与生成模型 | `experience/teaching/project-03.html` | `experience/practice/project-03.ipynb` | `experience/answers/project-03.html` |
| 03 | 04 计算病理与脑膜瘤形态分析 | `experience/teaching/project-04.html` | `experience/practice/project-04.ipynb` | `experience/answers/project-04.html` |
| 04 | 05 脑疾病表格数据与 XGBoost 预测 | `experience/teaching/project-05.html` | `experience/practice/project-05.ipynb` | `experience/answers/project-05.html` |
| 05 | 06 空间转录组与表达超分辨率 | `experience/teaching/project-06.html` | `experience/practice/project-06.ipynb` | `experience/answers/project-06.html` |

## 二、网站中的两层材料

网站按项目是否登记进阶材料决定显示层级。仅有体验材料的项目按单层显示；同时登记体验版和进阶版材料的项目按两层显示：

- 体验项目：`experience/teaching/`、`experience/practice/`、`experience/answers/`。
- 进阶项目：`experience/advanced/`、`experience/practice/`、`experience/advanced-answers/`。

进阶教学页和进阶解析页目前由同一批体验材料生成独立副本，页面只改变版本标识和返回入口，便于先检查项目详情页、资源中心与文档之间的协调关系。后续真正的进阶材料完成后，直接替换 `experience/advanced/` 与 `experience/advanced-answers/` 中对应文件，不要改动体验版路径，也不要改变网站项目编号。

本轮部分项目的实践 Notebook 由两层共用；如果某个进阶项目获得独立 Notebook，只需在 `content.js` 的 `advancedPractice` 中登记新路径。

## 三、每次替换材料必须同步检查的内容

1. `content.js` 中的项目标题必须与教学页标题、解析页任务名称和 Notebook 任务一致。
2. 项目详情页只显示实际存在的三类材料：教学项目、实践项目、参考答案；不要补写泛化的“准备要求”“学习量”或重复说明。
3. `resourceCollections` 中的教学文档库条目应指向体验教学页，项目详情页再提供体验/进阶两层入口。
4. 如果输入、输出、任务名称、数据对象或结果文件名发生变化，要同时检查教学 HTML、Notebook、解析 HTML、项目卡片和实践注意事项。
5. 每个导入的教学 HTML 和解析 HTML 都必须保留“返回项目详情”按钮；返回路径从文件所在目录计算，不要写本地地址。
6. 来源页面里的外部图像链接属于材料的一部分。替换或下载图像前先检查来源、显示效果和页面中的来源说明；不要只为减少请求而删除图像。

## 四、内容审查重点

- 教学页应先解释输入对象和研究问题，再出现模型名称、指标或代码动作。
- 解析页的步骤顺序必须与 Notebook 的执行顺序一致；目标列、患者标识、空间划分等由数据决定的字段不能写成不存在的固定答案。
- 面向初学者的说明要回答“这是什么、为什么在这里出现、输出怎样被阅读”，不要用项目制作过程、内部审核或对话式说明填充页面。
- 页面之间可以复用同一个事实，但不要把教学正文、实践解析和资源中心条目复制成三份独立文案；项目数据和材料路径是联动检查的起点。
