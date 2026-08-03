"""Compatibility entry point for rebuilding the public Kaggle notebook copies.

The three projects must be generated together.  Keeping a separate A01/A02
generator allowed an older implementation to overwrite the current student
notebooks, so this wrapper delegates to the single source-of-truth builder.
"""

from pathlib import Path
import sys


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "tools"))

from sync_kaggle_notebook_copies import main  # noqa: E402


if __name__ == "__main__":
    main()
