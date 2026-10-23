# Remotion MG 生态建设记录

## 目标
面向个人体验的代码式 MG 科普视频。优先复用、纯云端渲染、尽量不增加依赖。

## 已验证基础设施
Remotion 4.0.367 + React 19.1.1；GitHub Actions 渲染；运行编号固定写入 .video-status/remotion-latest.json；Artifact 下载及 Google Drive 归档。

## 官方 Agent Skills 参考
- https://github.com/remotion-dev/skills
- remotion-best-practices：综合规范
- remotion-markup：排版、动画、媒体、时间控制
- remotion-render：渲染
- remotion-captions：字幕（待接入）
- remotion-maps：地图（待接入）

这里先建立资源清单与工程约定，**不声称已经在 ChatGPT 中安装官方 Skills**。避免无必要的 npm 包或服务依赖。

## 可复用组件
- src/mg.tsx：FadeUp（入场动画）、AnimatedBar（数据条）、SceneTitle（标题）
- src/showcase.tsx：15 秒科普 MG 综合演示
- src/root.tsx：Intro 与 MGShowcase 两个 Composition

## 体验顺序
1. 文字与图形 MG：当前演示
2. 数据可视化与信息图
3. 动态字幕和语音
4. 地图与科学原理动画
5. 第三方模板：逐一核对许可证与可维护性后引入

## 注意
演示图表为虚构示例数据，不能当作真实研究结论。主分支 Revideo 保留备用，当前改动仅在 remotion-experience 分支。
