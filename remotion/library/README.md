# MG 视觉资源库（个人学习用途）

原则：优先使用免费开源素材，复用现成项目，不从零重复绘制。此目录记录资源入口和统一镜头协议；资源是否免费不代表自动允许任意再分发。

## 素材与组件入口

| 分类 | 项目 | 网址 | 接入方案 |
|---|---|---|---|
| 图标 | Iconify | https://iconify.design/ | 优先按需使用 SVG；图标集有各自许可 |
| 图标 | Lucide | https://lucide.dev/ | 简洁通用图标 |
| 图标 | Tabler Icons | https://tabler.io/icons | 科普图解基础图标 |
| 动画 | Lottie / dotLottie | https://lottiefiles.github.io/lottie-docs/ | JSON 动画资源，先进行 Remotion 帧渲染兼容性测试 |
| 动画 | Rive | https://rive.app/ | 可选互动矢量动画，免费层与导出能力需分别确认 |
| 动画引擎 | Motion Canvas | https://motioncanvas.io/ | 独立参考项目，不直接混用渲染生命周期 |
| 动画引擎 | Remotion | https://www.remotion.dev/ | 当前正式渲染引擎 |

## 目录约定

- `assets.json`：素材索引；不直接存储第三方受限文件。
- `shots.json`：镜头模板参数库。
- `storyboards/`：主题镜头清单，按 JSON 组织。
- 视觉资产优先使用本地固定版本；不要让渲染流程实时访问不稳定的远程素材 URL。

## 验收门槛（轻量）

1. 免费获取、个人学习可使用。
2. 在 Remotion 30fps 帧渲染下可重现，不能依赖浏览器墙钟计时。
3. 中文文字不缺字，素材不越界。
4. 视频渲染成功即可入库，画面问题再按批次改进。
