#!/usr/bin/env python3
"""
Fetches bibliometric indexes (citations, h-index, i10-index) from Google Scholar
for the author identified by SCHOLAR_ID and writes the result to OUTPUT_PATH.

Usage:
    pip install scholarly
    python scripts/fetch_scholar.py
"""

import json
import sys
from datetime import datetime, timezone

# ── Configuration ────────────────────────────────────────────────────────────
SCHOLAR_ID  = "_-riw5YAAAAJ"          # Change if the profile ID ever changes
OUTPUT_PATH = "public/scholar-stats.json"
# ─────────────────────────────────────────────────────────────────────────────


def fetch_stats(scholar_id: str) -> dict:
    """Fetch author stats from Google Scholar via the `scholarly` library."""
    try:
        from scholarly import scholarly as sch
    except ImportError:
        print("Error: 'scholarly' is not installed. Run: pip install scholarly", file=sys.stderr)
        sys.exit(1)

    print(f"Searching Google Scholar for author ID: {scholar_id} ...")
    author = sch.search_author_id(scholar_id)

    print("Filling in author profile ...")
    # Request both 'basics' (citedby) and 'indices' (hindex, i10index)
    author = sch.fill(author, sections=["basics", "indices"])

    citedby  = author.get("citedby",  None)

    # hindex / i10index can live at top-level or inside 'cites_per_year'-adjacent
    # fields depending on the scholarly version — try both locations
    hindex   = author.get("hindex",   None)
    i10index = author.get("i10index", None)

    # Some scholarly versions expose them under author["indices"]
    indices = author.get("indices", {}) or {}
    if hindex   is None: hindex   = indices.get("h",   None)
    if i10index is None: i10index = indices.get("i10", None)

    print(f"  Citations : {citedby}")
    print(f"  h-index   : {hindex}")
    print(f"  i10-index : {i10index}")

    return {
        "citations":  citedby,
        "hindex":     hindex,
        "i10index":   i10index,
        "updated_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
    }


def write_json(data: dict, path: str) -> None:
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
    print(f"Stats written to {path}")


if __name__ == "__main__":
    stats = fetch_stats(SCHOLAR_ID)
    write_json(stats, OUTPUT_PATH)
