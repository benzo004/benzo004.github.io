# Architecture Patterns

**Domain:** Minimal & editorial restyle of an existing React/Vite/TS/Tailwind single-page portfolio (brownfield, mobile-first)
**Researched:** 2026-06-16
**Confidence:** HIGH (grounded in the actual codebase; verified against `tailwind.config.js`, `globals.css`, `PortfolioPage.tsx`, `HeroSection.tsx`, `LiquidEther.tsx`, `package.json`)

This document is a **refactor plan inside the existing component tree**, not a rebuild. It answers: where design tokens live, how the type/spacing system is built, how to rework the hero after removing the slider, what responsive strategy to use, which component boundaries to refactor vs keep, and how to gate heavy animation by device — plus a dependency-ordered build sequence.

---

## Recommended Architecture

The existing tree is sound. The restyle is achieved by **(1) consolidating the styling layer into a single token source, (2) inverting one piece of page state (`showLanding`), and (3) inserting one device-capability abstraction**. Everything else (sections, data layer, i18n, ProgressNav, Footer) is restyled in place.

```text
src/
├── styles/
│   └── globals.css            # SINGLE token source: :root CSS custom properties
│                              #   (colors, type scale, spacing, radii) + base resets
├── tailwind.config.js         # Theme maps Tailwind names -> the CSS vars above
│                              #   (fontSize scale, spacing, colors). NO hardcoded hex.
├── hooks/                     # NEW dir
│   ├── useMediaQuery.ts       # NEW: reactive matchMedia (SSR-safe-ish, resize-aware)
│   └── useDeviceCapability.ts # NEW: derives {heavyAnimationsEnabled} from viewport +
│                              #   prefers-reduced-motion + (optional) deviceMemory/cores
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx        # REFACTOR: editorial landing, no slider, real content
│   │   ├── TaglineSection.tsx     # RESTYLE in place
│   │   ├── ExperiencesSection.tsx # RESTYLE in place
│   │   ├── ProjectsSection.tsx    # RESTYLE in place (re-evaluate ScrollStack on mobile)
│   │   ├── CertificationsSection.tsx
│   │   ├── EducationSection.tsx
│   │   └── ToolboxSection.tsx
│   ├── layout/
│   │   ├── ProgressNav.tsx    # RESTYLE; logic stays (showNav/dimmed/hidden)
│   │   └── Footer.tsx         # RESTYLE in place
│   ├── ui/
│   │   ├── SectionTitle.tsx   # KEEP this one; DELETE root-level duplicate
│   │   ├── Card.tsx           # RESTYLE -> editorial card primitive
│   │   └── ...                # restyle as needed
│   ├── LiquidEther.tsx        # KEEP; now mounted conditionally via capability gate
│   └── BackgroundFX.tsx       # NEW (optional): thin wrapper that gates LiquidEther
│                              #   and renders a static/CSS fallback otherwise
└── pages/
    └── PortfolioPage.tsx      # REFACTOR: remove showLanding gate + AnimatePresence
                               #   landing/portfolio swap; hero becomes first section
```

### Component Boundaries

| Component | Verdict | What changes |
|-----------|---------|--------------|
| `PortfolioPage` | **Refactor (small but central)** | Remove `showLanding` state, `handleUnlock`, `handleLock`, and the `AnimatePresence` landing↔portfolio swap. Hero renders inline as the first child of `<main>`. Keep scroll/footer-observer effects (fix the retry-loop while here). |
| `HeroSection` | **Refactor (largest UI change)** | Delete `SlideToBegin` + `onStart` prop. Render real editorial content (name / title / value proposition) using the type scale. Keep `<section id="home">`. WebGL becomes optional via `BackgroundFX`. |
| 6 content sections | **Restyle in place** | Apply tokens/type scale/spacing utilities. No structural change. Data flow (`useLanguage()` + JSON import + `.map`) is untouched. |
| `ProgressNav` | **Restyle, keep logic** | Its `showNav/showHireMe/showLanguages/dimmed/hidden` props now derive purely from scroll (no landing gate). Visuals -> editorial. |
| `Footer` | **Restyle in place** | `onBackToTop` no longer re-locks; it just scrolls to top. Keep DecryptedText if it survives the "one signature moment" rule. |
| `ui/SectionTitle` (in `ui/`) | **Keep, dedupe** | Make canonical; delete root-level `src/components/SectionTitle.tsx`. |
| `ui/Card`, badges, tabs | **Restyle** | Adopt token-driven styling; structure unchanged. |
| `LiquidEther` | **Keep as-is internally** | No edits to the Three.js core. Mount/unmount + `pause()`/`dispose()` are driven from outside via the capability gate. |
| `LanguageContext`, `src/data/*.json` | **Keep untouched** | Constraint: bilingual + static JSON preserved. Restyle never touches the data/i18n layer. |
| `pages/LandingPage.tsx`, root `SectionTitle.tsx`, `Header.tsx` (unused) | **Delete** | Dead code; removing reduces confusion during restyle. |

---

## Where Design Tokens Live (the central decision)

**Recommendation: single source of truth = CSS custom properties in `:root` (`globals.css`), surfaced to utilities through `tailwind.config.js`.** Author components with **Tailwind utility classes**, never raw hex.

### Why this split (CSS vars as source, Tailwind as the interface)

- The project **already** uses this pattern for shadcn colors (`--background`, `--foreground`, `hsl(var(--…))`). Extending it is consistent, not a new paradigm. [HIGH — observed in `globals.css`/`tailwind.config.js`]
- CSS variables are the runtime token store (themeable, inspectable, reusable in raw CSS like `.pearl-button`); Tailwind theme keys are the **typed, autocompleted authoring surface**. You get one value, two consumption paths, zero drift.
- Stack is **Tailwind v3.4** (`package.json`), so the v4 `@theme` directive is NOT available. The v3 idiom is `theme.extend` referencing `var(--token)`. Do not assume v4 syntax. [HIGH]

### Current problems this fixes (all observed in the codebase)

1. **Hardcoded hex scattered everywhere**: `#F8F5F2`, `#0A0A0A`, `#1B365D`, `#273db0`, `highlight: '#E6DED3'` live directly in `globals.css` component utilities, the Tailwind config, and `HeroSection`. These bypass the token system and must be migrated into vars.
2. **Duplicate / conflicting `@layer base`**: `globals.css` sets `body { background-color: #F8F5F2 }` near the top AND `body { background-color: hsl(var(--background)) }` at the very bottom. Collapse to one.
3. **`body { zoom: 0.9 }` at `min-width:768px`** — a global hack that fights a real responsive type/spacing scale. Remove it and let the type scale do the work; otherwise every breakpoint calculation is off by 10% and mobile-first sizing is unpredictable.

### Token layering

```text
:root (globals.css)            → raw values: --color-ink, --color-paper, --color-accent,
                                  --space-*, --text-* (size+line-height pairs), --radius-*
        │
        ▼
tailwind.config.js (extend)    → colors.ink → var(--color-ink); fontSize.display → [var,...];
                                  spacing.section → var(--space-section)
        │
        ▼
components                     → className="text-ink bg-paper px-section text-display"
raw CSS utilities (.pearl-…)   → var(--color-accent) directly (no hex)
```

Keep a **single accent**. Minimal & editorial = restrained palette (paper / ink / one accent + a muted tone). The current `chart-1..5` rainbow vars are unused noise — leave or prune, but do not introduce more colors.

---

## Typography & Spacing System

This is the heart of "editorial." The wow is type + space, so the scale is a first-class deliverable, not ad-hoc per component.

### Type scale — define once, in the theme

The codebase already gestures at this with `.text-section` and `.text-body` component utilities and breakpoint-stepped font sizes. **Formalize it into a named scale** rather than re-declaring sizes per component:

| Token | Role | Mobile → Desktop intent |
|-------|------|--------------------------|
| `display` | Hero name / signature line | large, tight tracking, `Clash Display` |
| `h1`/`h2`/`h3` | Section + card titles | stepped, editorial weight |
| `body` | Paragraph (`Inter`) | ~1.125rem / line-height 1.6–1.75 |
| `caption`/`mono` | Metadata, dates, labels | small, possibly mono |

Implementation choices, pick one and apply uniformly:
- **(A) Tailwind `fontSize` keys** mapping to `[size, { lineHeight, letterSpacing }]` tuples — preferred; gives `text-display` etc. with autocomplete.
- **(B) `clamp()`-based fluid type** in CSS vars (e.g. `--text-display: clamp(2.5rem, 8vw, 6rem)`) consumed by a Tailwind key. **Recommended for the hero/display sizes** because it removes breakpoint stair-stepping and reads as genuinely fluid/editorial on every device. Use clamp for display/headings, fixed steps for body. [MEDIUM — clamp is well-supported and idiomatic; exact stops are a design-phase decision]

Two fonts already loaded: **Clash Display** (display/headings) + **Inter** (body). That pairing is appropriate for editorial; keep it. Fonts load via Google/Fontshare `@import` in CSS — consider `<link rel=preconnect>` / self-hosting via the already-installed `@fontsource/*` packages to cut render-blocking on mobile (perf is a hard constraint).

### Spacing system

Adopt a **single spacing rhythm** keyed in the theme (e.g. a 4/8px base with named steps `space-section`, `space-block`, `space-inline`). The project already has `.section-spacing` and `.container-minimal` with breakpoint-stepped padding — **promote these into theme tokens** (`spacing.section`, a `container` config or `max-w-content` token) so sections compose `py-section` / `container-minimal` consistently instead of re-typing media queries.

Editorial layout leans on **generous whitespace + a constrained measure** (max line length ~60–75ch for body). Add a `max-w-prose`-style token for text blocks.

---

## Hero / Landing Refactor (after removing the slider)

### Current data flow (to be removed)

`PortfolioPage` holds `showLanding=true`; `HeroSection` is a **fixed full-screen overlay** (`fixed inset-0 z-30`) containing only the WebGL background + the `SlideToBegin` control. Dragging the slider to ≥0.95 fires `onStart → handleUnlock → setShowLanding(false)`, and `AnimatePresence` swaps the overlay out and the portfolio `<main>` in. Notably, the hero's content `motion.div` is **currently empty** — there is no name/title rendered yet. So the editorial hero is effectively a new content build inside an existing shell.

### Target data flow (direct access, zero friction)

```text
PortfolioPage  →  <main>
                    ├── HeroSection      (normal in-flow section, first child)
                    ├── TaglineSection
                    ├── … sections …
                    └── Footer
```

Concrete changes:
1. **Delete page-level gating**: remove `showLanding`, `handleUnlock`, `handleLock`, and the `AnimatePresence mode="wait"` landing/portfolio branch in `PortfolioPage`. There is no overlay anymore — the hero is just the first section in the scroll flow.
2. **Hero becomes in-flow**: change `HeroSection` from `fixed inset-0 z-30` to a normal `min-h-[100svh]` (use `svh`, not `vh`, to dodge mobile browser-chrome jump) section. Drop the `onStart` prop and the entire `SlideToBegin` subcomponent.
3. **Render real content**: name / title / one-line value proposition using `text-display`/`h2`/`body`, pulled through `useLanguage()` (`t(...)`) to preserve FR/EN. This is where the **single signature animated moment** lives (e.g. one staggered reveal of the name, or one DecryptedText pass) — `heroVariants`/`ctaVariants` already exist and can be reused/trimmed.
4. **ProgressNav simplification**: its visibility props previously keyed off `!showLanding`. Now derive them purely from scroll position (e.g. nav appears after hero, dims at footer). The existing scroll/IntersectionObserver effect already computes `showProgressBar` and `isFooterVisible` — keep it, drop the `showLanding` short-circuit.
5. **Footer `onBackToTop`**: keep, but it now only smooth-scrolls to top (no `setShowLanding(true)` re-lock).

### Side effects to verify after un-gating

- The footer-observer effect currently depends on `[showLanding]`. After removal it should run once on mount. **Fix the retry-loop anti-pattern** (recursive `setTimeout` with no max) at the same time — guard with an unmounted flag or a retry cap, or move observation into the Footer itself.
- Without the overlay, the WebGL background (if kept on desktop) now sits behind a real, scrollable hero — confirm z-index/contrast (the existing `bg-black/20 backdrop-blur` scrim helps text legibility).

---

## Responsive Strategy: breakpoints (mobile-first), container queries only where they earn it

**Recommendation: stay breakpoint-driven and mobile-first as the default; reach for container queries only for genuinely context-reusable card components.**

### Why breakpoints, not container queries, as the baseline

- This is a **single-column editorial scroll**, not a dashboard of nested resizable panels. Sections span the viewport; their layout is a function of the viewport, which is exactly what media-query breakpoints model. Container queries solve "this card lives in a sidebar OR a grid and must adapt to its slot" — a problem this layout mostly doesn't have. [HIGH — reasoning from layout shape]
- The codebase is **already** mobile-first with Tailwind `sm:/md:/lg:` prefixes throughout (per CONVENTIONS.md). Continuing that is the lowest-friction, most maintainable path; mixing paradigms adds cognitive load for little gain.
- Tailwind v3.4 does **not** ship container queries by default — they require the `@tailwindcss/container-queries` plugin. Adding a dependency + new mental model is only justified where it removes real duplication. [HIGH]

### Where container queries DO earn their place (optional, scoped)

If a **card primitive** (e.g. project card, certification card) must look right both in a 1-col mobile stack and a 2–3-col desktop grid, a container query (`@container`) lets the card style itself by its own width instead of the page breakpoint — fewer per-context overrides. If you go there, add the plugin and apply `@container` to those card wrappers only. Treat it as a targeted optimization in the section-restyle phase, not a foundational decision.

### Mobile-first rules of engagement

- Author base styles for the smallest screen; layer `sm:`/`md:`/`lg:` upward. (Already the convention — enforce it.)
- Replace `100vh` with `100svh`/`100dvh` for the hero to avoid mobile address-bar layout jump.
- **Remove `body { zoom: 0.9 }`** (see tokens) — it silently rescales all breakpoint math.
- Tap targets ≥44px, no hover-only affordances on touch (the slider removal already helps here).
- Performance is a hard constraint: the mobile path should ship the **least** JS/animation (see next section).

---

## Device-Aware Heavy-Animation Loading (clean abstraction)

The WebGL `LiquidEther` (Three.js, Navier–Stokes solver) is the #1 inherited perf risk and the explicit open question (allégé desktop / désactivé mobile / retrait). Architect for **all three outcomes behind one switch** so the design-phase decision is a config change, not a refactor.

### The abstraction: one hook + one wrapper

**`useDeviceCapability()` hook** — the single place that decides whether heavy animation runs:

```text
useDeviceCapability(): { heavyAnimationsEnabled: boolean }
  inputs (all client-side, no backend):
    - matchMedia('(min-width: 768px)')        // viewport / "is desktop-ish"
    - matchMedia('(prefers-reduced-motion: reduce)')  // accessibility — must disable
    - matchMedia('(pointer: fine)')           // mouse present (WebGL is mouse-driven)
    - optional: navigator.deviceMemory, navigator.hardwareConcurrency (low-end signal)
  rule: enabled = isDesktopWidth && finePointer && !reducedMotion && !lowEndDevice
```

Built on a small **`useMediaQuery()`** primitive (reactive to `change`/resize) so the decision updates if the user rotates/resizes. `prefers-reduced-motion` is non-negotiable: the project already has a reduced-motion CSS block — the hook makes that decision reach JS-driven animations too.

**`BackgroundFX` wrapper component** — the only consumer that knows about WebGL:

```text
BackgroundFX:
  const { heavyAnimationsEnabled } = useDeviceCapability()
  if (!heavyAnimationsEnabled) return <StaticBackdrop />   // CSS gradient/paper — cheap
  const LiquidEther = lazy(() => import('@/components/LiquidEther'))  // code-split
  return <Suspense fallback={<StaticBackdrop/>}><LiquidEther … /></Suspense>
```

Why this is clean:
- **Conditional mount, not just hide.** When disabled, `LiquidEther` never mounts → no Three.js init, no rAF loop, no GPU cost. Hiding with CSS would still pay the runtime cost — avoid.
- **Lazy import** keeps the Three.js bundle (`three` is heavy) out of the mobile critical path entirely; it's only fetched when the gate passes. Big mobile-perf win.
- **Lifecycle hooks already exist**: `LiquidEther` exposes `pause()`/`dispose()`/`start()`. Pair the mount/unmount with `dispose()` on unmount; optionally `pause()` when the hero scrolls out of view (IntersectionObserver) to stop the loop while reading lower sections.
- **One switch for three outcomes**: "remove entirely" = `BackgroundFX` always returns `StaticBackdrop`; "desktop only" = the default rule; "lightened everywhere" = pass a reduced `resolution`/`mouseForce` config branch. No component surgery to change strategy.

Apply the **same hook** to gate other heavy effects (ScrollStack/Lenis scroll-hijack in ProjectsSection, DecryptedText) on mobile — render a static or simple-fade alternative when `heavyAnimationsEnabled` is false. This directly serves the "one signature moment, not overload" goal and the hard mobile-fluidity constraint.

---

## Patterns to Follow

### Pattern 1: Token-only styling
**What:** Components reference theme tokens (`text-ink`, `bg-paper`, `px-section`, `text-display`); raw CSS references `var(--…)`. Zero literal hex/px in component className strings.
**When:** Every restyled component.
**Why:** One change point; guarantees visual consistency across the editorial system.

### Pattern 2: Capability-gated heavy effects
**What:** Any GPU/scroll-hijack/long-running animation sits behind `useDeviceCapability()` + lazy import + a cheap fallback.
**When:** WebGL background, ScrollStack, decrypt effects.
**Why:** Mobile fluidity is a hard requirement; respects `prefers-reduced-motion`.

### Pattern 3: In-flow sections, no overlays
**What:** Sections are normal scroll children; navigation/visibility derive from scroll position via IntersectionObserver.
**When:** Hero and all sections post-slider-removal.
**Why:** Zero-friction direct access; simpler state.

## Anti-Patterns to Avoid

### Anti-Pattern 1: Duplicated/parallel token systems
**What:** Hex in components + vars in `:root` + sizes re-declared per component.
**Why bad:** Already causing the `#F8F5F2` vs `hsl(var(--background))` conflict; restyle drift guaranteed.
**Instead:** Migrate all literals into `:root`, expose via Tailwind theme, author with utilities.

### Anti-Pattern 2: `body { zoom }` for responsiveness
**What:** Global `zoom: 0.9` at md+.
**Why bad:** Rescales every breakpoint/size calculation; non-standard; unpredictable on mobile.
**Instead:** A real fluid/stepped type + spacing scale.

### Anti-Pattern 3: Hiding heavy animation instead of unmounting
**What:** `display:none` on WebGL while it keeps running.
**Why bad:** Pays full Three.js/rAF cost on the devices that can least afford it.
**Instead:** Conditional mount + `dispose()` + lazy import.

### Anti-Pattern 4: Unbounded retry loop (inherited)
**What:** Recursive `setTimeout(setupObserver, 100)` with no cap/unmount guard in `PortfolioPage`.
**Why bad:** Potential unbounded polling / leak.
**Instead:** Retry cap or unmounted-flag guard; fix during the page refactor.

## Scalability Considerations

This is a static GitHub Pages portfolio — "scale" means **render performance across device classes**, not user count.

| Concern | Low-end mobile | Mid mobile / tablet | Desktop |
|---------|----------------|---------------------|---------|
| WebGL background | not mounted (static backdrop) | not mounted | mounted, lazy, disposed off-screen |
| Scroll effects (Lenis/ScrollStack) | static/simple fade | simple | full |
| Type scale | fluid `clamp` floor | fluid mid | fluid ceiling |
| Bundle | three.js excluded via lazy gate | excluded | fetched on demand |

---

## Build Order (dependency-driven)

The dependency graph dictates: **tokens before sections, capability hook before any animation gating, page un-gating before/with the hero rebuild.**

1. **Foundation — token & scale consolidation** *(blocks everything visual)*
   - Move all hex/sizes into `:root` CSS vars; wire `tailwind.config.js` theme to them.
   - Define the type scale (`display/h1.../body/caption`) and spacing tokens.
   - Remove `body { zoom: 0.9 }`; collapse the duplicate `@layer base` body block.
   - Delete dead files (root `SectionTitle.tsx`, `LandingPage.tsx`, unused `Header.tsx`); dedupe `SectionTitle`.
   - *Rationale:* every restyle and the hero depend on the scale existing. Doing this first prevents re-touching components twice.

2. **Capability abstraction** *(blocks animation gating + section perf)*
   - Add `hooks/useMediaQuery.ts` + `hooks/useDeviceCapability.ts`.
   - Add `BackgroundFX.tsx` wrapping `LiquidEther` (lazy + fallback), not yet wired into the new hero.
   - *Rationale:* the hero rebuild and mobile section work both consume this; build it before them.

3. **Page un-gating + editorial hero** *(unblocks zero-friction access; depends on 1 & 2)*
   - Refactor `PortfolioPage`: remove `showLanding`/unlock/lock + `AnimatePresence` swap; hero in-flow; fix retry loop.
   - Rebuild `HeroSection`: delete slider, add editorial name/title/value content via type scale + `useLanguage()`, one signature animation, mount `BackgroundFX`.
   - Adjust `ProgressNav`/`Footer` to scroll-derived visibility.
   - *Rationale:* this is the highest-impact UX change and the riskiest state edit; do it once tokens + capability gate exist so the hero is built correctly the first time.

4. **Section-by-section editorial restyle + mobile-first pass** *(parallelizable; depends on 1)*
   - Apply tokens/type/spacing to the 6 sections, Footer, ProgressNav, `ui/Card` & primitives.
   - Mobile-first layout per section; gate ScrollStack/decrypt via the capability hook.
   - Add `@tailwindcss/container-queries` only if a card primitive needs it.
   - Add new experiences (content into `src/data/*.json`) — independent, can slot anywhere.
   - *Rationale:* sections are independent once the scale exists; safe to do in any order / parallel.

5. **Polish & perf verification** *(after the rest)*
   - Font loading (preconnect/self-host via `@fontsource`), `svh`/`dvh` audit, reduced-motion paths, contrast, Lighthouse mobile check against the hard fluidity constraint.

**Data-flow change summary for the roadmap:** removing the slider deletes one piece of page state (`showLanding`) and its `AnimatePresence` branch; the hero moves from a fixed overlay into the normal scroll flow; nav/footer visibility moves from "landing gate" to "scroll position." The i18n layer and JSON data layer are explicitly **unchanged**.

## Sources

- Direct codebase inspection (2026-06-16): `tailwind.config.js`, `src/styles/globals.css`, `src/pages/PortfolioPage.tsx`, `src/components/sections/HeroSection.tsx`, `src/components/LiquidEther.tsx`, `package.json` — [HIGH]
- `.planning/codebase/ARCHITECTURE.md`, `STRUCTURE.md`, `CONVENTIONS.md`, `.planning/PROJECT.md` — [HIGH]
- Tailwind v3.4 theming idiom (CSS vars via `theme.extend`), container-queries-as-plugin, `svh/dvh`, `prefers-reduced-motion`, `deviceMemory`/`hardwareConcurrency`, lazy-import code-splitting — established web-platform/Tailwind knowledge applied to this stack — [HIGH for platform facts; MEDIUM where exact design values are deferred to the design phase]
