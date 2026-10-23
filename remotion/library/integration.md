# 视觉组件接入进度

当前仓库已经安装 `@remotion/lottie`，尚未配置可复用动画资源；不能把依赖存在等同于素材已接入。

接入顺序：
1. 图标：Lucide React 与 Iconify React，支持 JSON 镜头配置。
2. 动画：把已下载的 Lottie JSON 固定在仓库内，使用 `@remotion/lottie` 与 Remotion 帧同步。
3. 镜头：从 `shots.json` 选模板，映射到 StoryVideo。

注意：渲染时不要远程请求素材。
