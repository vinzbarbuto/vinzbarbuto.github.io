#!/bin/bash
# Image Optimization Script for vincenzo-barbuto.github.io
# Converts all PNG/JPG/JPEG images in public/ to WebP format.
# Run from the project root: bash scripts/optimize-images.sh

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

PUBLIC_DIR="public"

echo -e "${CYAN}============================================${NC}"
echo -e "${CYAN}  Image → WebP Optimizer${NC}"
echo -e "${CYAN}  vincenzo-barbuto.github.io${NC}"
echo -e "${CYAN}============================================${NC}\n"

# ── 1. Dependency check ───────────────────────────────────────────────────────
check_deps() {
    echo -e "${YELLOW}Checking dependencies...${NC}"
    if ! command -v cwebp &> /dev/null; then
        echo -e "${RED}✗ cwebp not found.${NC}"
        echo "  Install with:  brew install libwebp"
        exit 1
    fi
    echo -e "${GREEN}✓ cwebp found${NC}\n"
}

# ── 2. Show current sizes ─────────────────────────────────────────────────────
show_sizes() {
    echo -e "${YELLOW}Current non-WebP images in public/:${NC}"
    find "$PUBLIC_DIR" \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) \
        ! -path "*/.DS_Store" | sort | while read -r f; do
        size=$(du -sh "$f" 2>/dev/null | cut -f1)
        echo "  ${size}   $f"
    done
    echo ""
}

# ── 3. Convert images ─────────────────────────────────────────────────────────
convert_images() {
    echo -e "${YELLOW}Converting images to WebP...${NC}"
    local count=0
    local skipped=0

    while IFS= read -r -d '' img; do
        ext="${img##*.}"
        dest="${img%.*}.webp"

        if [ -f "$dest" ]; then
            echo -e "  ${CYAN}↷ skipped${NC}  $img (WebP already exists)"
            skipped=$((skipped + 1))
            continue
        fi

        before=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
        cwebp -q 88 -quiet "$img" -o "$dest"
        after=$(stat -f%z "$dest" 2>/dev/null || stat -c%s "$dest" 2>/dev/null)

        if [ "$before" -gt 0 ]; then
            pct=$(( 100 * (before - after) / before ))
            echo -e "  ${GREEN}✓ converted${NC}  $img  →  $(basename "$dest")  (-${pct}%)"
        fi
        count=$((count + 1))
    done < <(find "$PUBLIC_DIR" \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) ! -path "*/.DS_Store" -print0)

    echo ""
    echo -e "${GREEN}✓ Converted: $count file(s).  Skipped (already exist): $skipped.${NC}\n"
}

# ── 4. Summary ────────────────────────────────────────────────────────────────
summary() {
    echo -e "${YELLOW}WebP images now in public/:${NC}"
    find "$PUBLIC_DIR" -name "*.webp" ! -path "*/.DS_Store" | sort | while read -r f; do
        size=$(du -sh "$f" 2>/dev/null | cut -f1)
        echo "  ${size}   $f"
    done

    echo ""
    echo -e "${CYAN}============================================${NC}"
    echo -e "${GREEN}  Done! Remember to:${NC}"
    echo -e "${GREEN}  1. Update image paths in src/data/ to use .webp${NC}"
    echo -e "${GREEN}  2. Commit the new .webp files to git${NC}"
    echo -e "${GREEN}  3. Optionally delete the original files${NC}"
    echo -e "${CYAN}============================================${NC}\n"
}

# ── Main ──────────────────────────────────────────────────────────────────────
check_deps
show_sizes
convert_images
summary
