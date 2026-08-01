# KYDW_TRY 当前任务状态

## 目标

完成 KYDW_TRY 的负责人、成员高校、成果、项目环境准备和多端同步；交付 GitHub Pages、Notion/飞书页面与科研环境 PDF。

## 当前基线

- 工作目录：`D:\00_同步\BaiduSyncdisk\01_学术研究\展示\山大\Extra-Materials\kydw_try_site`
- 公开分支：`main`
- 维护分支：`agent/maintenance-state-20260801`
- GitHub 仓库：`LHY1007/KYDW_TRY`
- 统一数据源：`content.js`
- 维护文档：`docs/site-architecture.md`、`docs/content-audit-2026-08-01.md`

## 已完成

- 负责人顺序、年级和专业已统一；汤昊天加入一区 Top 期刊接收信息，姜逸轩加入慧医智心负责人和国家级一等奖信息，吴熙东加入新加坡国立大学医学院 PhD。
- 首页负责人全部使用跳转到负责人子页面；代表性成果下方加入“团队近期动态”；成员高校分为直博、国内学硕/海外研究型硕士和在校本科生高校。
- 山东大学项目名称、复旦项目名称、科研入门培训章节锁定状态、体验项目 Week 2 锁定状态和 Kaggle 入口已统一。
- `resources/environment.html` 含 5 个编号章节、19 张配图、Kaggle 入口；本月兑换码为“飞天螳螂”，并明确每月更新，图片中的“小火马”为旧月份示例。
- Notion 原生“科研基础环境准备”页面已核对：5 个编号章节、19 张图片、当月兑换码和每月更新说明均存在；团队介绍、负责人、成员去向、成果、体验项目与教学文档库已抓取复核。
- 飞书“1.环境准备”页面已保存并回读验证：已加入“本月兑换码：飞天螳螂”“兑换码每月更新，每个月都会有新的免费会员”和旧图说明。
- PDF 已生成：`output/pdf/科研基础环境准备.pdf`，共 8 页；已渲染检查第 1、2、3、4、8 页，中文、图片、兑换码提示和页码正常。
- `origin/main` 已包含上述站点改动，当前公开提交为 `4c2f1b7`；GitHub Pages 首页、Week 2 锁定页、负责人页和环境页已线上复核。
- Notion 公开页面已用无缓存刷新复核：首页、负责人、已毕业成员去向、代表性成果和科研基础环境准备均无需登录即可访问；代表性成果标题已显示“团队近期动态”。
- 飞书公开页面已滚动加载复核：第 1—5 节、当月兑换码和每月更新说明均可读。

## 验证

- `node --check content.js`、`node --check site.js`、`python -m py_compile tools/import_experience_materials.py`、`git diff --check` 通过。
- 本地 Playwright 检查首页、团队页、负责人页、成员去向页、项目与活动、Week 1/2、项目 01/02、科研入门培训、资源中心和环境页；环境页 5 个章节、19 张图片，项目 02 进阶层锁定，Week 2 页面锁定。
- 公开站点源码审查未发现飞书链接、Notion 链接、Cargo、旧专业名称或 AI 对话式元文案。
- 三端关键字段一致：负责人专业为“东北大学生物医学工程专业”；汤昊天为 2023 级负责人并含 Expert Systems With Applications 接收信息；姜逸轩为 2024 级负责人并含慧医智心与国家级一等奖信息；吴熙东含新加坡国立大学医学院 PhD。

## 待完成

- 当前三端同步和 PDF 交付没有未完成项。

补充：`hanyul.super.site` 是此前的 Super 镜像，不属于本轮明确指定的飞书、Notion、GitHub 三端；其公开缓存仍可能显示旧版 Notion 文案。若继续维护该镜像，需要在 Super 控制台登录后手动触发同步，不能把它当作当前三端的内容源。

## 后续维护

先改 `content.js` 单一数据源，再按 `docs/site-architecture.md` 的联动表检查首页、上级合集和详情页。Cargo 一律按 Kaggle 处理；新增环境章节继续使用“第 n 节”编号并同步 HTML、Notion 和飞书。
