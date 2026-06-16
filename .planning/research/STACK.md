# Stack Research

**Domain:** Minimal & editorial personal portfolio (static React SPA on GitHub Pages) — subsequent restyle milestone
**Researched:** 2026-06-16
**Confidence:** HIGH (core recommendations verified against current docs; brownfield constraints read from codebase)

> Scope note: The base framework (React 18 + Vite + TypeScript + Tailwind 3.4, shadcn/ui, GitHub Pages, FR/EN) is **fixed** and NOT re-litigated here. This document is prescriptive about what to **keep / add / drop** inside that stack to deliver a minimal, editorial, mobile-first, performant restyle. The single biggest lever is **deleting redundant animation libraries**, not adding new ones.

---

## TL;DR Verdict

| Library | Verdict | One-line reason |
|---------|---------|-----------------|
| **Tailwind CSS 3.4** | KEEP | Foundation; add a fluid type scale + editorial tokens |
| **Motion (`motion/react`)** | KEEP, CONSOLIDATE | Single React animation lib; replaces both `framer-motion` + `motion` |
| **`framer-motion` (10.x)** | DROP | Superseded by `motion`; having both ships duplicate code |
| **GSAP + ScrollTrigger** | DROP (default) | Scroll reveals achievable with Motion `whileInView` + CSS; removes a heavy dep |
| **Lenis (smooth scroll)** | DROP | Hijacks native scroll, hurts mobile feel & a11y; native scroll is the editorial choice |
| **Three.js / LiquidEther** | LAZY + CONDITIONAL, or DROP | ~500KB gzip for one background; load only desktop + on-demand, or replace with CSS |
| **shadcn/ui + Lucide** | KEEP | Already minimal, unstyled-by-default, tree-shaken |
| **Variable fonts (self-hosted)** | ADD | One editorial display + one text family; the "wow" of editorial design |

Net effect: smaller bundle, faster mobile, *more* editorial polish with *fewer* moving parts.

---

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Tailwind CSS | 3.4.1 (current) | Styling foundation, responsive utilities | Already in place; mobile-first by default (`sm:`/`md:`/`lg:` are min-width). Add a `clamp()`-based fluid type scale in `theme.fontSize` so headings scale without breakpoint juggling. |
| Motion | `motion` ^12 (already installed) via `motion/react` | All React component animation (hero signature moment, scroll reveals, hover) | Direct successor to Framer Motion; same API, actively maintained, smaller and tree-shakeable. `whileInView` + `LazyMotion`/`m` components cover every animation this site needs. |
| `clamp()` fluid typography | CSS native (Baseline, ~92% support) | Fluid headings/body between mobile and desktop | Eliminates per-breakpoint font sizing — the core technique for editorial type that scales smoothly. Encode as Tailwind tokens. |
| Variable fonts (self-hosted via `@fontsource-variable/*`) | latest | Editorial typography (display + text) | One variable file replaces multiple weights; smaller payload, full weight axis for editorial hierarchy. Self-hosting avoids the FOUT/privacy/latency of Google Fonts CDN and works offline on GitHub Pages. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@fontsource-variable/inter` | ^5 | Body/UI text | Replace the static `@fontsource/inter`. One variable file, full weight axis. Excellent screen legibility for the "30-second read." |
| Editorial display face | see Fonts section | Hero name/title + section headings | The single biggest contributor to "editorial wow." Pick ONE display family (see pairings). |
| `tailwind-merge` + `clsx` | already installed | Class composition | Keep — needed by shadcn/ui patterns. |
| `tailwindcss-animate` | already installed | Small enter/exit utilities (shadcn) | Keep; complements Motion for trivial CSS transitions without JS. |
| `lucide-react` | ^0.562 already | Icons | Keep; tree-shaken, minimal line icons fit editorial aesthetic. |
| `react-intersection-observer` (optional) | ^9 | Viewport detection for lazy WebGL / reveal | Only if you want a small, well-tested IO hook instead of hand-rolling. Motion's `useInView` already covers most cases — prefer it and skip this. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| Vite 5 | Build / code-splitting | Already present. Rely on `import()` + manual `rollupOptions.output.manualChunks` to isolate Three.js into its own async chunk so it never touches the mobile critical path. |
| `vite-plugin-compression` (optional) | Pre-gzip/brotli assets | GitHub Pages serves static files; pre-compressing helps if Pages negotiation isn't ideal. Low priority. |
| Lighthouse / WebPageTest (mobile profile) | Perf budget verification | Mobile fluidity is a hard requirement — measure LCP/TBT on throttled mobile, not desktop. |
| `@axe-core` / Lighthouse a11y | Verify reduced-motion + contrast | Editorial = high contrast + respects `prefers-reduced-motion`. |

---

## Typography (the heart of "editorial")

Editorial design is carried almost entirely by type, hierarchy, and whitespace — invest here over animation.

### Recommended pairing (pick ONE display + Inter for text)

| Role | Recommendation | Why | Fallback pairing |
|------|----------------|-----|------------------|
| Display / headings | **A serif or grotesque display variable font** — top picks: *Fraunces* (variable, opsz+wght, very editorial), *Newsreader* (variable, refined), or keep the existing **Space Grotesk** if a modern-technical-but-warm tone is preferred for a cybersecurity profile | Serif/contrast display faces read as "magazine/editorial"; a strong display face is the wow. Variable = one file, full weight range for big/small contrast. | Space Grotesk (already installed) + Inter |
| Body / UI | **Inter Variable** | Neutral, hyper-legible at small sizes, optical-size aware; ideal for the fast 30-second scan. | system-ui |
| Code / mono (optional accent) | **JetBrains Mono** (already installed) | Only if you want a subtle "cyber" accent on tags/labels — use sparingly. Otherwise DROP to save weight. | — |

**Decision guidance:** For a *minimal & editorial* cyber profile, the strongest move is **Fraunces (display) + Inter (text)** — serif headlines deliver instant editorial credibility and differentiate from the sea of all-sans tech portfolios. If the brand should stay cooler/technical, keep **Space Grotesk + Inter** and lean on size/whitespace for the editorial feel.

### Fluid type via `clamp()` in Tailwind

Encode the scale once so every component is responsive without breakpoints. Example `tailwind.config.js` `theme.extend.fontSize`:

```js
fontSize: {
  // [font-size, { lineHeight, letterSpacing }]
  'display': ['clamp(2.5rem, 1.2rem + 6vw, 5.5rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
  'h1':      ['clamp(2rem, 1.2rem + 3.5vw, 3.5rem)', { lineHeight: '1.08', letterSpacing: '-0.015em' }],
  'h2':      ['clamp(1.5rem, 1.1rem + 1.8vw, 2.25rem)', { lineHeight: '1.15' }],
  'lead':    ['clamp(1.125rem, 1rem + 0.6vw, 1.375rem)', { lineHeight: '1.5' }],
  'body':    ['clamp(1rem, 0.95rem + 0.2vw, 1.125rem)', { lineHeight: '1.65' }],
}
```

Rules of thumb that make it editorial:
- Negative `letter-spacing` on large display sizes; normal/positive on small caps labels.
- Generous `line-height` on body (1.55–1.7); tight on display (~1.0–1.1).
- Constrain measure: `max-w-[65ch]` on prose blocks for readability.
- Whitespace is a feature: use large vertical rhythm (`space-y-*`, section `py-24 md:py-40`).

### Font loading (performance)

- Self-host with `@fontsource-variable/*` (npm) — bundled by Vite, no external request, no CDN privacy issue.
- Set `font-display: swap` (Fontsource default) to avoid invisible text.
- Preload only the one critical display weight used above the fold.
- Variable fonts mean **one file per family** — keep it to two families max (display + text). Drop unused static `@fontsource/*` packages.

---

## Responsive Strategy (mobile-first with Tailwind)

| Concern | Pattern | Notes |
|---------|---------|-------|
| Base = mobile | Author unprefixed utilities for mobile; add `md:`/`lg:` for larger screens | Tailwind breakpoints are min-width → this *is* mobile-first. The current code hardcodes 768/1024px in JS (see CONCERNS.md); migrate those to Tailwind breakpoints / CSS so layout logic is declarative. |
| Fluid spacing & type | `clamp()` tokens for type; `clamp()`/`vw` for hero padding | Reduces breakpoint count, smoother across device sizes. |
| Layout | CSS Grid / Flex via Tailwind; single column on mobile → multi-column `md:grid-cols-2` | Editorial = clear single-column reading flow on mobile. |
| Touch targets | min 44px tap areas; remove hover-only affordances on touch | Replace hover-dependent reveals with always-visible content on mobile. |
| Container | `max-w-screen-lg mx-auto px-6 md:px-10` | Consistent editorial margins. |
| Reduced motion | `motion-reduce:` Tailwind variant + JS `prefers-reduced-motion` check | Hard requirement for a11y and battery. |

---

## Animation: Keep / Drop (be ruthless)

The current stack runs **four** animation systems (Motion + Framer Motion + GSAP + Lenis) plus Three.js. For a *minimal* site, that is the antithesis of the goal and a measurable perf cost.

### KEEP: Motion (`motion/react`) — one library for everything
- Hero "single signature moment" → `motion.h1` with a staggered text/opacity/`y` entrance.
- Scroll reveals → `whileInView={{ opacity: 1, y: 0 }}` + `viewport={{ once: true }}`. Replaces all GSAP ScrollTrigger usage.
- Use `LazyMotion` + `m` components + `domAnimation` feature set to ship the smallest Motion bundle.
- Respect `useReducedMotion()` to gate the signature animation.

### DROP: `framer-motion` 10.x
- It's the *old* package; `motion` (already in deps) is its maintained successor with the identical API (`import { motion } from "motion/react"`). Shipping both duplicates animation code and risks version drift (flagged in CONCERNS.md "Framer Motion Dependency Chain"). Migrate imports, remove `framer-motion`.

### DROP: GSAP + ScrollTrigger
- Heavy (~50KB+) for what is now scroll-reveal + a few floats — all expressible with Motion `whileInView` / CSS scroll-driven animations. Removing it eliminates `ScrollFloat`, `ScrollStack`, `ShinyText` complexity flagged as perf bottlenecks. If one truly bespoke timeline is unavoidable, reconsider — but default is remove.

### DROP: Lenis (smooth scroll)
- Smooth-scroll hijacking fights native momentum on mobile, can cause jank, scroll-anchoring bugs, and a11y issues; it's also flagged as unmaintained-risk in CONCERNS.md. Native scroll is faster, more accessible, and more "editorial-restraint." If a subtle ease is wanted, use CSS `scroll-behavior: smooth` for anchor jumps only.

### DECIDE in design phase: Three.js / LiquidEther background
See dedicated section below — this is the milestone's open question.

---

## WebGL / Three.js Strategy (the open decision)

**Problem (from CONCERNS.md + bundle reality):** Full Three.js is ~500KB gzip for a single liquid background; `LiquidEther.tsx` is 1248 lines, has incomplete resource cleanup, runs a continuous render loop, and is the prime mobile-perf risk. Mobile fluidity is a *hard* requirement.

**Recommendation: tiered, default to Option B; Option A only if the wow is deemed essential on desktop.**

### Option A — Keep on desktop, lazy + conditional (effort: medium)
Use when the liquid background is judged a key desktop differentiator.
1. **Code-split:** wrap in `React.lazy(() => import('./LiquidEther'))` so Three.js lands in its own async chunk, never in the initial bundle. Add a Vite `manualChunks` entry for `three`.
2. **Gate by capability**, render nothing (or a static CSS gradient) when any are true:
   - `window.matchMedia('(max-width: 768px)').matches` (mobile)
   - `navigator.connection?.saveData === true`
   - `window.matchMedia('(prefers-reduced-motion: reduce)').matches`
   - low `navigator.hardwareConcurrency` / no WebGL context
3. **Load on visibility:** mount only when the hero is in viewport (`IntersectionObserver` / Motion `useInView`); dispose on unmount (fix the ResizeObserver + WebGL `dispose()` leaks flagged in CONCERNS.md).
4. Pause the render loop when tab hidden (`visibilitychange`) and when off-screen.

### Option B — Replace background with CSS/SVG (effort: low) ✅ default
Most aligned with *minimal & editorial* and *mobile-first*:
- Replace the liquid WebGL with a **CSS animated gradient / grain / subtle noise**, or a static high-quality gradient with a single restrained Motion fade-in.
- Delivers near-zero JS cost, perfect mobile perf, and an editorial calm that a busy GPU background undermines.
- Removes Three.js (~500KB), `mathjs` (only used by the shader sim — verify, then drop), and all the leak/cleanup risk in one stroke.

### Option C — Drop background entirely (effort: lowest)
Pure whitespace + typography. The most "editorial magazine" outcome; the single signature animation lives in the hero *text*, not the background. Strongest minimalist statement; lowest risk.

> Bias: **Option B or C** best serve the stated Core Value ("wow comes from refinement, not overload" + hard mobile perf). Reserve Option A for desktop-only if stakeholders insist the liquid effect is non-negotiable. In all cases, Three.js must NEVER be in the mobile critical path.

---

## Installation

```bash
# Add: consolidated variable fonts
npm install @fontsource-variable/inter
# + ONE editorial display family, e.g. Fraunces (variable):
npm install @fontsource-variable/fraunces
# (or keep existing @fontsource/space-grotesk if chosen as display)

# Optional (only if not using Motion's useInView):
npm install react-intersection-observer

# Remove redundancy:
npm uninstall framer-motion gsap lenis
# Drop if Option B/C chosen for background (verify usage first):
npm uninstall three @types/three mathjs
# Drop unused static font packages once variables replace them:
npm uninstall @fontsource/inter   # replaced by @fontsource-variable/inter
# (keep or drop @fontsource/jetbrains-mono depending on mono-accent decision)
```

> Verify each `uninstall` against imports before removing (especially `mathjs`/`three` for the WebGL option, and `gsap`/`lenis` which back several existing components). The roadmap should sequence "migrate imports → remove dep" per library.

---

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Motion `whileInView` for reveals | GSAP ScrollTrigger | Only if you need frame-accurate, pinned, multi-element scrubbed timelines — overkill here. |
| Native scroll (+ CSS `scroll-behavior`) | Lenis smooth scroll | Only for a deliberately heavy "agency showreel" feel — conflicts with this site's minimal/mobile goals. |
| CSS gradient / SVG background (Opt B) | Three.js liquid (Opt A) | Desktop-only flagship wow where GPU background is core to brand. |
| Self-hosted `@fontsource-variable/*` | Google Fonts CDN | Rapid prototyping only; CDN adds a request + privacy concerns, no offline guarantee. |
| Fraunces / Newsreader (serif display) | Space Grotesk (sans display) | If brand should read cool/technical rather than literary/editorial. |
| Tailwind `clamp()` tokens | Per-breakpoint `text-* md:text-*` | Fine for a couple of elements; clamp scales better and reduces class noise. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `framer-motion` (10.x) alongside `motion` | Duplicate animation code, version drift (CONCERNS.md) | `motion` via `motion/react` only |
| GSAP + Lenis for a minimal site | Heavy, redundant with Motion + native scroll; perf bottlenecks flagged | Motion `whileInView`, native scroll |
| Full `three` import for one background on mobile | ~500KB gzip, leak-prone, kills mobile LCP/TBT | CSS/SVG background, or lazy+gated desktop-only |
| Multiple static font weights/families | Payload bloat, FOUT | One variable file per family (max 2 families) |
| Hover-only content reveals | Inaccessible on touch / hurts 30-sec scan | Always-visible content; motion as polish, not gatekeeper |
| Slider-to-unlock landing (existing) | Friction #1 for a busy exec (PROJECT.md) | Immediate content; one tasteful hero entrance animation |
| Hardcoded 768/1024 px breakpoints in JS | Imperative, untested, drift from CSS | Tailwind breakpoints + `matchMedia` only where JS truly needed |

## Stack Patterns by Variant

**If "wow" must include a moving background on desktop:**
- Option A (lazy + capability-gated Three.js), CSS gradient fallback on mobile/reduced-motion/save-data.
- Because it preserves the effect for capable clients while guaranteeing mobile fluidity.

**If minimalism is paramount (recommended for stated Core Value):**
- Option B/C: drop Three.js, lean on variable-font typography + whitespace + a single hero text animation.
- Because refinement *is* the wow; fewer deps = faster, more maintainable, more "editorial."

**If brand tone = literary/editorial:**
- Serif display (Fraunces/Newsreader) + Inter body.

**If brand tone = technical/modern:**
- Keep Space Grotesk display + Inter body; carry editorial feel through scale & space.

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| `motion` ^12 | React 18.2 | `motion/react` entry; drop-in for framer-motion 10 API. |
| Tailwind 3.4 | `clamp()` font tokens | Fully supported via `theme.fontSize` array syntax with lineHeight/letterSpacing. |
| `@fontsource-variable/*` ^5 | Vite 5 | Imported in TS entry; bundled & fingerprinted by Vite. |
| Vite 5 `manualChunks` | `three` async chunk | Isolates Three.js so it's never in the initial/mobile bundle. |
| `clamp()` CSS | Target browsers | ~92% global support (Baseline); fine for a modern portfolio audience. |

## Sources

- npmjs.com / motion.dev upgrade guide — `framer-motion` → `motion` consolidation, same API, use `motion/react` — HIGH
- Tailwind docs + fluid-typography articles (Hoverify, stoffel.io, clampgenerator) — `clamp()` font-size tokens, mobile-first breakpoints — HIGH
- Codrops (2025) + Gatsby/Medium Three.js perf guides — lazy-load via `import()`/IntersectionObserver, gate by `max-width`/`saveData`, dispose on unmount — HIGH
- Fontsource docs — self-hosted variable fonts, `font-display: swap` — HIGH (general knowledge, stable)
- `.planning/codebase/STACK.md`, `CONCERNS.md`, `PROJECT.md` — current deps, WebGL/perf/leak concerns, milestone goals — HIGH (read directly)

---
*Stack research for: minimal & editorial static portfolio restyle (brownfield React/Vite/TS/Tailwind)*
*Researched: 2026-06-16*
