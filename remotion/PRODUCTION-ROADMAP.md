# MG 视频 P0/P1 建设台账（2026-10-23）

## P0 已实施，待云端复验
1. 正式渲染工作流移除强制 Edge TTS 生成步骤，避免 403 导致所有视频失败。
2. 生产入口保留 `render:narration`（有声实验模板），新增 `render:thunder-music`（无旁白模式），正式 CI 默认仅渲染无需 TTS 的组合。
3. Kokoro 中文 WAV 已经在独立 GitHub Actions 成功生成；未接入生产。未来有旁白模式需要显式配置，不能阻塞无旁白模式。

## P1 复用优先级
- **BGM + SFX**：Remotion 官方 Audio/Sequence 管理时间线；Python 标准库离线生成原创基础音频，零第三方素材许可风险。正式制作可按需替换为授权音效素材。首个作品 `ThunderMusic`。
- **成熟生态候选**（评估后再接入，不安装无需求包）：
  - Remotion 官方 `@remotion/media` / `<Audio>`：声音剪辑、音量、淡入淡出，以项目锁定版本兼容性为准。
  - FFmpeg：音频编码、响度标准化、混音、格式检查；项目已经安装。
  - Tone.js（https://github.com/Tonejs/Tone.js）：MIT，适合音乐合成和程序化节奏；若标准库音色不够再考虑。
  - wavesurfer.js（https://github.com/katspaugh/wavesurfer.js）：BSD-3-Clause，音频波形预览；只有建设可视化编辑器时才需要。
  - Freesound（https://freesound.org）：不是统一开源许可的素材库，逐条核对 CC0/CC BY 等许可，不能默认随意商用。
- **图形与动画组件复用**：已有官方 `@remotion/shapes`、`@remotion/paths`、`@remotion/transitions`；下一步优先提取现有场景通用组件，避免重复造轮子。
- **统一项目配置**：待本次成片验收后设计，不提前引入复杂配置层。

## 验收要求
- `thunder-music.mp4` 必须实际由 GitHub Actions 渲染、包含 H264 视频和非静音 AAC 音轨。
- 画面需经用户实际观看；音效与画面对应、BGM 不喧宾夺主，不能只凭 ffprobe 判断成品质量。
- 现有 `ecosystem-captions.mp4` 的 440Hz 音频仅为测试，不代表正式音乐素材。
