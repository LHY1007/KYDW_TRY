# 科研基础环境准备维护说明

## 页面与资源

- 阅读页面：`resources/environment.html`
- 图片目录：`resources/assets/environment/`
- 资源中心入口：`resources/index.html#teaching-library`
- 历史配图仍保存在 `resources/assets/environment/`，当前页面不再引用旧版注册界面与网络工具截图。

2026-08-11 起，页面按两种使用场景组织：网站课程和实践优先使用 Kaggle；长期编程、私有数据、复杂依赖和远程计算使用本地环境。页面保留账户检查、Notebook 复制、运行顺序、计算资源和常见错误，删除具体网络服务商、兑换码、节点倍率、固定 GPU 型号、固定使用时长和必须注册某一类账户的表述。

## 页面联动

教学文档库的额外条目写在 `content.js` 的 `resourceCollections` / `teaching-library` 中。资源中心页面由同一条数据渲染，新增或更换页面路径时只修改这一处，并检查：

1. `resources/index.html` 能进入该页面；
2. GitHub Pages 页面和 Kaggle、科研技能项目入口均可访问；
3. 页面在桌面端和窄屏仍能阅读，路径卡片和常见问题在窄屏降为单列；
4. 页面不含特定网络服务商、兑换码、固定 GPU 型号或固定使用额度；
5. Kaggle 步骤与当前实践入口一致，说明复制个人副本、依次运行、保存版本和查看当前可用加速器；
6. Notion 或飞书再次同步时，以当前 GitHub 正文为准，使用原生标题、段落和列表，不恢复旧版时效信息。

## Notion 同步

Notion 与飞书当前不作为本轮发布对象。后续同步“科研基础环境准备”时，使用当前 GitHub 正文和原生页面块；体验项目教学页仍按项目页面的既有层级展示。
