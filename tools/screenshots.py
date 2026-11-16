#!/usr/bin/env python3
"""Make the README card images (docs/images/card-*.png) from test/harness.html.

Serves the repository on 127.0.0.1, has headless Chromium render the harness with neutral
names (?shot=1, which also gives the living room an external room and humidity sensor),
reads the card positions (?rects=1) and cuts the three rows: compact (cards 0-2),
ring (3-4), tile (5-6). DE/EN, light/dark. Needs chromium and Pillow.

    python3 tools/screenshots.py
"""

from __future__ import annotations

import functools
import http.server
import json
import re
import subprocess
import tempfile
import threading
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "docs" / "images"
WIDTH, HEIGHT = 1120, 1500
CUTS = {"kompakt": (0, 3), "ring": (3, 5), "kachel": (5, 7)}


def chromium(*args: str) -> str:
    return subprocess.run(
        ["chromium", "--headless", "--disable-gpu", "--hide-scrollbars", "--virtual-time-budget=4000",
         f"--window-size={WIDTH},{HEIGHT}", *args],
        capture_output=True, text=True, timeout=120, check=True,
    ).stdout


def main() -> None:
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(ROOT))
    server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    base = f"http://127.0.0.1:{server.server_address[1]}/test/harness.html?shot=1"
    try:
        for lang in ("de", "en"):
            for theme in ("light", "dark"):
                url = f"{base}&lang={lang}&theme={theme}"
                dom = chromium("--dump-dom", url + "&rects=1")
                found = re.search(r'data-rects="([^"]+)"', dom)
                if not found:
                    raise SystemExit(f"no card positions for {lang}/{theme}")
                rects = json.loads(found.group(1).replace("&quot;", '"'))
                with tempfile.TemporaryDirectory() as tmp:
                    shot = Path(tmp) / "page.png"
                    chromium(f"--screenshot={shot}", url)
                    page = Image.open(shot)
                    for name, (first, last) in CUTS.items():
                        boxes = rects[first:last]
                        box = (min(b[0] for b in boxes), min(b[1] for b in boxes),
                               max(b[2] for b in boxes), max(b[3] for b in boxes))
                        target = OUT / f"card-{name}-{lang}-{theme}.png"
                        page.crop(box).save(target)
                        print(target.relative_to(ROOT), box[2] - box[0], "x", box[3] - box[1])
    finally:
        server.shutdown()


if __name__ == "__main__":
    main()
