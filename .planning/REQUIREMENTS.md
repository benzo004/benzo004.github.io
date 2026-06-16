# Requirements: Portfolio benzo004 — Refonte minimal & éditorial

**Defined:** 2026-06-16
**Core Value:** Un cadre d'entreprise pressé comprend qui je suis et repart impressionné en moins de 30 secondes, sur mobile comme sur desktop.

## v1 Requirements

Exigences de ce milestone (refonte). Chacune est mappée vers une phase de la roadmap.

### Foundation — Design System (FND)

- [ ] **FND-01**: Tous les tokens de design (couleurs, typo, espacements) sont centralisés en variables CSS consommées par Tailwind, sans valeur hex en dur dans les composants
- [ ] **FND-02**: Une échelle typographique fluide `clamp()` (display / heading / body) minimal & éditorial est définie et disponible comme tokens Tailwind
- [ ] **FND-03**: La direction visuelle minimal & éditorial (palette, polices, espacements) est définie et documentée
- [ ] **FND-04**: Le code mort est supprimé (`LandingPage.tsx`, `SectionTitle` dupliqué, `Header.tsx` inutilisé) et le hack `body { zoom: 0.9 }` est retiré
- [ ] **FND-05**: Un garde i18n signale en développement les clés de traduction manquantes (fin du fallback silencieux `key || key`)

### Hero & Entrée (HERO)

- [ ] **HERO-01**: L'accueil donne accès directement au contenu — le slider de déverrouillage est supprimé, zéro friction
- [ ] **HERO-02**: Le hero affiche nom, titre et proposition de valeur lisibles dès le premier écran (above-the-fold), en FR et EN, sur le plus petit mobile cible
- [ ] **HERO-03**: Le hero intègre un unique moment signature animé sans retarder l'affichage du texte (l'élément LCP est rendu dès le premier paint)
- [ ] **HERO-04**: La section Tagline est fondue dans le hero (plus de section Tagline séparée)
- [ ] **HERO-05**: Le hero utilise des unités `svh` (pas `100vh`) pour éviter le rognage de contenu sur mobile

### Navigation & Contact (NAV)

- [ ] **NAV-01**: Une navigation / indicateur de progression épurée permet de sauter rapidement entre les sections
- [ ] **NAV-02**: La visibilité de la nav et du footer découle de la position de scroll (et non d'un état de déverrouillage)
- [ ] **NAV-03**: Un chemin de contact direct (`mailto:` + liens sociaux) est accessible en permanence (header et footer)

### Contenu & Sections (CONT)

- [ ] **CONT-01**: Les Expériences sont placées juste sous le hero (preuves d'abord pour un cadre)
- [ ] **CONT-02**: Les six sections de contenu sont restylées selon la direction minimal & éditorial via les tokens
- [ ] **CONT-03**: De nouvelles entrées d'expérience sont ajoutées dans les données JSON, en FR et EN
- [ ] **CONT-04**: Les sections denses (Certifications, Toolbox) sont présentées de façon compacte et scannable

### Responsive & Mobile (RESP)

- [ ] **RESP-01**: Toutes les sections sont entièrement responsive en mobile-first, sans scroll horizontal
- [ ] **RESP-02**: Les cibles tactiles mesurent au moins 44×44px
- [ ] **RESP-03**: Les breakpoints JS en dur (768/1024px) sont remplacés par du responsive déclaratif Tailwind / `clamp()`

### Performance & Animations (PERF)

- [ ] **PERF-01**: Les animations sont consolidées sur une seule librairie (`motion/react`) ; `framer-motion`, GSAP et Lenis sont retirés des dépendances
- [ ] **PERF-02**: La stratégie du fond WebGL est décidée et implémentée de sorte que Three.js ne touche jamais le chemin critique mobile (désactivé/fallback sur mobile)
- [ ] **PERF-03**: Audit Lighthouse mobile sur l'URL GitHub Pages déployée : LCP < 2.5s et CLS < 0.1
- [ ] **PERF-04**: Le site est validé fluide sur un vrai mobile milieu de gamme (pas de jank perceptible)

### Accessibilité (A11Y)

- [ ] **A11Y-01**: Le contraste respecte WCAG AA sur l'ensemble du site
- [ ] **A11Y-02**: L'ordre de focus clavier est logique et les états de focus sont visibles
- [ ] **A11Y-03**: `prefers-reduced-motion` est respecté (animations réduites ou désactivées)
- [ ] **A11Y-04**: Les éléments décoratifs (canvas WebGL, fonds animés) sont `aria-hidden`

## v2 Requirements

Reconnu mais reporté — pas dans la roadmap de ce milestone.

### Qualité & Tests

- **TEST-01**: Infrastructure de tests automatisés (Vitest + Playwright E2E mobile/desktop)

### Enrichissement WebGL

- **FX-01**: Fond WebGL desktop lazy-chargé et capability-gated avec gestion complète de la disposition/perte de contexte (si l'option desktop-only est retenue et jugée prioritaire plus tard)

## Out of Scope

Explicitement exclu, documenté pour éviter le scope creep.

| Feature | Reason |
|---------|--------|
| Refonte from-scratch / nouveau design system complet | Choix assumé de garder la structure existante (meilleur rapport effort/impact) |
| Backend / base de données / API | Le site reste 100% statique (GitHub Pages) |
| CV téléchargeable (PDF) | Non retenu pour cette itération |
| Formulaire de contact | Non retenu — liens directs `mailto:` + sociaux suffisent |
| Témoignages / recommandations | Non retenu pour cette itération |
| Blog / articles / veille cyber | Non retenu — grande nouvelle surface de contenu |

## Traceability

Mapping requirement → phase (chaque exigence v1 est mappée vers exactement une phase).

| Requirement | Phase | Status |
|-------------|-------|--------|
| FND-01 | Phase 1 | Pending |
| FND-02 | Phase 1 | Pending |
| FND-03 | Phase 1 | Pending |
| FND-04 | Phase 1 | Pending |
| FND-05 | Phase 1 | Pending |
| HERO-01 | Phase 2 | Pending |
| HERO-02 | Phase 2 | Pending |
| HERO-03 | Phase 2 | Pending |
| HERO-04 | Phase 2 | Pending |
| HERO-05 | Phase 2 | Pending |
| NAV-02 | Phase 2 | Pending |
| PERF-02 | Phase 2 | Pending |
| NAV-01 | Phase 3 | Pending |
| NAV-03 | Phase 3 | Pending |
| CONT-01 | Phase 3 | Pending |
| CONT-02 | Phase 3 | Pending |
| CONT-03 | Phase 3 | Pending |
| CONT-04 | Phase 3 | Pending |
| RESP-01 | Phase 3 | Pending |
| RESP-02 | Phase 3 | Pending |
| RESP-03 | Phase 3 | Pending |
| PERF-01 | Phase 3 | Pending |
| A11Y-01 | Phase 3 | Pending |
| A11Y-02 | Phase 3 | Pending |
| A11Y-03 | Phase 3 | Pending |
| A11Y-04 | Phase 3 | Pending |
| PERF-03 | Phase 4 | Pending |
| PERF-04 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 28 total
- Mapped to phases: 28 ✓
- Unmapped: 0 ✓

---
*Requirements defined: 2026-06-16*
*Last updated: 2026-06-16 after roadmap creation (traceability mapped)*
