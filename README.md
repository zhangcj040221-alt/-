# 代码视频生成器 🎬

使用开源 [Revideo](https://github.com/midrender/revideo) + **GitHub Actions** 的云端代码动画实验室。

## 第一次试玩
1. 进入本仓库的 **Actions** 页面。
2. 选择 **Render Revideo Demo**，点击 **Run workflow**。
3. 运行完成后打开该次记录，下载下方 **Artifacts → revideo-demo-mp4**。
4. 解压得到 `hello-revideo.mp4`，约 3.6 秒、1080p、30fps（首轮已实测）。

首次提交也会自动尝试渲染一次。后续默认只在手动点击时运行，不会因每次改动画而浪费运行时长。

## 改动画
- 动画内容：`src/scenes/hello.tsx`
- 项目定义：`src/project.ts`
- 渲染命令：`npm run render`
- 云端工作流：`.github/workflows/render-revideo.yml`
- 输出：`out/hello-revideo.mp4`

这是公开仓库，**不要放私人照片、企业业务资料或密钥**。

依赖使用 Revideo 0.11.0；测试禁用可选匿名遥测。实验阶段，渲染稳定性以 GitHub Actions 实际结果为准。
