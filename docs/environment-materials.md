# 科研基础环境准备维护说明

## 页面与资源

- 阅读页面：`resources/environment.html`
- 图片目录：`resources/assets/environment/`
- 资源中心入口：`resources/index.html#teaching-library`
- 当前配图：19 张，按原材料中的出现顺序编号为 `image-01.png` 至 `image-19.png`。

页面内容保留科研基础环境准备材料中的原有章节、步骤、说明和图片；本次只统一了中文标点、明显的空格和大小写，并将原有链接转换为可点击链接。后续修改时，不能把原文压缩成准备清单，也不能删去步骤图片。

## 页面联动

教学文档库的额外条目写在 `content.js` 的 `resourceCollections` / `teaching-library` 中。资源中心页面由同一条数据渲染，新增或更换页面路径时只修改这一处，并检查：

1. `resources/index.html` 能进入该页面；
2. GitHub Pages 页面和 19 张图片均返回 200；
3. 页面在桌面端和窄屏仍能阅读，双图布局在窄屏降为单列；
4. Notion 教学文档库下的“科研基础环境准备”页面继续嵌入同一份 HTML。

## Notion 同步

Notion 使用页面附件嵌入 HTML，不把正文复制成第二份。HTML 更新后重新上传附件并替换嵌入块；图片由 GitHub 页面提供，不能把相对路径改成本机路径。六个体验项目教学页也遵循同一规则：项目页面直接嵌入 HTML，项目说明、实践代码和参考答案仍按项目页面的既有层级展示。
