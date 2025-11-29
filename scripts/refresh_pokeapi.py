#!/usr/bin/env python3
"""Fetch a slice of authoritative Pokémon data from PokeAPI and write to data/pokemon.json.

This script is intentionally conservative and deterministic: it fetches a configured set
of Pokémon and writes a minimal canonical file which can be reviewed and committed.

Usage (CI): python3 scripts/refresh_pokeapi.py --limit 151 --out data/pokemon.json
"""

import argparse
import json
import sys
from urllib.request import urlopen

BASE = "https://pokeapi.co/api/v2"


def fetch_url(path):
    url = f"{BASE}{path}"
    with urlopen(url) as fh:
        return json.load(fh)


def fetch_pokemon(n):
    # get pokemon list
    resp = fetch_url(f"/pokemon?limit={n}&offset=0")
    out = []
    for p in resp.get("results", []):
        try:
            details = fetch_url(p["url"].replace(BASE, "")) if p.get("url") else {}
        except Exception:
            details = {"name": p.get("name"), "error": True}
        # extract only canonical fields for our dataset
        minimal = {
            "id": details.get("id"),
            "name": details.get("name"),
            "height": details.get("height"),
            "weight": details.get("weight"),
            "base_experience": details.get("base_experience"),
            "types": [t["type"]["name"] for t in details.get("types", [])],
            "abilities": [a["ability"]["name"] for a in details.get("abilities", [])],
            "sprite": details.get("sprites", {}).get("other", {}).get("official-artwork", {}).get("front_default"),
        }
        out.append(minimal)
    return out


def main(argv):
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=151, help="how many pokemon to fetch")
    ap.add_argument("--out", default="data/pokemon.json", help="output path")
    args = ap.parse_args(argv)

    data = fetch_pokemon(args.limit)
    path = args.out
    with open(path, "w", encoding="utf-8") as fh:
        json.dump({"version": "1", "count": len(data), "pokemon": data}, fh, indent=2, ensure_ascii=False)
    print(f"Wrote {len(data)} pokemon to {path}")


if __name__ == "__main__":
    main(sys.argv[1:])
