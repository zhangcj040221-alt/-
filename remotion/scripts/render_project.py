#!/usr/bin/env python3
"""Validate a reusable MG project JSON and render only that project."""
import argparse
import json
import re
import subprocess
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
NAME = re.compile(r"^[a-z0-9][a-z0-9_-]{0,63}$")
HEX = re.compile(r"^#[0-9a-fA-F]{6}$")


def project(name):
    if not NAME.fullmatch(name):
        raise ValueError("Project name must be a safe lowercase slug")
    source = ROOT / "projects" / (name + ".json")
    plan = json.loads(source.read_text(encoding="utf-8"))
    scenes = plan.get("scenes")
    if not isinstance(scenes, list) or not scenes or len(scenes) > 100:
        raise ValueError("Project must contain 1-100 scenes")
    frames = 0
    for scene in scenes:
        if not isinstance(scene, dict) or not isinstance(scene.get("title"), str) or not isinstance(scene.get("body"), str):
            raise ValueError("Scene requires title and body")
        seconds = scene.get("seconds")
        if isinstance(seconds, bool) or not isinstance(seconds, (int, float)) or not 0.5 <= seconds <= 60:
            raise ValueError("Scene duration must be 0.5-60 seconds")
        if "accent" in scene and not HEX.fullmatch(scene["accent"]):
            raise ValueError("Accent must be a hex color")
        frames += round(seconds * 30)
    if frames > 30 * 600:
        raise ValueError("Project exceeds 10 minutes")
    audio = plan.get("audio") or {}
    if not isinstance(audio, dict):
        raise ValueError("Audio must be an object")
    cues = audio.get("cues", [])
    if not isinstance(cues, list) or len(cues) > 200:
        raise ValueError("Too many sound cues")
    tracks = ([audio["music"]] if audio.get("music") else []) + cues
    for track in tracks:
        file = track.get("file", "")
        if not isinstance(file, str) or not re.fullmatch(r"sound/[a-zA-Z0-9_-]+\\.(wav|mp3)", file):
            raise ValueError("Audio must reference an approved sound/ asset")
        if not (ROOT / "public" / file).is_file():
            raise ValueError("Audio asset missing: " + file)
    return plan, frames


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--project", default="water-cycle")
    args = parser.parse_args()
    plan, frames = project(args.project)
    (ROOT / "out").mkdir(exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        props = Path(tmp) / "props.json"
        props.write_text(json.dumps({"plan": plan}, ensure_ascii=False), encoding="utf-8")
        output = ROOT / "out" / (args.project + ".mp4")
        subprocess.run(["npx", "remotion", "render", "src/index.ts", "StoryTemplate", str(output),
                        "--codec", "h264", "--crf", "22", "--props", str(props),
                        "--frames", f"0-{frames - 1}"], cwd=ROOT, check=True)
        subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                        "-of", "default=noprint_wrappers=1", str(output)], check=True)
    print(json.dumps({"project": args.project, "output": str(output), "frames": frames}))


if __name__ == "__main__":
    main()
