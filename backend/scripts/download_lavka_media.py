"""Download the small, curated demo image set from its source manifest."""

import json
from pathlib import Path
from urllib.request import Request, urlopen


HERE = Path(__file__).resolve().parent
STATIC = HERE.parent / "static"
SOURCES = json.loads((HERE / "lavka_media_sources.json").read_text())


def main() -> None:
    for relative_path, url in SOURCES.items():
        target = STATIC / relative_path
        if target.exists() and target.stat().st_size:
            continue
        target.parent.mkdir(parents=True, exist_ok=True)
        request = Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urlopen(request, timeout=20) as response:
            data = response.read()
        target.write_bytes(data)
        print(f"Saved {target.relative_to(STATIC)} ({len(data)} bytes)")


if __name__ == "__main__":
    main()
