# 代码视频生成器 🎬

使用 Revideo 0.11.0 + GitHub Actions 的云端代码动画实验室。

## 五秒基础设施验收
1. 进入 Actions → Render Revideo Demo → Run workflow。
2. 完成后下载 Artifacts → revideo-demo-mp4，解压为 hello-revideo.mp4。
3. 当前目标：5 秒、1920×1080；实际帧率、时长及画质以工作流 ffprobe 输出为准。
4. GitHub Artifacts 仅作临时交付；正式成品归档在授权 Google Drive「代码视频文件/成品」。当前尚未实现自动上传 Google Drive，不要误认为已自动归档。

普通场景代码提交不会自动渲染；工作流文件变更会触发一次运行，或手动运行。

## 文件
- 动画：src/scenes/hello.tsx
- 项目入口：src/project.ts
- 渲染程序：render.mjs
- 工作流：.github/workflows/render-revideo.yml
- 输出：out/hello-revideo.mp4

公开仓库不要放私人照片、企业业务资料或密钥。测试禁用可选匿名遥测。
依赖锁定文件尚未建立，npm install 可能解析不同的传递依赖；后续应生成真实的 package-lock.json 并改为 npm ci。
