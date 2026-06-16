# Pitfalls Research

**Domain:** Minimal & editorial restyle of an animation-heavy bilingual React/Vite/TS/Tailwind portfolio SPA on GitHub Pages (mobile-first, exec-targeted)
**Researched:** 2026-06-16
**Confidence:** HIGH (codebase-grounded + current external sources cross-checked)

> Scope note: this is a **subsequent milestone** on a mapped brownfield codebase. Pitfalls below combine the five redesign risk areas (minimalism, "wow", responsive, hero removal, WebGL/mobile) with the inherited concerns from `.planning/codebase/CONCERNS.md`. Phase names are indicative — the roadmap can rename, but the ordering logic should hold.

---

## Critical Pitfalls

### Pitfall 1: "Minimal" reads as empty/generic, not refined — the wow disappears with the clutter

**What goes wrong:**
The team strips the animations and busy backgrounds, but what is left is centered sans-serif text on white with no hierarchy, no rhythm, no signature. For a target who "has already seen many portfolios," this reads as a template, not a refined executive presence. The Core Value ("repart impressionné en moins de 30s, l'effet wow venant du raffinement") fails silently — nothing is broken, but the impression is flat.

**Why it happens:**
Minimalism is mistaken for *absence* rather than *restraint with intent*. When the old wow (WebGL, slider, scroll effects) is removed first and the editorial system is not yet defined, there is a vacuum. Refinement (type scale, generous-but-intentional whitespace, one strong typeface pairing, deliberate vertical rhythm, restrained accent color) is harder and less obviously "done" than animation, so it gets under-invested.

**How to avoid:**
- Lock a concrete editorial design system **before** removing the old effects: a defined type scale (display/serif for name+title, accessible sans for body), a 4/8px spacing scale, a 2–3 color palette, max line length (~60–75ch), and a stated "one signature moment" rule.
- Define the design with a real content sample (actual name, title, value prop, one experience) — never lorem ipsum — so emptiness is judged against real density.
- Borrow editorial conventions: strong left-aligned hierarchy, a hero "lede" line, section eyebrows, generous but *asymmetric* whitespace. Centered-everything is the generic trap.
- Validate with the 30-second test on a real person/proxy: do they grasp who + what + value before scrolling?

**Warning signs:**
Design mockups feel "clean" but you cannot articulate what makes them memorable; everything is centered; the page looks identical to a default Tailwind starter; reviewers say "nice" but not "impressive."

**Phase to address:** Phase 1 (Design system / editorial direction) — must precede any teardown.

---

### Pitfall 2: Chasing a "wow" moment that hurts LCP/load time or usability

**What goes wrong:**
The "one signature animated moment" grows into something heavy: a custom font flash, a large hero image/video, a JS-driven reveal that delays the largest text element, or a re-introduced WebGL flourish. The hero text (the LCP element) renders late or shifts, and the time-poor exec sees a blank/janky screen during the critical first seconds — the exact opposite of the goal.

**Why it happens:**
The tension named in PROJECT.md (minimalism vs. wow) gets resolved toward spectacle under pressure. Animation libraries already in the stack (Framer Motion, GSAP) make it cheap to add "just one more" effect. Web fonts and entrance animations that gate text visibility are easy to add and invisible in dev (fast localhost, warm cache).

**How to avoid:**
- Define a hard budget up front: hero text must be the LCP and must paint fast; the signature animation must **enhance already-visible content**, not gate it (animate opacity/transform on text that is in the DOM and styled, never `display:none` → reveal).
- Self-host fonts on the GitHub Pages origin, preload the 1–2 critical weights, and use `font-display: swap` (or `optional`) so text never blocks paint.
- Prefer CSS/Framer transform+opacity animations (compositor-friendly) over layout-affecting or scroll-driven JS for the hero.
- Measure: run Lighthouse/PageSpeed against the **deployed GitHub Pages URL** on a throttled mobile profile, target LCP < 2.5s and CLS < 0.1. Test on a real mid-tier Android, not just the dev machine.

**Warning signs:**
Hero text fades in after a perceptible delay; Lighthouse LCP > 2.5s on mobile throttling; large entrance animation on the headline; FOIT (invisible text) on cold load; bundle grows when adding the "small" effect.

**Phase to address:** Phase 2 (Hero/editorial build) for the budget; verified again in the Performance/QA phase.

---

### Pitfall 3: Removing the unlock slider but keeping its baggage (state, scroll lock, dead code, lost focus entry)

**What goes wrong:**
The slider is deleted from the view but its side effects linger: a body/scroll lock that no longer releases, an `autoDriver`/global animation state that assumed the gate (LiquidEther keeps a global driver across remounts — CONCERNS.md, lines 189–193), retry loops that waited for the gate to clear (`PortfolioPage` IntersectionObserver retry, lines 87–89), or the initial focus/scroll position now landing mid-page. Result: content is reachable but the page feels broken in subtle ways (stuck scroll, content not animating in, wrong initial section).

**Why it happens:**
Interaction gates are rarely self-contained. The slider coordinated scroll-locking, animation start, and "ready" state. Removing the UI without tracing those dependencies leaves orphaned effects. The existing duplicate `SectionTitle`, magic-string i18n keys, and retry-loop fragility (CONCERNS.md) make the blast radius hard to see.

**How to avoid:**
- Trace every consumer of the gate before deleting: scroll-lock toggles, animation `start`/`autoDemo` triggers, observer retry conditions, initial-scroll/focus logic. Grep for slider/lock/`autoDriver` references.
- Ensure first paint lands at the top of the editorial hero with normal native scroll restored; no leftover `overflow:hidden` on body.
- Reset/teardown LiquidEther's global animation state on mount (or remove it entirely per the WebGL decision) so no gated assumptions remain.
- Add a smoke check: load `/`, confirm immediate scroll works and the hero is the entry point, in both FR and EN.

**Warning signs:**
Page cannot scroll after load; sections never animate in (observer never fires); console errors about missing elements; initial viewport is not the hero; back/forward leaves scroll locked.

**Phase to address:** Phase 2 (Hero rebuild + slider removal) — same unit of work, since they are coupled.

---

### Pitfall 4: Lenis smooth-scroll fights mobile native scroll, reduced-motion, and scroll-snap

**What goes wrong:**
Lenis hijacks scroll, which on mobile causes momentum/inertia that fights the OS, breaks pull-to-refresh and address-bar collapse, feels laggy on low-end Android, and ignores `prefers-reduced-motion`. Combined with scroll-driven section reveals it produces jank and "stuck" feeling. For an exec skimming on a phone, this is felt immediately as cheapness — again the opposite of the goal. (Lenis maintenance state is also flagged in CONCERNS.md, lines 158–161.)

**Why it happens:**
Smooth scroll looks premium on desktop demos and is already wired in (ScrollStack). Mobile and accessibility behavior is an afterthought; `prefers-reduced-motion` is not checked; nobody tests on a real mid-tier phone where the inertia model diverges from native.

**How to avoid:**
- Decide deliberately whether Lenis runs on mobile at all. Strong recommendation: **disable Lenis on touch/mobile** (or remove it for this content-skim use case) and rely on native scroll, which is smoother and battery-friendly on phones.
- Always gate Lenis (and all motion) on `prefers-reduced-motion: reduce` → fall back to native instant scroll. ~25% of iOS/macOS users have this set.
- Do not combine Lenis with CSS `scroll-snap` (documented conflict) or with scroll-anchored layout shifts.
- Prefer IntersectionObserver-based reveals (compositor transforms) over continuous scroll-position math for section entrances; the current code mixes patterns (CONCERNS.md, lines 85–89) — standardize.
- Test scroll on a real Android + iOS Safari, including pull-to-refresh and address-bar behavior.

**Warning signs:**
Pull-to-refresh broken; address bar won't collapse/expand normally; scroll feels heavy/laggy on phone; reduced-motion users still get smooth/animated scroll; scroll-snap behaves erratically.

**Phase to address:** Phase 3 (Mobile responsive + motion/accessibility pass).

---

### Pitfall 5: Three.js/WebGL liquid background drains battery, heats the device, leaks memory, and crashes on mobile

**What goes wrong:**
`LiquidEther.tsx` (1248 lines, full three.js ~500KB gzipped, continuous render loop, incomplete ResizeObserver/WebGL disposal — CONCERNS.md lines 33–37, 47–51, 136–139) runs a fragment-shader simulation at 60fps on a phone GPU. This drains battery, heats the device, can exceed mobile GPU/VRAM budgets (texture decompression), and triggers WebGL **context loss** on iOS/Android (a known, common failure) — leaving a blank or frozen background. On a backgrounded/re-foregrounded tab the global animation state leaks. The exec on mobile gets a hot phone and/or a broken hero.

**Why it happens:**
The effect was built for desktop wow and never budgeted for mobile constraints. Continuous rAF runs even off-screen (ShinyText has the same issue — CONCERNS.md 65–69). Disposal is incomplete, so navigation/remount leaks GPU memory. Context-loss handling is hard and libraries (incl. three.js) handle it poorly by default. Bundle cost (500KB) directly hurts LCP on mobile.

**How to avoid:**
- Resolve the PROJECT.md open decision firmly. Recommended default: **disable WebGL on mobile/touch and on `prefers-reduced-motion`**, ship a lightweight CSS/static fallback there; on desktop, lazy-load (`React.lazy`) so the 500KB is off the critical path and never on mobile.
- If WebGL stays anywhere: cap to 30fps, pause the render loop when off-screen/tab hidden (`visibilitychange` + IntersectionObserver), and feature-detect WebGL + handle `webglcontextlost`/`restored` gracefully.
- Fix disposal: `resizeObserver.disconnect()`, dispose geometries/materials/textures/render targets, dispose the renderer/context on unmount; reset global `autoDriver` state on mount.
- Keep textures small / use compressed formats; avoid full-res PNGs that balloon in VRAM (~10x).
- Validate on a real mid-tier Android: watch temperature, FPS, and memory over a few minutes; confirm no context-loss blanking.

**Warning signs:**
Phone gets warm within seconds; FPS drops/stutters on hero; background goes blank after a while or after backgrounding the tab; DevTools shows growing GPU/JS memory on navigation; bundle/LCP regression on mobile.

**Phase to address:** Phase 1 (decision) → Phase 3 (mobile gating + fallback) → QA phase (disposal/leak verification).

---

### Pitfall 6: Mobile viewport units (100vh) break the hero — content cut off and layout shift on scroll

**What goes wrong:**
The editorial hero uses `100vh`/`min-h-screen`. On mobile, `vh` does not account for the browser's dynamic UI (address bar), so the hero is taller than the visible area — the value proposition is pushed below the fold or cut off, and when the address bar collapses on scroll the layout jumps (CLS). The first-impression line literally isn't visible.

**Why it happens:**
`100vh` / Tailwind `min-h-screen` is the reflexive way to make a full-height hero and looks fine on desktop and in dev. The mobile address-bar behavior only shows on real devices. `dvh` (dynamic) seems like the fix but recalculates during scroll, causing its own shifts/repaints.

**How to avoid:**
- Use `svh` (small viewport height) for the hero so critical content fits when browser UI is at its largest; reserve `dvh` only for elements meant to resize with the toolbar.
- Don't force the hero to exactly one screen — let it be content-driven with comfortable min-height; the value prop must sit safely above the fold on a small phone.
- Add `env(safe-area-inset-*)` padding for notched/edge-to-edge displays.
- Reserve explicit dimensions for any image/media in the hero to prevent CLS; never animate properties that trigger layout.
- Browser support for svh/dvh/lvh is ~90%+ (Chrome 108+, Safari 15.4+, Firefox 101+) — fine for this audience, but keep a `vh` fallback declaration first.

**Warning signs:**
Value prop below the fold on a phone; visible jump when address bar hides; content under the notch/home indicator; CLS > 0.1 in Lighthouse mobile.

**Phase to address:** Phase 2 (hero build) for unit choice; Phase 3 (responsive) for full verification.

---

### Pitfall 7: i18n FR/EN text-length and layout breakage when restyling tight editorial layouts

**What goes wrong:**
Editorial/minimal layouts are tight and typographically tuned — but FR strings run ~15–30% longer than EN. Buttons, nav items, eyebrows, and the hero title/value line that look perfect in one language wrap awkwardly, overflow, or break the grid in the other. Worse: the existing magic-string i18n keys silently fall back to the key itself when a translation is missing (`key || key`, CONCERNS.md lines 79–83), so a missing/renamed key during the restyle shows a raw key like `hero.title` to the exec with no error.

**Why it happens:**
Designers mock up in one language (often EN) and tune spacing to it. The restyle renames/relabels sections, creating new keys; the silent-fallback masks omissions. No build-time key validation and no tests for language switch (TESTING.md) means breakage ships unnoticed.

**How to avoid:**
- Design and review the hero + nav + any fixed-width element in **both** FR and EN, using the longest real strings. Treat FR as the layout stress test.
- Use fluid/responsive type and flexible containers; avoid fixed widths on translatable text; allow wrapping gracefully or use `clamp()` for the display line.
- Add a build-time/dev guard for missing translation keys (warn instead of silently returning the key) so renamed/added keys during the restyle surface immediately.
- Add a minimal smoke test or manual checklist: switch language on every section, confirm no raw keys and no overflow.

**Warning signs:**
Raw keys (`hero.title`) visible in UI; FR title wraps to 3 lines where EN fits 1; nav items collapse/overflow only in FR; CTA text clipped in one language.

**Phase to address:** Phase 1 (key strategy/guard) + every build phase (design in both languages); verified in QA.

---

### Pitfall 8: Removing animations/effects without re-checking accessibility and reduced-motion holistically

**What goes wrong:**
The team focuses on visual polish and performance but the restyle reintroduces or leaves accessibility gaps: the new editorial hero has poor color contrast (light-gray-on-white is a classic minimal trap), the custom cursor (CustomCursor) and decrypt/shiny text effects ignore reduced-motion, focus order is broken after slider removal, and decorative WebGL/canvas isn't `aria-hidden`. ARIA exists but is untested (TESTING.md). For a professional cyber-security profile, an inaccessible site is also an off-brand credibility hit.

**Why it happens:**
Minimal palettes push contrast to the edge for "elegance." Reduced-motion is handled per-component (if at all) rather than globally. No a11y tests exist. Decorative animation is added back as the "signature moment" without an off-switch.

**How to avoid:**
- Centralize a `prefers-reduced-motion` strategy: a single hook/CSS that disables Lenis, the WebGL loop, decrypt/shiny effects, the custom cursor motion, and entrance animations — all in one place.
- Enforce WCAG AA contrast on the editorial palette (≥4.5:1 body, ≥3:1 large text); verify the chosen "elegant" grays actually pass.
- Mark all decorative canvas/animation `aria-hidden="true"`; ensure keyboard focus order starts at the hero and flows through real content; the custom cursor must not hide the native cursor for keyboard users.
- Quick automated pass (axe/Lighthouse a11y) + manual keyboard + reduced-motion toggle test, in both languages.

**Warning signs:**
Lighthouse a11y < 95; gray text fails contrast checker; reduced-motion toggle still shows decrypt/cursor/scroll animation; tabbing skips or traps; screen reader announces decorative canvas.

**Phase to address:** Phase 3 (responsive + accessibility/motion pass); spot-checked in QA.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Keep full three.js + LiquidEther on mobile "for now" | No rework, keeps wow | Battery/heat/context-loss/LCP regression — directly violates the hard mobile-fluidity constraint | Never on mobile; desktop only if lazy-loaded + disposed |
| Leave silent i18n key fallback (`key||key`) as-is | Nothing to build | Raw keys ship to the exec during/after restyle; masks regressions | Never during a restyle that renames keys |
| Use `min-h-screen`/`100vh` for hero | Fast, familiar | Cut-off value prop + CLS on mobile | Never for the hero; OK for non-critical full-bleed only with svh |
| Delete slider UI without tracing scroll-lock/anim/observer deps | Looks done quickly | Stuck scroll / no reveals / wrong entry point | Never — trace deps first |
| Ship restyle with zero tests (status quo) | Speed | Language-switch + responsive + reveal regressions invisible | MVP-acceptable only with a manual QA checklist + Lighthouse gate |
| Keep duplicate `SectionTitle` + mixed observer/retry patterns | Avoids refactor | Restyle edits must be done twice; fragile reveals | Acceptable short-term; consolidate when touching those sections |
| Continuous rAF (Shiny/Decrypt/WebGL) without visibility gating | Simple | Off-screen battery/CPU burn on mobile | Never on mobile-shipped components |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| GitHub Pages (static) | Assuming SPA routes / server config / env secrets; `window` accessed at module load (CONCERNS.md 195–199) | 100% client-side; SPA fallback via `404.html` copy of `index.html` if routing added; guard `window` in `useEffect`; no secrets in repo |
| GitHub Pages base path | Assets 404 because repo isn't served from domain root with correct `base` | Set Vite `base` to match the Pages path; verify asset/font URLs on the **deployed** URL, not localhost |
| Lenis + native mobile scroll | Running Lenis on touch; combining with scroll-snap | Disable on touch/reduced-motion; never pair with scroll-snap |
| Web fonts | Loading from third-party CDN / FOIT blocking text | Self-host on Pages origin, preload critical weights, `font-display: swap`/`optional` |
| Three.js WebGL | No context-loss handling; no disposal; runs everywhere | Feature-detect, handle `webglcontextlost`, dispose all resources, gate off mobile |
| Email/clipboard in Footer | Unhandled `clipboard.writeText()` rejection (CONCERNS.md 111–115) | `.catch()` with user feedback; keep `mailto`/visible fallback |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| 500KB three.js on critical path | High mobile LCP, slow first paint | Lazy-load WebGL; exclude from mobile bundle path | Immediately on 3G/mid-tier mobile |
| WebGL 60fps loop on phone GPU | Heat, battery drain, FPS stutter, context loss | Cap 30fps, pause off-screen/hidden, disable on mobile | Within seconds on mid/low-tier devices |
| Continuous rAF off-screen (Shiny/Decrypt) | CPU/battery burn when not visible | IntersectionObserver pause/resume | Always on long mobile pages |
| Scroll-handler DOM queries every frame (CONCERNS.md 59–63) | Jank/scroll stutter | Cache refs; IntersectionObserver; rAF batching | Grows with section/card count |
| Interval/timeout leaks (DecryptedText) on re-render/lang switch | Memory growth, duplicate animations | Explicit timer types + guaranteed cleanup | Over time / on rapid language switching |
| Entrance animation gating LCP text | Late/invisible hero text | Animate already-rendered text (opacity/transform only) | First load, cold cache |
| dvh hero recalc on scroll | Layout shift/repaint while scrolling | Use svh for hero, dvh only intentionally | Every mobile scroll |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Unvalidated external links from JSON (CONCERNS.md 105–109) | Broken/malicious redirect; credibility hit on a cyber profile | Validate URLs at import (URL constructor); keep `rel="noopener noreferrer"` |
| No CSP (CONCERNS.md 182–185) | XSS surface if data/content compromised | Add CSP via meta tag (no server) / restrict sources; validate data on import |
| Email in plain source (CONCERNS.md 170–174) | Bot scraping/spam | Obfuscate or accept as low-risk for a public contact; not a redesign blocker |
| Importing untyped JSON with `as any` (CONCERNS.md 7–11) | Silent runtime breakage when new experiences added | Zod (or typed interfaces) validation at import boundary |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| 30s value not above the fold on mobile | Exec leaves before grasping the profile | Name + title + value line visible immediately (svh hero) |
| Scroll-hijack inertia on phone | Site feels laggy/cheap, breaks native gestures | Native scroll on mobile |
| Over-animated reveals delay reading | Skimmer waits for content to "arrive" | Subtle, fast, content-already-present reveals; one signature moment |
| Low-contrast "elegant" gray text | Hard to read, fails AA, off-brand | AA-compliant palette |
| Raw i18n keys / FR overflow | Looks unfinished to a discerning viewer | Both-language design + missing-key guard |
| Custom cursor hiding native cursor | Confusing on touch/keyboard | Disable on touch; respect reduced-motion; keep native cursor focusable |

## "Looks Done But Isn't" Checklist

- [ ] **Editorial hero:** Looks great in EN on desktop — verify FR longest strings + small Android phone (svh, above-fold value prop, no CLS).
- [ ] **Slider removal:** UI gone — verify scroll is unlocked, reveals fire, entry point is the hero, in FR and EN.
- [ ] **WebGL background:** Looks smooth on dev machine — verify on real mobile (heat, FPS, context loss after backgrounding) or confirm it's disabled there.
- [ ] **Performance:** Fast on localhost — verify Lighthouse mobile-throttled on the **deployed Pages URL** (LCP < 2.5s, CLS < 0.1).
- [ ] **Reduced motion:** Animations look nice — verify the OS reduced-motion toggle disables Lenis, WebGL, decrypt/shiny, cursor, and entrance anims.
- [ ] **Accessibility:** ARIA present — verify contrast AA, keyboard focus order, decorative canvas `aria-hidden`, axe pass.
- [ ] **i18n:** Both languages "work" — verify every section switches with no raw keys and no overflow; missing-key guard active.
- [ ] **Memory/cleanup:** No visible bug — verify no growing GPU/JS memory or duplicate intervals after navigation/language switch (DevTools).
- [ ] **Fonts:** Render fine warm — verify cold-load on throttled mobile has no FOIT/CLS (preload + swap).
- [ ] **GitHub Pages:** Works in `vite preview` — verify on the live Pages URL with correct base path and asset/font resolution.

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Minimal looks empty/generic | MEDIUM | Re-introduce editorial hierarchy: type scale, asymmetric whitespace, one signature moment; re-run 30s test |
| WebGL hurting mobile perf/battery | LOW–MEDIUM | Gate off on touch/reduced-motion + lazy-load on desktop + add disposal; or remove entirely |
| Stuck scroll / dead reveals after slider removal | LOW | Remove orphaned scroll-lock, reset anim state, fix observer retry/entry point |
| 100vh hero cut-off + CLS | LOW | Swap to svh + safe-area padding + content-driven min-height |
| Raw i18n keys / FR overflow | LOW | Add missing-key dev guard; fix keys; adjust fluid type/containers for FR |
| Failing LCP from web font / heavy hero | LOW–MEDIUM | Self-host + preload + swap; move animation off the LCP element |
| Reduced-motion ignored | LOW | Centralize one motion gate; route all effects through it |
| Memory/interval leaks | MEDIUM | Explicit timer types, guaranteed cleanup, full three.js disposal, profile to confirm |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Empty/generic minimalism (#1) | Phase 1 — Design system / editorial direction | 30s comprehension test on real content; reviewer "impressed" not just "clean" |
| Wow hurts LCP/load (#2) | Phase 2 build + QA | Lighthouse mobile LCP < 2.5s on deployed URL; hero text is LCP |
| Slider-removal baggage (#3) | Phase 2 — Hero rebuild + slider removal | Smoke test: scroll works, reveals fire, hero is entry point (FR+EN) |
| Lenis vs mobile/reduced-motion/snap (#4) | Phase 3 — Responsive + motion/a11y | Real-device scroll test; reduced-motion disables smooth scroll |
| WebGL battery/GPU/memory/context loss (#5) | Phase 1 decision → Phase 3 gating → QA | Real mid-tier Android: heat/FPS/memory/no blanking; lazy-loaded off mobile |
| 100vh hero cut-off + CLS (#6) | Phase 2 hero + Phase 3 responsive | svh hero, value prop above fold, CLS < 0.1 mobile |
| i18n length/missing-key breakage (#7) | Phase 1 guard + all build phases | Both-language review; no raw keys; no overflow; dev warns on missing key |
| Accessibility/reduced-motion holistically (#8) | Phase 3 — Responsive + a11y/motion pass | axe/Lighthouse a11y ≥ 95; AA contrast; keyboard + reduced-motion pass |

**Ordering rationale:** Phase 1 must establish the editorial design system, the WebGL decision, and the i18n key guard *before* anything is torn down (prevents the emptiness vacuum and key breakage). Phase 2 builds the hero and removes the slider together (coupled). Phase 3 is the mobile + motion + accessibility hardening pass where Lenis/WebGL/viewport/a11y pitfalls are resolved. A final QA/Performance gate verifies LCP/CLS/leaks on the deployed Pages URL and real devices.

## Sources

- Codebase audit — `.planning/codebase/CONCERNS.md` (WebGL perf/disposal, global anim state, mixed observer/retry, magic-string i18n silent fallback, no tests, bundle size, `window` at module load) — HIGH confidence (direct codebase)
- Testing audit — `.planning/codebase/TESTING.md` (zero tests; untested responsive/i18n/a11y/animation) — HIGH
- Lenis smooth scroll: mobile, reduced-motion, scroll-snap conflict — DevDreaming "Smooth Scrolling with Lenis & GSAP", raoulcoutard.com "Why Lenis Broke My Scroll-Snap", dev.to prefers-reduced-motion guide — MEDIUM (community/web)
- Three.js mobile: battery, GPU memory, texture VRAM, context loss, disposal — utsubo.com "100 Three.js Tips (2026)", discoverthreejs.com tips, pixelfreestudio "WebGL in Mobile Development", three.js forum context-loss thread, mattdesl "Non-Intrusive WebGL" — MEDIUM
- Mobile viewport units svh/lvh/dvh, CLS, safe-area, browser support — openreplay "When 100vh Lies", dev.to vh/dvh/lvh/svh units, thefix.it dvh vs vh — MEDIUM
- Minimal vs editorial design (clarity not emptiness, editorial typography) — Webflow "minimalist design examples", DesignRush best minimalist 2026, letterhend minimalist typography — MEDIUM

---
*Pitfalls research for: minimal/editorial restyle of an animation-heavy React portfolio SPA on GitHub Pages (mobile-first)*
*Researched: 2026-06-16*
