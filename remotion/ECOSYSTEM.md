# Remotion 生态复用验证台账

目标：每次新增能力必须来自可核实的成熟生态，并在真实 GitHub Actions 云端渲染中验证；拒绝只为单部视频反复手写效果。

## 已有基础（已验证）
- Remotion 4.0.367 / React 19.1.1，GitHub Actions 自动渲染，主分支 main。
- 首部《闪电与雷声》V1 和 V2 均已成功渲染；它们是手写动画能力基线，不代表成熟生态接入。
- 产物以 GitHub Actions artifact 发布，.video-status/remotion-latest.json 记录最新结果。

## 第一项真实生态接入（验证中）
- 官方包 `@remotion/transitions@4.0.367`，与引擎版本一致。
- `src/ecosystem-transitions.tsx`：用官方 `TransitionSeries`、`slide`、`fade`、`linearTiming` 组合 3 个独立场景。
- Composition `EcosystemTransitions`；`npm run render:ecosystem`；云端 workflow 输出 `ecosystem-transitions.mp4`。
- **待确认**：新一次 Actions 渲染成功、视频可播放后才将此能力标为已验证。
- 复用方式：不同作品只需替换 `Panel` 场景内容，保持转场结构和官方 API。

## 官方 Skills（已查阅原文，未安装到 ChatGPT）
- https://github.com/remotion-dev/skills
- 已阅读 `remotion-best-practices`、`remotion-markup`、`remotion-render` 的原始规则。
- 官方规则强调基于 `useCurrentFrame` 的逐帧动画，禁止依赖 CSS transition/animation；保持帧率相关计算来自 `useVideoConfig`；保留用户已有修改。
- 官方 Skills 最新文档版本可能高于本项目固定的 4.0.367；涉及 API 的内容必须以本项目实际兼容性验证为准。

## 候选资源（尚未接入）
1. `@remotion/shapes`：矢量图形，可用于图解、信息卡片。
2. `@remotion/paths`：SVG 路径动画，可用于原理演示、流程与线路。
3. `@remotion/captions`：字幕数据处理，需要有实际配音后验证。
4. 官方 templates：https://www.remotion.dev/templates；筛选能复用视觉结构且许可清晰的模板。
5. 社区资源：https://www.remotion.dev/docs/resources；逐一核实仓库、维护情况、许可证与部署复杂度。

## 原则
- 生态优先、自研其次；真实云端渲染成功才算接入。
- 新能力要能跨至少两类视频使用；不为一部作品增加维护成本。
- 不引入长期服务器，不改动历史视频归档，不批量安装未经验证的包。

## 实际渲染复验
- 2026-10-23：按用户要求重新触发官方 transitions + shapes + paths 的云端渲染；以新 Actions 运行结果为准，未完成前不标记通过。

## 2026-10-23 交接资料
- Google Drive「代码视频文件」已创建《代码视频项目｜工作交接与恢复指南｜2026-10-23》：https://docs.google.com/document/d/1PKld_hb0_Dr-Wea515RvwHhg-8Yn_ri7NxoZNUh6uPA/edit
- 首次生态渲染 run 39955109882：transitions 完整编码；graphics 在 frame 0 因旧版缺少 Arrow 失败。已修复为 Triangle，等待复验。

## 2026-10-23 生态渲染验收通过
- GitHub Actions run 39955865334，SHA 84f465b846d778f2aa49cdf4d7d03e8326d73340，所有步骤成功。
- artifact 12501434522，名称 remotion-ecosystem-validation，包含两个 MP4。
- ecosystem-transitions.mp4：1920×1080 / 30fps / 13.056秒 / 730997字节；官方转场通过。
- ecosystem-graphics.mp4：1920×1080 / 30fps / 9.045333秒 / 582968字节；官方 shapes 与 paths 通过。
- 已下载 artifact 并本地用 ffprobe 二次验证。注意：这证明编码与可播放文件存在；跨不同题材的实际复用尚待后续案例验证。

## 第三阶段：字幕生态（2026-10-23，验证中）
- 核对官方 Remotion v4.0.367 源码：@remotion/captions 导出 parseSrt、Caption、createTikTokStyleCaptions 等；已接入 @remotion/captions@4.0.367。
- 新增 src/ecosystem-captions.tsx，采用标准 SRT 字幕、毫秒时间轴和帧同步展示；Composition EcosystemCaptions，脚本 npm run render:captions。
- Actions 已加入 ecosystem-captions.mp4 渲染和非空检查。尚待确认成功 run、下载 MP4 及实测画面，未完成前不得标记验收通过。
- 音频轨道尚未接入：当前没有合法可复用的配音或音效素材。不要把纯字幕演示误称为带配音视频。下一步先完成字幕验证，再使用自有/明确授权音频测试 Audio 轨道。
