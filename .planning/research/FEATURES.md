# Feature Research

**Domain:** Personal minimal & editorial cybersecurity portfolio (static SPA) — restyle milestone
**Researched:** 2026-06-16
**Confidence:** MEDIUM (web best-practice synthesis; no curated docs source available — gsd-tools unavailable, findings from current web design literature cross-checked across multiple sources)

> **Persona anchor:** A time-poor corporate executive ("cadre d'entreprise") who has seen many portfolios. Success = grasp *who this person is* **and be impressed** in **under 30 seconds**, on mobile and desktop. The "wow" must come from refinement (typography, space, one well-crafted motion), never from clutter.
>
> **Scope guard (from PROJECT.md Out of Scope):** No contact form, no downloadable CV/PDF, no testimonials, no blog. This is a *restyle*, not a from-scratch rebuild — keep the existing structure, JSON data model, React/Vite/TS/Tailwind stack, and FR/EN bilingual support.

---

## The 30-Second Scan: How an Executive Actually Reads This

Research is consistent: visitors decide in **seconds** whether to stay, and they **scan rather than read** (F-pattern: top horizontal band → second band → vertical sweep down the left). For our persona this means the budget is roughly:

1. **0–5s — Hero / above the fold:** *Who is this and is it credible?* Name + title + one-line value proposition must be legible without scrolling, on the smallest target phone.
2. **5–15s — First scroll:** *What has this person actually done?* The strongest proof (experience + headline credentials) must be the first thing below the fold.
3. **15–30s — Confidence sweep:** *Is this person legit and current?* Certifications, key tools, and a clear way to reach out close the loop.

Everything below serves that budget. The central tension (minimalism + fast navigation vs. creative wow) is resolved by treating **refined restraint as the wow**.

---

## Feature Landscape

### Table Stakes (Executive Leaves Without These)

Features the persona unconsciously expects. Missing these = the profile reads as incomplete or amateur, regardless of how nice the styling is.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Zero-friction immediate access** (remove slider-to-unlock) | A pressed executive will not "drag to unlock" — the gate is friction #1 and directly costs the 30s budget. Content must be reachable on first paint. | LOW (removal) / MEDIUM (rewire `PortfolioPage` landing state + AnimatePresence) | Removing `showLanding` gating in `PortfolioPage.tsx`; hero becomes the first scroll section, not a fixed overlay. Eliminates the retry-loop anti-pattern noted in ARCHITECTURE.md. |
| **Above-the-fold identity clarity** | Name + role + one-line value proposition must be visible with no scroll. "If someone has to think about what you do, they leave." | LOW (content/layout) | Single H1 (name), clear role line ("Cybersecurity professional / [specialty]"), one value sentence. No competing CTAs. |
| **Single, scannable visual hierarchy** | Executives scan, not read. Three-level type system (display / heading / body) + generous whitespace lets the eye triage in seconds. | MEDIUM (design system pass across all sections) | Differentiate by size + weight + case, not by adding color noise. Whitespace reduces cognitive load — it is a feature, not emptiness. |
| **Experience-first ordering below the fold** | The persona's #1 question after "who" is "what have they done." Proof of work outranks tagline/toolbox for this audience. | LOW (reorder section render in `PortfolioPage`) | See "Section Prioritization" below — promote Experiences directly under hero. |
| **Full mobile-first responsiveness** | Hard requirement in PROJECT.md; executive may open on phone. Type, spacing, tap targets, and the hero must hold on small screens. | HIGH (every section audited; current site only partially responsive) | Mobile-first means design the small layout first, then enhance. Tap targets ≥44px, no horizontal scroll, fluid type. |
| **Mobile performance / fast first paint** | "A stunning hero means nothing if visitors leave before it loads." Slow load on mobile = lost first impression. | MEDIUM–HIGH | Decide WebGL fate (see Differentiators + Anti-features). Lazy-load below-fold sections; keep hero lightweight. |
| **Bilingual FR/EN with obvious switch** | Existing capability; expected to remain. Executive may prefer either language. | LOW (preserve existing) | Keep language switcher discoverable but visually quiet in the header. |
| **Reachable contact path** | After being impressed, the persona needs a frictionless way to act. With no contact form (out of scope), direct links (email/LinkedIn) are the path. | LOW (existing footer links) | Direct `mailto:` + social links. Keep in footer AND consider one quiet link in hero/header so the action is never more than a glance away. |
| **Credibility signals (certifications, key tools)** | In cyber specifically, certs (e.g. recognized credentials) are shorthand for competence the executive can trust at a glance. | LOW (existing data) | Render compactly/scannably — logos or terse labels beat paragraphs. |
| **Legible, professional typography** | The entire "editorial" direction lives or dies on type. Bad type = no credibility for a minimal site. | MEDIUM | Strong type pairing, comfortable line length (~50–75ch), real hierarchy. This is where most of the "refinement wow" is earned. |

### Differentiators (Refined Wow, Competitive Edge)

Not strictly expected, but these create the "this person has taste / attention to detail" reaction — which, for a cyber professional, *is* the credibility signal.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **One signature animated moment in the hero** | A single, well-crafted motion (the existing decrypt/scramble effect, a refined type reveal, or a restrained WebGL accent) reads as craft. Restraint is what impresses a jaded viewer. | MEDIUM | Pick exactly ONE. The existing `DecryptedText` effect is on-theme for cyber ("decrypting" the name/title) and far cheaper than WebGL. Strong candidate as the signature moment. |
| **Editorial layout language** (asymmetry, strong margins, rule-of-thirds, oversized type) | Differentiates from template-y portfolios; signals deliberate design. Magazine-like restraint = premium feel. | MEDIUM–HIGH | Big type + lots of negative space + a confident grid. The "editorial" identity is the moat vs. generic dev portfolios. |
| **Restrained scroll micro-interactions** | Elements easing/fading into view on scroll (opacity + small offset) feel alive without distracting. Confirmed pattern in tasteful portfolios (e.g. blur-to-clear reveals). | LOW–MEDIUM (Framer Motion already in stack) | Keep to opacity + subtle translate. One motion vocabulary site-wide. Avoid per-section novelty effects. |
| **Quiet, persistent navigation / progress affordance** | Lets the executive jump to "Experience" or "Contact" without hunting — supports the <30s goal. | LOW–MEDIUM (existing `ProgressNav`) | Simplify the existing nav: fewer items, calmer styling. Section anchors enable fast jumps. |
| **prefers-reduced-motion support** | Honoring the OS motion setting is both accessibility (WCAG 2.3.3) and a *refinement* signal — and protects the persona who finds motion distracting. | LOW | Gate the signature animation + scroll reveals behind the media query; fall back to instant/opacity-only. Cheap, high-polish. |
| **Polished hover/focus states** | Micro-feedback on interactive elements (links, cards) signals quality and aids keyboard/scan navigation. | LOW | Subtle, consistent. Part of the single motion vocabulary. |
| **Cohesive cyber-editorial visual motif** | A restrained themed accent (mono/terminal type detail, decrypt motion, subtle grain — already in `globals.css`) ties identity to the cyber domain tastefully. | LOW–MEDIUM | Use sparingly as seasoning, not the whole meal. The existing grain texture can stay if it reads as premium, not gimmicky. |

### Anti-Features (Deliberately Do NOT Build)

Things that seem appealing but burn the 30-second budget, hurt mobile performance, or violate PROJECT.md scope.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| **Slider-to-unlock gate** | Looks novel/interactive | Friction #1 for a pressed persona; blocks immediate content access; powers a buggy retry loop. Explicitly slated for removal. | Direct access — content visible on first paint. |
| **Heavy WebGL background on mobile** (`LiquidEther`/Three.js) | Visually impressive "wow" | Mobile perf is a HARD requirement; Three.js fluid sim is expensive and risks jank/slow paint → lost first impression. Conflicts with "wow via refinement, not load." | Decide in design phase: lighten on desktop / disable on mobile, OR remove entirely and let typography carry the wow. Default recommendation: drop it for mobile; type + one motion is enough. |
| **Multiple competing animations / per-section effects** | "Show off motion skills" | Competing motion = clutter, exactly the failure mode for a jaded executive; dilutes the single signature moment. | ONE signature moment + one quiet site-wide reveal vocabulary. |
| **Contact form** | Standard portfolio fixture | Out of scope; static GitHub Pages has no backend; adds friction vs. a direct link. | Direct `mailto:` + social links (existing footer). |
| **Downloadable CV / PDF** | "Recruiters want it" | Out of scope this iteration; the site IS the CV for this scan. | The portfolio sections themselves; LinkedIn link. |
| **Testimonials / recommendations** | Social proof | Out of scope; risks clutter and slows the scan. Certs/experience carry credibility here. | Lean on certifications + concrete experience entries. |
| **Blog / cyber news feed** | "Show thought leadership" | Out of scope; adds a whole content surface that fragments the 30s scan and ongoing maintenance. | Keep focus on identity + proof of work. |
| **Multiple CTAs in the hero** | "More conversion paths" | "Cramming multiple messages/CTAs into one space" is the #1 hero mistake; splits attention. | One quiet contact affordance; let content do the convincing. |
| **Long-form copy / paragraphs** | "Explain everything" | Executives scan; walls of text are skipped and read as unedited. | Terse, high-signal lines; bullet/label density over prose. |
| **Auto-playing audio/video or infinite carousels** | "Dynamic feel" | WCAG 2.2.2 (Pause/Stop/Hide) burden; distracting; perf cost; often ignored. | Static or scroll-triggered reveals only. |
| **From-scratch redesign / new design system** | "Do it properly" | Out of scope; worse effort/impact ratio; risks regressions in working bilingual/JSON structure. | Restyle within existing structure and stack. |

---

## Section Prioritization for the 30-Second Scan

Existing sections (do not re-research existence): **Hero, Tagline, Experiences, Projects, Certifications, Education, Toolbox, Footer (contacts/social).**

Current render order (per ARCHITECTURE.md): Hero → Tagline → Experiences → Projects → Certifications → Education → Toolbox → Footer.

**Recommended scan-optimized order for the executive persona:**

| Order | Section | Role in the 30s scan | Change vs. current |
|-------|---------|----------------------|--------------------|
| 1 | **Hero** (identity + value + signature motion) | 0–5s "who & credible" | Keep first; remove gate; restyle editorial. |
| 2 | **Experiences** | 5–15s "what have they done" — strongest proof for this audience | **Promote above Tagline/Projects.** Add new entries (per milestone). |
| 3 | **Projects** | Concrete evidence of capability | Keep high; trim to most impressive (quality > quantity). |
| 4 | **Certifications** | 15–30s credibility shorthand for cyber | Render compact/scannable. |
| 5 | **Toolbox** | Confirms current technical relevance at a glance | Compact chips/labels. |
| 6 | **Education** | Supporting credibility, lower urgency | Keep but de-emphasize. |
| 7 | **Tagline** | Tone/personality — nice but not proof | **Demote** below proof sections, or fold into hero as the value line. |
| 8 | **Footer** (contact/social) | The action endpoint | Keep last; ensure contact also reachable from header. |

> Rationale: for a hiring/evaluating executive, **proof of work (Experience) outranks personality (Tagline)**. The current order leads with Tagline before Experiences; flipping these aligns render order with the persona's question order. Consider whether Tagline survives as a standalone section at all, or becomes the hero's value sentence (reduces section count = faster scan).

---

## Feature Dependencies

```
Remove slider-to-unlock
    └──enables──> Zero-friction immediate access
                      └──enables──> 30-second scan budget

Mobile-first responsive
    └──requires──> WebGL strategy decision (lighten/disable/remove)
    └──requires──> Mobile performance / fast first paint

Editorial restyle (typography + whitespace + hierarchy)
    └──is the foundation of──> "Wow via refinement"
    └──requires──> Section re-prioritization (hierarchy is structural, not just visual)

Single signature animated moment
    └──requires──> prefers-reduced-motion support (accessibility + polish)
    └──conflicts──> Multiple competing animations / heavy WebGL on mobile

Quiet persistent navigation
    └──enhances──> 30-second scan budget (fast jumps to Experience / Contact)
```

### Dependency Notes

- **Remove slider → zero-friction → 30s budget:** The gate removal is the precondition for everything else; without it the scan clock cannot even start.
- **Mobile-first requires the WebGL decision:** Cannot guarantee mobile perf without resolving the Three.js background (the heaviest asset). This decision is on the milestone's critical path.
- **Signature motion requires reduced-motion handling:** A single hero animation must degrade gracefully; this is cheap and is itself a refinement signal.
- **Signature motion conflicts with heavy WebGL + multi-animation:** Picking one signature moment means actively *removing* competing motion, not adding alongside it.
- **Editorial restyle requires re-prioritization:** "Hierarchy" for this persona is both visual (type/space) and structural (section order) — they must change together.

---

## MVP Definition

### Launch With (this milestone)

- [ ] **Remove slider-to-unlock; direct content access** — precondition for the entire goal.
- [ ] **Editorial restyle: typography + whitespace + 3-level hierarchy** — the core "wow via refinement."
- [ ] **Above-the-fold identity clarity** (name + role + value line, one quiet contact affordance) — passes the 0–5s test.
- [ ] **Section re-prioritization** (Experiences promoted above Tagline; Tagline demoted/folded) — aligns scan with persona questions.
- [ ] **Full mobile-first responsiveness** — hard requirement.
- [ ] **WebGL strategy decision + implementation** (recommend: disable on mobile, lighten or drop on desktop) — protects mobile perf.
- [ ] **One signature animated moment** (recommend reusing/refining `DecryptedText` for the hero) — controlled wow.
- [ ] **prefers-reduced-motion fallback** — accessibility + polish, cheap.
- [ ] **Add new experience entries** (content/JSON) — per milestone scope.
- [ ] **Preserve FR/EN bilingual** throughout — constraint.

### Add After Validation (v1.x)

- [ ] **Refined scroll micro-interactions site-wide** — trigger: core restyle shipped and stable; add the quiet reveal vocabulary.
- [ ] **Simplified persistent nav / progress affordance polish** — trigger: section order finalized.
- [ ] **Compacted certs/toolbox presentation** (logos/chips) — trigger: content volume warrants denser layout.

### Future Consideration (v2+ / explicitly deferred)

- [ ] Contact form — deferred (out of scope; would need backend).
- [ ] Downloadable CV — deferred (out of scope this iteration).
- [ ] Testimonials — deferred (out of scope).
- [ ] Blog / cyber veille — deferred (out of scope; large new surface).

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Remove slider-to-unlock | HIGH | LOW | P1 |
| Editorial restyle (type/space/hierarchy) | HIGH | MEDIUM–HIGH | P1 |
| Above-the-fold identity clarity | HIGH | LOW | P1 |
| Section re-prioritization (Experiences first) | HIGH | LOW | P1 |
| Full mobile-first responsiveness | HIGH | HIGH | P1 |
| WebGL strategy decision | HIGH (perf) | MEDIUM | P1 |
| Single signature animation | HIGH (wow) | MEDIUM | P1 |
| prefers-reduced-motion support | MEDIUM | LOW | P1 |
| Add new experience entries | MEDIUM | LOW | P1 |
| Restrained scroll micro-interactions | MEDIUM | LOW–MEDIUM | P2 |
| Simplified persistent navigation | MEDIUM | LOW–MEDIUM | P2 |
| Compact certs/toolbox presentation | MEDIUM | LOW | P2 |
| Polished hover/focus states | MEDIUM | LOW | P2 |

**Priority key:** P1 = must have for this milestone · P2 = should have, add when possible · P3 = future.

---

## Competitor / Reference Feature Analysis

| Pattern | Generic dev portfolio | Tasteful editorial / motion portfolio | Our Approach |
|---------|-----------------------|----------------------------------------|--------------|
| Entry | Splash/loader or gate | Immediate hero, name + expertise in large type | Immediate hero, no gate; name + role + value line |
| Motion | Many effects everywhere | One signature moment + restrained scroll reveals (blur/opacity ease-in) | One signature (decrypt/type reveal) + quiet site-wide reveals |
| Background | Stock image / video | Whitespace + bold type carries it | Whitespace + type; WebGL only if it survives the mobile perf bar |
| Hierarchy | Flat, everything equal | Strong 3-level type, asymmetric editorial grid | Editorial grid, 3-level type, Experiences-first order |
| Accessibility | Often ignored | Honors prefers-reduced-motion | prefers-reduced-motion + visible focus states |
| Contact | Big form | Quiet direct link | Direct mailto/social (no form — out of scope) |

---

## Sources

- Above-the-fold / hero first-impression best practices — https://www.omniconvert.com/blog/above-the-fold-design/ , https://blog.logrocket.com/ux-design/hero-section-examples-best-practices/ , https://prismic.io/blog/website-hero-section (MEDIUM confidence)
- Visual hierarchy, F-pattern scanning, typography & whitespace — https://www.ramotion.com/blog/visual-hierarchy/ , https://www.bluefrogdm.com/blog/visual-hierarchy-and-scanning-patterns , https://ixdf.org/literature/topics/visual-hierarchy (MEDIUM confidence)
- Tasteful single-signature motion & restrained micro-interactions — https://webflow.com/blog/microinteractions , https://www.wix.com/blog/animation-portfolios , https://tympanus.net/codrops/2025/12/02/two-portfolios-one-process-where-design-motion-and-code-come-together/ (MEDIUM confidence)
- Accessible animation / prefers-reduced-motion / WCAG 2.3.3 & 2.2.2 — https://web.dev/learn/accessibility/motion , https://blog.openreplay.com/prefers-reduced-motion-accessible-animation/ (MEDIUM-HIGH confidence; web.dev is authoritative)
- Project context — `.planning/PROJECT.md`, `.planning/codebase/ARCHITECTURE.md` (HIGH confidence — internal)

---
*Feature research for: minimal & editorial cybersecurity portfolio (restyle milestone)*
*Researched: 2026-06-16*
