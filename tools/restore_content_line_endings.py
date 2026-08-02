"""Keep the repository's historical mixed line endings after generated edits."""

import subprocess
from pathlib import Path


path = Path(__file__).resolve().parents[1] / "content.js"
current = path.read_text(encoding="utf-8")
original = subprocess.check_output(["git", "show", "HEAD:content.js"]).decode("utf-8")
current_lines = current.splitlines()
original_parts = original.splitlines(keepends=True)
if len(current_lines) != len(original_parts):
    raise RuntimeError(f"line count changed: current={len(current_lines)} original={len(original_parts)}")
endings = [part[len(part.rstrip("\r\n")):] for part in original_parts]
path.write_bytes("".join(line + ending for line, ending in zip(current_lines, endings)).encode("utf-8"))
print(path)
