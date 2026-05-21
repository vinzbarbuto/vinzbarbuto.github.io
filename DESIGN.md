---
name: Vincenzo Barbuto — Edge Aurora
description: Academic portfolio for an Edge AI / Digital Twin researcher. Dark canvas, aurora atmosphere, lab-emerald signal, precise glass instruments.
colors:
  lab-emerald: "#10b981"
  lab-emerald-bright: "#34d399"
  deep-indigo: "#6366f1"
  neon-orchid: "#ec4899"
  cyber-cyan: "#38bdf8"
  plasma-violet: "#8b5cf6"
  void-0: "#05060a"
  void-1: "#0a0b12"
  void-2: "#12131c"
  surface-glass: "#1214201f"
  hairline: "#ffffff14"
  hairline-strong: "#ffffff24"
  text-primary: "#f5f7fb"
  text-secondary: "#c8ccd6"
  text-muted: "#8a8f9d"
  text-faint: "#5c6170"
typography:
  display:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(3rem, 5vw + 1rem, 5.25rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 4vw + 1rem, 4rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.18em"
rounded:
  sm: "0.5rem"
  md: "0.875rem"
  lg: "1.25rem"
  xl: "1.5rem"
  pill: "9999px"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  "2xl": "3rem"
  "3xl": "4rem"
  "4xl": "6rem"
components:
  button-primary:
    backgroundColor: "{colors.lab-emerald}"
    textColor: "{colors.void-0}"
    rounded: "{rounded.pill}"
    padding: "0.85rem 1.6rem"
    typography: "{typography.body}"
  button-primary-hover:
    backgroundColor: "{colors.lab-emerald-bright}"
    textColor: "{colors.void-0}"
  button-ghost:
    backgroundColor: "#ffffff0f"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.pill}"
    padding: "0.85rem 1.6rem"
    typography: "{typography.body}"
  button-ghost-hover:
    backgroundColor: "#10b98124"
    textColor: "{colors.text-primary}"
  button-hero:
    backgroundColor: "#ffffff14"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.pill}"
    padding: "0.95rem 2.2rem"
    typography: "{typography.body}"
  button-hero-hover:
    backgroundColor: "#10b98133"
    textColor: "{colors.text-primary}"
  status-pill:
    backgroundColor: "#14141e99"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 1.2rem"
    typography: "{typography.label}"
  preview-card:
    backgroundColor: "{colors.surface-glass}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "1.5rem"
  preview-card-hover:
    backgroundColor: "{colors.surface-glass}"
    textColor: "{colors.text-primary}"
  featured-card:
    backgroundColor: "{colors.surface-glass}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.xl}"
    padding: "3.5rem 4rem"
  featured-badge:
    backgroundColor: "#10b98126"
    textColor: "{colors.lab-emerald}"
    rounded: "{rounded.pill}"
    padding: "0.4rem 1.2rem"
    typography: "{typography.label}"
  chip:
    backgroundColor: "#10b98129"
    textColor: "{colors.lab-emerald}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 1rem"
    typography: "{typography.body}"
  marquee-item:
    backgroundColor: "{colors.surface-glass}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.pill}"
    padding: "1rem 2rem"
    typography: "{typography.body}"
  nav-pill:
    backgroundColor: "#10b98129"
    textColor: "{colors.lab-emerald-bright}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 1rem"
    typography: "{typography.body}"
  timeline-dot:
    backgroundColor: "{colors.lab-emerald}"
    rounded: "{rounded.pill}"
    width: "0.75rem"
    height: "0.75rem"
---

# Design System: Vincenzo Barbuto — Edge Aurora

## 1. Overview

**Creative North Star: "Edge Aurora"**

A polar atmosphere captured in code. The canvas is near-black void. Above it, three soft-edged blobs — Deep Indigo, Neon Orchid, Cyber Cyan — drift on slow orbits like atmospheric phenomena, blended in screen mode, broken up by a low-opacity grain that prevents banding. Cutting through that atmosphere is one sharp signal: Lab Emerald. It is the only saturated color allowed to *do work*. Everything else is glass, type, and dark surface.

The register is brand: the portfolio's design IS the product. The personality is technical, futuristic, and bold — but disciplined. Futurism comes from material and motion (glass, parallax, scroll reveals, rotating instrument rings) and never from neon clichés. The aurora and the emerald do all the atmospheric work; the rest of the surface stays editorial-quiet so research content can read at full weight.

This system explicitly rejects every common portfolio cliché called out in PRODUCT.md: plain academic CV pages, Bootstrap-template portfolios, cyberpunk / heavy neon, and marketing-agency overload. It is none of those. It does not look like it picked a theme.

**Key Characteristics:**
- Dark canvas (near-black, tinted toward indigo); aurora atmosphere lives behind everything.
- One signal color (Lab Emerald) carrying ≤15% of any screen; aurora hues never appear as UI states.
- Two-typeface system: **Bricolage Grotesque** carries display and body via weight contrast; **Geist Mono** carries eyebrow labels, badges, and tabular metadata.
- Glass surfaces (`backdrop-filter: blur(14–24px)`) with hairline 1px borders; never solid panels.
- Spotlight hover (radial Lab Emerald gradient following cursor) is the canonical interaction signature.
- Motion is purposeful: rotating ring at hero, scrolling tech marquee, scanline overlay on portrait hover, magic-pill navigation. No scroll-jacking.

## 2. Colors

The palette is a near-black void carrying one signal accent and three atmospheric supports. Roles are strict: Lab Emerald is the only color that ever *means* something in UI; the aurora trio (Indigo / Orchid / Cyan) exists only as ambient atmosphere.

### Primary
- **Lab Emerald** (`#10b981`, `oklch(70% 0.165 162)`): The single signal color. Used for links, primary CTAs, focus rings, badges, eyebrow dots, hover halos, the logo's accent letter. The "instrument light" in the laboratory metaphor.
- **Lab Emerald Bright** (`#34d399`): Hover state and active-link color. Slightly elevated brightness over the base.

### Secondary (atmospheric — non-UI)
- **Deep Indigo** (`#6366f1`): Top-left aurora blob. Never used for text, buttons, or borders.
- **Neon Orchid** (`#ec4899`): Bottom-right aurora blob. Never used in components.
- **Cyber Cyan** (`#38bdf8`): Center aurora blob, removed on mobile. Never used in components.

### Tertiary
- **Plasma Violet** (`#8b5cf6`): Reserved. Available for future taxonomy needs (e.g. publication-type tagging) but currently unused.

### Neutral
- **Void 0** (`#05060a`): Deepest background, used behind heavy glass elements (hero, modals).
- **Void 1** (`#0a0b12`): The default page background; the canvas the aurora floats above.
- **Void 2** (`#12131c`): Slightly elevated surface tint, used for sectioned bands (marquee section).
- **Surface Glass** (`rgba(18, 20, 32, 0.55)`): The glass surface that carries every card, chip, and pill. Always paired with `backdrop-filter: blur(14–24px)`.
- **Hairline** (`rgba(255, 255, 255, 0.08)`): Default border. **Hairline Strong** (`rgba(255, 255, 255, 0.14)`): elevated borders (mobile nav drawer, modals).
- **Text Primary** (`#f5f7fb`): Headings and emphasis. **Text Secondary** (`#c8ccd6`): body. **Text Muted** (`#8a8f9d`): meta, labels. **Text Faint** (`#5c6170`): rare hint usage.

### Named Rules
**The One Signal Rule.** Lab Emerald is the only saturated color that ever appears in interactive UI. Aurora hues live exclusively in the global atmospheric layer — never as buttons, badges, links, chips, focus rings, borders, or text. If a new surface needs a non-emerald accent, the answer is no.

**The No Pure White, No Pure Black Rule.** Surfaces and text are tinted toward indigo at low chroma; `#000` and `#fff` are forbidden. The neutral system carries trace warmth/coolness so the canvas reads as atmosphere, not vacuum.

**The 10% Emerald Rule.** Lab Emerald carries no more than ~10–15% of any single viewport. It is the rarest color on screen by design; rarity is what makes it read as signal.

## 3. Typography

**Display / Body Font:** Bricolage Grotesque (with system-ui, sans-serif fallback)
**Label / Mono Font:** Geist Mono (with ui-monospace, monospace fallback)

**Character:** One committed variable sans plus one mono. Bricolage Grotesque is a recently-released variable typeface with subtle inktraps, an optical-size axis, and a width axis. Its character reads as machined and engineered without slipping into editorial-magazine drama or generic geometric-sans monoculture. Geist Mono carries instrument-label texture on every wide-tracked uppercase eyebrow, badge, and pill metadata. Together: display and body inside one family with strong weight + size contrast, monospace surfacing only where the system signals "calibration sticker" rather than continuous prose. Both fonts deliberately avoid the reflex-reject list (Inter, Space Grotesk, Outfit, DM Sans, Plus Jakarta Sans, Instrument Sans, IBM Plex) called out in brand register guidance.

### Hierarchy
- **Display** (Bricolage Grotesque, weight 700, `clamp(3rem, 5vw + 1rem, 5.25rem)`, line-height 1.1, tracking `-0.03em`): Hero name; absolute attention.
- **Headline** (Bricolage Grotesque, weight 700, `clamp(2.5rem, 4vw + 1rem, 4rem)`, line-height 1.2, tracking `-0.02em`): Section titles ("About Me", "Recent Publications").
- **Title** (Bricolage Grotesque, weight 700, `1.375rem`, line-height 1.3): Card titles, featured project headline.
- **Body** (Bricolage Grotesque, weight 400, `1rem`, line-height 1.6, max-width 65ch): All prose. `text-wrap: pretty` for orphan control. Bricolage's optical-size axis carries the family naturally from display down to body weight.
- **Label** (Geist Mono, weight 600, `0.75rem`, line-height 1, tracking `0.18em`, UPPERCASE): Hero eyebrow, featured badge, Scholar source line, tabular-numeric metadata. The literal instrument label.

### Named Rules
**The Hero Eyebrow Rule.** Every hero or major surface opens with a Geist Mono label-styled eyebrow (uppercase, wide-tracked, optionally with a pulsing emerald dot). It anchors the page in the laboratory register and gives every hero the same diagnostic posture.

**The 65ch Body Rule.** Long-form paragraphs never exceed 65ch (`max-width: 65ch`). Bio, abstracts, descriptions all observe this; the research content is meant to be read, not skimmed across full-width tracks.

**The Heading Balance Rule.** All headings use `text-wrap: balance` and tight tracking. No widow words, no slack tracking on large display. Bricolage's inktraps are visible at display size; let them be the texture, do not undermine them with letter-spacing.

**The Mono For Labels Only Rule.** Geist Mono never sets body prose. Its job is short uppercase tracked labels and tabular numerics (Scholar metrics). Long-form mono is forbidden — it crosses into terminal-aesthetic territory PRODUCT.md rejects.

## 4. Elevation

Depth in this system is conveyed by **glass + ambient halos**, not solid drop shadows. Every elevated surface uses `backdrop-filter: blur(14–24px)` against the dark canvas; the aurora visibly filters through, which is the point. Shadow tokens exist but their role is atmospheric (deep ambient diffusion under cards), not structural. The signature elevation gesture is the **emerald halo on hover** — a soft Lab Emerald glow that appears under a card or button on interaction, reinforcing the "instrument lit up" metaphor.

### Shadow Vocabulary
- **`--shadow-1`** (`0 1px 2px rgba(0,0,0,0.35)`): hairline lift, used inside dense components for separation.
- **`--shadow-2`** (`0 10px 30px -12px rgba(0,0,0,0.55)`): default card and button rest shadow; ambient, never harsh.
- **`--shadow-3`** (`0 30px 60px -20px rgba(0,0,0,0.7)`): deep hero/modal shadow.
- **`--shadow-accent`** (`0 18px 40px -12px rgba(16,185,129,0.35)`): the emerald halo. Appears only on hover/focus of primary CTAs and featured cards. Never at rest.

### Named Rules
**The Halo-Not-Outline Rule.** Hover elevation is communicated by emerald *halo* (`box-shadow: var(--shadow-accent)`) plus a subtle Y-translate (`-2px` to `-6px`), never by border thickening or color flips. The halo is the affordance.

**The Glass-Behind-Glass Ban.** Glass surfaces never stack. Nested cards, glass-inside-glass containers, blur-on-blur — all forbidden. Glass is reserved for top-level surfaces (nav, cards, hero pills); inner elements are flat against that glass.

## 5. Components

Components in this system feel **milled from a single material** — each is a precise glass instrument with consistent radius vocabulary (pills for control surfaces, large rounds for content cards) and a consistent emerald-halo interaction language. No card has a distinct visual identity from the others; the family resemblance is the system.

### Buttons
One canonical system in `globals.css` (`.btn` family). All buttons are pills (`border-radius: 9999px`); square buttons are forbidden. Three variants:

- **Primary** (`.btn .btn--primary`): Lab Emerald (`#10b981`) fill with near-black text (`#04120c`) for contrast. Padding `0.85rem 1.6rem`. On hover: brightens to Lab Emerald Bright (`#34d399`), `translateY(-2px)`, `--shadow-accent` halo blooms. Used for primary CTAs (e.g. footer "Get in Touch").
- **Ghost** (default `.btn` or `.btn .btn--ghost`): Glass background (`rgba(255,255,255,0.06)`) with hairline border, `blur(14px)`. On hover: background shifts to emerald-tinted glass, border picks up emerald at ~45% opacity, same `-2px` lift and halo. Default secondary affordance across the site.
- **Hero** (`.btn .btn--hero`): Heavier-glass variant tuned to sit over the aurora background. Brighter glass (`rgba(255,255,255,0.08)`), brighter border (`rgba(255,255,255,0.22)`), `blur(20px)`, slightly larger padding (`0.95rem 2.2rem` and `1.05rem` font-size). Used exclusively on the hero CTA where the button overlaps the live aurora blobs and needs more material weight to remain legible.

Per-route module CSS must not redefine buttons. If a surface needs a treatment that doesn't fit `.btn` + a modifier, add the modifier to globals.css.

### Status Pill (signature)
A small dark glass pill (`rgba(20,20,30,0.6)`, `backdrop-filter: blur(20px)`) with a pulsing Lab Emerald Bright dot (`8px` circle, multi-layered emerald `box-shadow` glow, 1.5s blink). Acts as a "researcher status" indicator. Width `max-content`, padding `0.5rem 1.2rem`.

### Cards / Containers
- **Corner Style:** `--radius-lg` (1.25rem) for preview cards; `--radius-xl` (1.5rem) for featured cards. Never less than 0.875rem on any content surface.
- **Background:** Surface Glass with `backdrop-filter: blur(14px)`.
- **Shadow Strategy:** `--shadow-2` at rest, transitions to ambient depth + emerald halo on hover (see Elevation).
- **Border:** Hairline (`rgba(255,255,255,0.08)`) at rest; warms toward Lab Emerald on hover.
- **Internal Padding:** `1.5rem` for preview cards; `3.5rem 4rem` for featured cards (mobile collapses to `2.5rem`).
- **Spotlight (signature):** Every interactive card (`SpotlightLink`) carries a radial Lab Emerald gradient that follows the cursor (`--spot-x` / `--spot-y` CSS variables updated via `mousemove`). The gradient is invisible at rest and fades in on hover. This is the canonical interaction.

### Chips / Tags
Soft Lab Emerald tint background (`rgba(16,185,129,0.16)`), Lab Emerald text, pill shape. Two sizes: default (`0.5rem 1rem`, fs-sm) for interest lists; `tagSm` (`0.25rem 0.75rem`, fs-xs) for publication tags. No borders; the tinted fill alone carries the affordance.

### Inputs / Fields
Limited surface area in this site (contact form only). Style: glass background, hairline border, pill or rounded-md corner depending on density. Focus state: `outline: 2px solid var(--accent-bright)` with `3px offset` and `6px radius` per global rule.

### Navigation
- **Style:** Floating pill (`border-radius: 9999px`) container, transparent at top of page, transitions to dark glass (`rgba(5,5,10,0.95)`, `backdrop-filter: blur(24px)`, hairline border) when scrolled. Width capped at 900px, centered.
- **Logo:** Space Grotesk 700, with the final letter colored Lab Emerald.
- **Links:** Space Grotesk 500, `--fs-sm`, muted color, with a Framer Motion "magic pill" (`layoutId`) that animates between active links — a soft emerald-tinted pill (`var(--accent-soft)` background, inset emerald hairline ring).
- **Mobile:** Hamburger toggle; drawer slides under the nav with `--bg-1` solid background, hairline border, large round corner.

### Marquee (signature)
Infinite horizontal scroll of technology chips (Next.js, React, TypeScript, …) at 40s linear loop. Each chip is a glass pill with a hover state that brightens to Lab Emerald tint and `scale(1.05) translateY(-2px)`. Mask gradient on the container edges (`linear-gradient(to right, transparent, black 10%, black 90%, transparent)`) prevents hard cuts. `prefers-reduced-motion` disables animation.

### Featured Card (signature)
Split-grid (`1.2fr 1fr`) premium card with content on the left and a large image visual on the right. Uppercase emerald badge in the corner ("HIGHLIGHTED"), title in Space Grotesk 700 at 2.2rem, body in Outfit at 1.125rem with `max-width: 95%`. Hover lifts `-6px`, expands the spotlight radial to 700px, scales the image `1.05`. The system's most ambitious card.

### Hero Rotating Ring (signature)
A circular SVG with text along the path (researcher tagline) wraps the profile portrait at 120% scale, rotating at `20s linear infinite`. Portrait sits inside a glass-bordered circle with `filter: contrast(1.1) brightness(0.9)` for a cinematic grade. On hover, a digital scanline overlay (Lab Emerald lines + scrolling band) animates over the portrait at 3s linear. The single most distinctive visual signature of the site.

### Timeline (about section)
Vertical rail (`border-left: 2px solid var(--card-border)`) with `0.75rem` Lab Emerald dots offset to the left of each entry, ringed with a 2px background-color border so the dot reads as a punched-out marker. Used exclusively for the education timeline; do not generalize to other vertical lists.

## 6. Do's and Don'ts

### Do:
- **Do** make Lab Emerald (`#10b981`) the only saturated color in interactive UI; reserve aurora hues (Indigo, Orchid, Cyan) for the global atmospheric background only.
- **Do** keep Lab Emerald to ~10–15% of any single viewport. Rarity is what makes it read as signal.
- **Do** use glass surfaces (`backdrop-filter: blur(14–24px)`) for every card, pill, and nav container; pair with hairline borders (`rgba(255,255,255,0.08)`).
- **Do** signal hover with an emerald halo (`--shadow-accent`) plus a small Y-translate (`-2px` to `-6px`). The halo is the affordance.
- **Do** open every hero or major section with a wide-tracked uppercase Space Grotesk label (`letter-spacing: 0.22em`, weight 600, `fs-xs`), optionally with a pulsing emerald dot.
- **Do** cap body paragraphs at `max-width: 65ch` and use `text-wrap: pretty` on prose, `text-wrap: balance` on headings.
- **Do** use the `SpotlightLink` cursor-tracking radial as the canonical interactive card pattern.
- **Do** honor `prefers-reduced-motion: reduce` — disable blob animations, marquee, scanline overlay, rotating ring.
- **Do** use ease-out cubic-bezier curves (`cubic-bezier(0.16, 1, 0.3, 1)`) for entrances; no bounce, no elastic.

### Don't:
- **Don't** use pure `#000` or `#fff` — the neutral system is tinted toward indigo at low chroma. Pure black/white reads as printer output, not atmosphere.
- **Don't** introduce a second saturated UI color. If a new state seems to need violet or cyan, design with weight, scale, or glass tint instead.
- **Don't** stack glass on glass. Nested cards, glass-inside-glass containers, blur-on-blur — all forbidden. One glass surface per stacking context.
- **Don't** use `background-clip: text` gradients on headings or anything else. (Note: the current hero highlight uses a white-to-light-gray gradient on `.spatialHighlight` — this is borderline and should be retired in the next iteration in favor of solid `Text Primary`.)
- **Don't** use side-stripe borders. `border-left` is reserved for the education timeline rail; never use a `border-left` or `border-right` >1px as a colored accent on cards, callouts, or alerts.
- **Don't** make this look like a plain academic CV page (Times New Roman bullet lists, no motion, beige). PRODUCT.md rejects this register explicitly.
- **Don't** make this look like a Bootstrap-template portfolio (hero-photo-left text-right, identical card grids, "I picked a theme" SaaS landing tropes). PRODUCT.md rejects this register.
- **Don't** push toward cyberpunk / heavy neon (glitch effects, terminal-green-on-black, matrix rain, scanline aesthetic as a constant rather than a hover gesture). The Lab Emerald glow stays restrained; the scanline appears only on portrait hover and only briefly.
- **Don't** push toward marketing / agency overload (scroll-jacking, every-section-an-animation, conversion-funnel polish, hero-metric template). This is a research portfolio, not a product launch page.
- **Don't** use a "big number + small label + supporting stat + gradient accent" SaaS hero metric block anywhere. The Scholar stats widget is the exception; do not generalize it.
- **Don't** wrap text in containers reflexively. Most content sections use a centered `1000px` container; nested sub-containers are usually wrong.
- **Don't** animate CSS layout properties (`width`, `height`, `top`, `left`). Animate `transform`, `opacity`, `filter` only.
- **Don't** use em dashes in copy. Use commas, colons, semicolons, periods, or parentheses.
