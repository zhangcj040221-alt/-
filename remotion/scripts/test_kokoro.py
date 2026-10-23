from pathlib import Path
import json
import soundfile as sf
from misaki import zh
from kokoro_onnx import Kokoro

root = Path(__file__).resolve().parents[1]
model_dir = root / "models"
out = root / "out" / "kokoro-test"
out.mkdir(parents=True, exist_ok=True)
engine = Kokoro(str(model_dir / "kokoro-v1.1-zh.int8.onnx"), str(model_dir / "voices-v1.1-zh.bin"), vocab_config=str(model_dir / "config.json"))
g2p = zh.ZHG2P(version="1.1")
lines = ["看见闪电，是光先到达眼睛。", "听见雷声，是声音随后到达耳朵。"]
results = []
for idx, line in enumerate(lines, 1):
    phonemes, _ = g2p(line)
    samples, rate = engine.create(phonemes, voice="zf_001", speed=1.0, is_phonemes=True)
    path = out / f"sentence-{idx}.wav"
    sf.write(path, samples, rate)
    results.append({"text":line, "duration":round(len(samples)/rate, 3), "file":path.name})
(out / "report.json").write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps(results, ensure_ascii=False))
