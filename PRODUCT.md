# Product

## Register

brand

## Users

The site serves four overlapping audiences in a single surface, all arriving with different patience budgets:

- **Academic peers / researchers** — scanning for credibility, publication record, research areas. Will read closely if hooked. Context: desktop, often skimming a Scholar/conference link.
- **Hiring committees and faculty search panels** — evaluating for postdoc, faculty, or grant roles. Want CV, education trajectory, depth of work, signs of independent thought. Context: cross-referencing applications, often in batches.
- **Industry recruiters and engineers** — assessing fit for Edge AI / IoT / Cyber-Physical Systems roles. Want stack, deployable projects, impact. Context: short attention window, deciding whether to reach out.
- **Students and potential collaborators** — looking for teaching materials, talks, contact for collaboration or supervision.

The common job-to-be-done: *"In under 30 seconds, decide whether Vincenzo is worth my deeper attention — and remember him later."* Every surface must read fast to a recruiter and reward a peer who lingers.

## Product Purpose

Personal academic and research portfolio for Vincenzo Barbuto (Research Fellow, DIMES — University of Calabria), surfacing publications, projects, talks, teaching, and experience around Edge AI / Edge Intelligence, Digital Twins, IoT, and Cyber-Physical Systems.

The site exists to convert one-time link clicks into durable memory — a visitor who arrives from a paper, a talk, or a CV should leave with a distinct mental imprint of who this person is and what they work on, distinct enough to recall weeks later when an opportunity, citation, or collaboration arises.

Success looks like: visitors remember the site and share it. Not "convert to contact." Not "engagement minutes." Memorability is the metric.

## Brand Personality

**Technical, futuristic, bold** — but disciplined, not loud.

- **Voice**: confident-expert, never salesy. Plain technical English. Specific over decorative ("intelligent traffic monitoring, emergency vehicle detection") not abstract ("innovative solutions").
- **Visual energy**: high-craft motion and depth (aurora, glass, parallax, scroll-driven reveals) carrying serious research content. The futurism comes from material and motion, not from neon clichés.
- **Emotional goal**: a visitor should feel they have landed somewhere intentional — that the person behind this site cares about craft as much as the research it presents.

## Anti-references

The brief explicitly rejects every common portfolio cliché. The site is none of:

- **Plain academic CV pages** — static, beige, Times-New-Roman bullet lists. Zero design effort visible. The opposite of memorable.
- **Bootstrap-template portfolios** — hero-photo-left text-right, identical card grids, generic SaaS landing tropes. The "I picked a theme" look.
- **Cyberpunk / heavy neon** — glitch effects, terminal-green-on-black, matrix rain, edgelord futurism. Technical and futuristic without ever crossing into sci-fi pastiche.
- **Marketing / agency overload** — scroll-jacking, every-section-an-animation, sales-page polish. No conversion-funnel energy. This is not a product launch page.

The site must read as *its own thing* — recognizably none of the above, and not easily filed under any saturated aesthetic lane (SaaS-cream, terminal-dark, brutalist-grid, editorial-magazine). Distinctiveness is load-bearing.

## Design Principles

1. **Memorability over completeness.** When forced to choose between adding more content and polishing what exists, polish wins. A visitor who remembers three things beats a visitor who saw thirty and remembers none.

2. **Quiet futurism.** Technical and forward-looking without slipping into sci-fi pastiche. Depth, glass, gradient aurora, motion — yes; glitch, scanlines, terminal green, matrix rain — never. Restraint is the differentiator from category-reflex futurism.

3. **Layered depth for layered audiences.** Every surface must answer the 10-second recruiter question (who, where, what they work on) and still reward the 10-minute peer (publications, talks, project depth). No surface is one-altitude-only.

4. **Substance is the artifact.** The research is the work; design frames and elevates it without competing. Hero motion can be ambitious; publication and talk pages must let the content breathe. Never let the chrome out-shine the paper.

5. **Earn every animation.** The futuristic-bold register licenses motion — but every motion must serve hierarchy, focus, or recall. No decoration for decoration's sake; no scroll-jacking; no "look what we can do" interactions.

## Accessibility & Inclusion

- **Target**: WCAG 2.2 AA across all surfaces.
- **Reduced motion**: `prefers-reduced-motion: reduce` already disables blob animations, marquee, and digital overlay; honor this in any new motion work.
- **Contrast**: Dark theme uses tinted neutrals against a near-black background; verify text-on-glass surfaces meet AA contrast (4.5:1 body, 3:1 large text) — current glass card backgrounds with `--text-1` and `--text-2` are borderline and worth auditing.
- **Focus**: visible focus rings on all interactive elements (currently `outline: 2px solid var(--accent-bright)`). Preserve.
- **Color**: emerald accent is the only saturated color carrying semantic meaning; do not rely on color alone to convey state.
