"""Remove local machine paths and internal run labels from public result JSON."""

from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def load(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def save(path: Path, value: dict) -> None:
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    a00_path = ROOT / "experience/assets/results/project-01/task0_result.json"
    a00 = load(a00_path)
    a00.pop("dataset_root", None)
    a00.pop("run_profile", None)
    a00["data_source_note"] = "MNIST / torchvision 数据集的真实参考运行。"
    save(a00_path, a00)

    a02_path = ROOT / "experience/assets/results/project-03/task2_pytorch_result.json"
    a02 = load(a02_path)
    execution = a02.get("execution", {})
    execution.pop("python", None)
    execution.pop("device_name", None)
    a02["execution"] = execution
    data = a02.get("data", {})
    data.pop("source_directory", None)
    a02["data"] = data
    save(a02_path, a02)


if __name__ == "__main__":
    main()
