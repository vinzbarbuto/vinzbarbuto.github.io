# CLAUDE.md

## Design Context

This project has a documented design system. Read both before any UI work:

- **[PRODUCT.md](PRODUCT.md)** — strategic context: register (brand), users, purpose, anti-references, design principles, accessibility commitments.
- **[DESIGN.md](DESIGN.md)** — visual system: Edge Aurora North Star, Lab Emerald signal color + aurora atmospheric palette, Space Grotesk / Outfit typography, glass-and-halo elevation, component specs and named rules.
- **[.impeccable/design.json](.impeccable/design.json)** — machine-readable extensions: tonal ramps, shadow/motion/breakpoint tokens, drop-in component HTML/CSS snippets.

When generating new UI, follow the Do's and Don'ts in DESIGN.md §6. The non-negotiable rules: **The One Signal Rule** (Lab Emerald is the only saturated UI color), **The 10% Emerald Rule** (≤15% of any viewport), **The Glass-Behind-Glass Ban** (no nested glass surfaces), **The Halo-Not-Outline Rule** (hover = emerald halo + Y-translate, never thicker borders).

For larger design changes, use `/impeccable <command>` (e.g. `/impeccable craft`, `/impeccable polish`, `/impeccable critique`).
