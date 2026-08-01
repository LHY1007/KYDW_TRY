# 科研基础环境准备维护说明

## 页面与资源

- 阅读页面：`resources/environment.html`
- 图片目录：`resources/assets/environment/`
- 资源中心入口：`resources/index.html#teaching-library`
- 当前配图：19 张，按原材料中的出现顺序编号为 `image-01.png` 至 `image-19.png`。

页面内容保留科研基础环境准备材料中的原有章节、步骤、说明和图片；本次只统一了中文标点、明显的空格和大小写，将 Kaggle 入口转换为可点击链接，并恢复“第 1 节”至“第 5 节”的章节编号。VPN 服务名保留为正文，不引入非 Kaggle 外链。后续修改时，不能把原文压缩成准备清单，也不能删去步骤图片或章节编号。

## 页面联动

教学文档库的额外条目写在 `content.js` 的 `resourceCollections` / `teaching-library` 中。资源中心页面由同一条数据渲染，新增或更换页面路径时只修改这一处，并检查：

1. `resources/index.html` 能进入该页面；
2. GitHub Pages 页面和 19 张图片均返回 200；
3. 页面在桌面端和窄屏仍能阅读，双图布局在窄屏降为单列；
4. HTML 和 Notion 的五个章节标题均带有相同编号；
5. Notion 教学文档库下的“科研基础环境准备”页面使用原生标题、段落、列表和图片块，正文与图片顺序和来源材料一致，不嵌入 HTML。

## Notion 同步

Notion 教学文档库中的“科研基础环境准备”使用原生页面内容，正文由标题、段落、列表和图片块组成，不嵌入 HTML；图片单独上传到 Notion，GitHub 页面继续保留独立 HTML 版本。六个体验项目教学页仍遵循 HTML 嵌入规则：项目页面直接嵌入 HTML，项目说明、实践代码和参考答案仍按项目页面的既有层级展示。
