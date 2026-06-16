# Project Research Summary

**Project:** Portfolio benzo004 — Refonte minimal & éditorial
**Domain:** Brownfield restyle of a cybersecurity personal portfolio SPA (React/Vite/TS/Tailwind, GitHub Pages)
**Researched:** 2026-06-16
**Confidence:** HIGH

## Executive Summary

This is a brownfield restyle milestone — not a rebuild. The existing React 18 + Vite + TypeScript + Tailwind 3.4 stack is fixed. The goal is to transform an animation-heavy, gated-entry portfolio into a minimal, editorial experience that lets a time-poor corporate executive grasp the profile and be impressed in under 30 seconds, on mobile and desktop. The "wow" must come from refinement — strong typography, generous whitespace, one controlled animated moment — not from overloaded effects. Research is consistent: the biggest lever is ruthless subtraction (drop the unlock slider, consolidate four animation libraries into one, decide the fate of the Three.js background) before adding any polish.

The recommended approach is a dependency-ordered four-phase restyle. Phase 1 establishes the editorial design system and makes the critical WebGL/i18n decisions before anything is torn down. Phase 2 removes the unlock slider and rebuilds the hero as an in-flow editorial section. Phase 3 hardens mobile responsiveness and accessibility across all sections. Phase 4 verifies performance and polishes micro-interactions. The single most impactful stack change is consolidating to `motion/react` only (drop `framer-motion`, GSAP, and Lenis) and replacing or gating `LiquidEther`/Three.js so it never touches the mobile critical path.

The primary risks are: (1) minimalism producing a flat/generic result because the editorial system was not defined before the old effects were stripped — mitigate by locking the type scale, spacing tokens, and palette in Phase 1; (2) the unlock slider removal leaving orphaned scroll-lock and animation state — mitigate by tracing all slider dependencies before deletion; (3) the Three.js background degrading mobile LCP and battery — mitigate by defaulting to CSS/static fallback on mobile with lazy-loaded desktop-only WebGL, or removing it entirely. All three risks have clear prevention strategies; none are blockers if sequenced correctly.

---

## Key Findings

### Recommended Stack

The existing stack is sound; the restyle is achieved by subtraction and consolidation, not addition. The four-animation-library situation (`motion/react` + `framer-motion` + GSAP + Lenis) is the largest bundle and maintenance risk. Consolidating to `motion/react` alone covers every animation need (hero entrance, scroll reveals, hover) with a smaller footprint and the same API as the deprecated `framer-motion` package. GSAP and Lenis should be dropped: GSAP scroll reveals are redundant with `motion`'s `whileInView`, and Lenis smooth-scroll hijacks native mobile momentum, hurts accessibility, and is flagged as a maintenance risk.

Typography is the heart of editorial design and the primary investment. Switching from static font packages to variable fonts (`@fontsource-variable/inter` + one editorial display face) gives fluid weight axes in a single file. The `clamp()`-based fluid type scale encoded as Tailwind `theme.fontSize` tokens eliminates per-breakpoint font juggling and produces smooth scaling on every device. The `body { zoom: 0.9 }` global hack must be removed — it silently corrupts all breakpoint math.

**Core technologies:**
- **Tailwind CSS 3.4** (keep): mobile-first foundation; extend with `clamp()`-based fluid type tokens and CSS custom properties as the single source of truth for all design values.
- **`motion/react` ^12** (keep, consolidate): sole React animation library; replaces both `framer-motion` and covers all GSAP scroll-reveal use cases via `whileInView`.
- **Variable fonts via `@fontsource-variable/*`** (add): self-hosted on Pages origin; one file per family, no CDN latency or FOUT; the primary "editorial wow" investment.
- **`framer-motion`, GSAP, Lenis** (drop): redundant, heavy, and conflict with the minimal/mobile goals.
- **Three.js / LiquidEther** (decide): default to CSS/static fallback (Option B) or desktop-only lazy-gated (Option A); never on the mobile critical path.

### Expected Features

The persona is a time-poor executive who has seen many portfolios. Every feature decision flows from the 30-second scan budget and the principle that refinement is the wow.

**Must have (table stakes):**
- Remove slider-to-unlock — friction #1; blocks the entire 30-second budget before it starts.
- Above-the-fold identity clarity — name + role + value proposition visible without scrolling on the smallest target phone.
- Experience-first section order — strongest proof for this audience goes directly below the hero (promote Experiences above Tagline).
- Full mobile-first responsiveness — hard requirement; every section, tap targets ≥44px, no horizontal scroll.
- Single editorial type hierarchy — 3-level (display / heading / body) with strong size/weight differentiation and generous whitespace.
- Direct contact path — `mailto:` + social links always within reach (header and footer); no form needed.
- FR/EN bilingual preserved throughout — constraint.

**Should have (differentiators):**
- One signature animated moment in the hero (the existing `DecryptedText` decrypt effect is on-theme and far cheaper than WebGL — strong candidate).
- Quiet scroll micro-interactions site-wide (opacity + small translate via `whileInView`; one motion vocabulary).
- `prefers-reduced-motion` support — accessibility and a refinement signal; cheap to implement centrally.
- Simplified persistent navigation / progress affordance for fast section jumps.
- Cohesive cyber-editorial visual motif (grain texture, mono accent) used sparingly.

**Defer (v2+):**
- Contact form (out of scope; no backend).
- Downloadable CV/PDF (out of scope).
- Testimonials (out of scope).
- Blog / cyber news feed (out of scope; large new content surface).

### Architecture Approach

The existing component tree is sound. The restyle is three concrete changes plus a section-by-section styling pass: (1) consolidate all design tokens into CSS custom properties in `:root` (`globals.css`) consumed by Tailwind theme keys — no raw hex in components; (2) invert the page-level `showLanding` gate — hero becomes an in-flow section, not a fixed overlay; (3) add a `useDeviceCapability()` hook + `BackgroundFX` wrapper that conditionally mounts (never just hides) the WebGL background only on capable desktop clients, with lazy import keeping Three.js off the mobile bundle entirely.

**Major components:**
1. **Token layer (`globals.css` + `tailwind.config.js`)** — single source of truth for all colors, type scale, and spacing; blocks all other work; must be built first.
2. **`useDeviceCapability()` hook + `BackgroundFX` wrapper** — capability gate for heavy animation (WebGL, ScrollStack, decrypt effects); the single switch that serves all three WebGL outcome options.
3. **`PortfolioPage` + `HeroSection` refactor** — remove `showLanding` state and `AnimatePresence` landing/portfolio swap; hero becomes first in-flow child of `<main>`; real editorial content (name/title/value line) replaces the empty `motion.div`; fix the unbounded `setTimeout` retry loop.
4. **Six content sections (restyle in place)** — apply tokens, type scale, and spacing utilities; gate ScrollStack/decrypt via capability hook; add new experience entries to JSON.
5. **`ProgressNav` + `Footer` (restyle)** — visibility now derives purely from scroll position, not `showLanding`; `onBackToTop` no longer re-locks.

### Critical Pitfalls

1. **Minimalism reads as empty/generic** — strip the old wow first and the page looks like a Tailwind starter. Prevention: lock the editorial design system (type scale, palette, spacing, "one signature moment" rule) before tearing anything down. Test with real content on a real person within the 30-second budget.

2. **Slider removal leaves orphaned side effects** — scroll-lock, global animation `autoDriver` state, IntersectionObserver retry loop, and `AnimatePresence` all assumed the gate. Deleting only the UI leaves subtle breakage (stuck scroll, never-firing reveals, wrong entry point). Prevention: grep all slider/lock/`autoDriver` consumers; trace and remove each dependency; smoke-test in FR and EN immediately after.

3. **Three.js/WebGL on mobile — battery, heat, context loss, LCP regression** — `LiquidEther` is 1248 lines, ~500KB gzipped Three.js, with incomplete disposal and a continuous 60fps render loop. Running it on mobile phones is a hard perf violation. Prevention: decide in Phase 1 (default: disabled on mobile, CSS fallback); lazy-import on desktop; implement `dispose()` + pause-on-hidden; never in the mobile critical path.

4. **Hero animation gates the LCP element** — if the hero text starts `display:none` or opacity 0 waiting for an entrance animation to fire, the largest contentful paint is delayed and Lighthouse mobile LCP fails. Prevention: animate already-rendered, already-styled text (transform + opacity only); hero text must be in the DOM from first paint.

5. **i18n FR/EN text length breaks tight editorial layouts** — FR strings run ~15–30% longer than EN; editorial layouts tuned to EN will overflow or wrap badly in FR. The existing silent key fallback (`key || key`) masks missing/renamed keys during the restyle. Prevention: design in both languages; use `clamp()`-driven fluid type and flexible containers; add a dev-time missing-key warning during the restyle.

---

## Implications for Roadmap

### Phase 1: Editorial Foundation — Design System & Decisions

**Rationale:** The emptiness pitfall and the i18n silent-fallback pitfall both require decisions and foundations to be established before anything is removed. The type scale, color tokens, and spacing system must exist before any component is restyled, or every restyle will be done twice. The WebGL fate must be decided before Phase 2 builds the hero. This is the highest-leverage phase.

**Delivers:** A unified CSS custom-property token system in `:root` wired to Tailwind theme keys; a `clamp()`-based fluid type scale; the WebGL strategy decision documented; a dev-time i18n missing-key guard; dead code removed (`LandingPage.tsx`, root `SectionTitle.tsx`, unused `Header.tsx`); `body { zoom: 0.9 }` removed; duplicate `@layer base` body block collapsed.

**Addresses:** Table-stakes editorial hierarchy (foundation for all visual work); WebGL decision (unblocks hero build); i18n guard (protects all restyle phases).

**Avoids:** Empty minimalism pitfall, i18n breakage-during-restyle pitfall.

### Phase 2: Hero Rebuild & Unlock Slider Removal

**Rationale:** The slider removal and hero rebuild are tightly coupled — the slider coordinated scroll-locking, animation start, and overlay/portfolio swap. They must be done as one unit of work to avoid the orphaned-side-effects pitfall. This is the highest-risk state change and the highest user-value delivery. Building it after Phase 1 means the hero can be built correctly on the token system the first time.

**Delivers:** `PortfolioPage` with `showLanding` gate removed; `HeroSection` as in-flow section with real editorial content (name/title/value line, FR/EN); one signature animated moment (recommend `DecryptedText` or staggered name reveal); `BackgroundFX` mounting conditionally; `ProgressNav`/`Footer` visibility from scroll; unbounded retry loop fixed; `svh` viewport units on the hero; `prefers-reduced-motion` gate on the hero animation.

**Uses:** `motion/react` LazyMotion + `m` components; `useDeviceCapability()` hook; fluid `text-display` token; `useLanguage()` i18n.

**Avoids:** Wow-hurts-LCP pitfall (animate visible text), slider-removal-baggage pitfall, WebGL-on-mobile pitfall, `100vh` hero cut-off pitfall.

### Phase 3: Section Restyle, Mobile-First Pass & Accessibility

**Rationale:** Section restyling is parallelizable once the token system exists. This phase is also where Lenis, ScrollStack, and remaining motion patterns are resolved. The accessibility and reduced-motion hardening must happen here, not as a QA afterthought.

**Delivers:** All six content sections restyled with token-driven utilities; section order re-prioritized (Experiences above Tagline); `framer-motion`, GSAP, and Lenis removed (`motion/react` only); ScrollStack gated via capability hook or replaced with simple fade; variable fonts replacing static packages; central `prefers-reduced-motion` gate; WCAG AA contrast verified; keyboard focus order validated; decorative canvas `aria-hidden`; new experience entries in JSON; compact certs/toolbox presentation.

**Avoids:** Lenis-vs-mobile pitfall, accessibility/reduced-motion holistically pitfall.

### Phase 4: Performance Verification & Polish

**Rationale:** Validation must happen against the deployed GitHub Pages URL on real mobile hardware. Mobile performance is a hard requirement and several pitfalls (LCP, CLS, memory leaks, font FOIT) are invisible in dev but real on production.

**Delivers:** Lighthouse mobile audit on deployed URL (LCP < 2.5s, CLS < 0.1, a11y ≥ 95); real mid-tier Android validation; Three.js bundle excluded from mobile confirmed; font preload + `font-display: swap` confirmed; memory/interval leak audit; polished hover/focus states; scroll micro-interaction refinements; Vite `manualChunks` for Three.js chunk isolation if desktop WebGL kept.

**Avoids:** Wow-hurts-LCP final verification, WebGL-leaks/memory disposal audit.

### Phase Ordering Rationale

- **Tokens before components:** every restyle and the hero depend on the type/spacing scale; building tokens first avoids touching components twice.
- **Decision before teardown:** the WebGL fate and i18n guard must be decided and built before the slider is removed.
- **Hero/slider as one atomic change:** the slider coordinated scroll state, animation start, and page structure; partial removal causes subtle breakage.
- **Sections after hero state is stable:** section layout depends on the scroll/nav model established by the hero refactor.
- **Performance gate at the end:** validates the cumulative result against the hard mobile-fluidity constraint on the real production URL.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 1:** The editorial design direction (specific font pairing, exact type scale values, palette) requires a design phase with real content samples. The WebGL open decision requires stakeholder/owner input.
- **Phase 2:** If Option A (desktop-only, lazy-gated WebGL) is chosen, `LiquidEther` disposal and context-loss handling are complex enough to warrant a focused implementation spike.

Phases with standard patterns (skip additional research):
- **Phase 3:** Tailwind token-driven section restyle, `motion/react` `whileInView` reveals, and FR/EN layout testing are well-documented patterns.
- **Phase 4:** Lighthouse/WebPageTest mobile profiling, font preload patterns, and Three.js disposal are well-documented. Execution over research.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Grounded in direct codebase inspection + current library docs; version compatibility verified. |
| Features | MEDIUM | Web design best-practice synthesis from multiple sources; no single authoritative source. Core persona behavior (30-second scan, F-pattern) is consistent across sources. |
| Architecture | HIGH | Grounded in direct codebase inspection of `PortfolioPage.tsx`, `HeroSection.tsx`, `LiquidEther.tsx`, `tailwind.config.js`, `globals.css`. Refactor plan is precise. |
| Pitfalls | HIGH | Combines direct codebase audit (`CONCERNS.md`) with cross-checked external sources. Most critical pitfalls are codebase-confirmed, not inferred. |

**Overall confidence:** HIGH

### Gaps to Address

- **Exact editorial design values** (specific font family choice, exact `clamp()` stops, specific palette hex values, spacing scale numeric values): design-phase decisions that must be made with real content samples. Flag for Phase 1 design exploration.
- **WebGL fate (Option A / B / C)**: PROJECT.md explicitly marks this as an open decision. Research defaults to Option B/C for mobile-first minimalism, but the final call requires owner input. Must be resolved at the start of Phase 1 before Phase 2 begins.
- **Exact animation vocabulary** (duration, easing, distance values for the signature hero moment and scroll reveals): design-phase decisions; research establishes the constraints but not the specific values.

---

## Sources

### Primary (HIGH confidence)
- `.planning/codebase/CONCERNS.md`, `ARCHITECTURE.md`, `STRUCTURE.md`, `CONVENTIONS.md` — direct codebase audit; WebGL perf/disposal issues, global anim state, retry loop, i18n silent fallback, bundle composition.
- `.planning/PROJECT.md` — milestone goals, constraints, open decisions, out-of-scope items.
- `src/pages/PortfolioPage.tsx`, `src/components/sections/HeroSection.tsx`, `src/components/LiquidEther.tsx`, `tailwind.config.js`, `src/styles/globals.css`, `package.json` — direct codebase inspection.
- npmjs.com / motion.dev — `framer-motion` → `motion` consolidation.
- Tailwind v3.4 docs — `theme.extend` CSS var pattern, `clamp()` fontSize tokens.
- web.dev / WCAG — `prefers-reduced-motion`, `font-display`, LCP/CLS metrics.

### Secondary (MEDIUM confidence)
- Omniconvert, LogRocket, Prismic — above-the-fold / hero first-impression best practices, F-pattern scanning.
- Webflow, Wix, Codrops — tasteful single-signature motion, restrained micro-interactions.
- DevDreaming, raoulcoutard.com, dev.to — Lenis mobile/reduced-motion/scroll-snap conflicts.
- utsubo.com, discoverthreejs.com, pixelfreestudio, three.js forum — Three.js mobile battery, GPU memory, context loss, disposal.
- openreplay, dev.to — `svh`/`dvh`/`lvh` viewport units, CLS on mobile heroes.
- Webflow, DesignRush, letterhend — minimal vs editorial design principles, typography hierarchy.

---
*Research completed: 2026-06-16*
*Ready for roadmap: yes*
