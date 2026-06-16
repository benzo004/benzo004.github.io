# Roadmap: Portfolio benzo004 — Refonte minimal & éditorial

## Overview

Refonte stylistique brownfield d'un portfolio cybersécurité existant (React/Vite/TS/Tailwind, GitHub Pages). On part d'une structure éprouvée et on la fait évoluer vers une direction **minimal & éditorial** par soustraction et consolidation, pas par ajout. Le parcours : (1) poser le système de design éditorial (tokens, échelle typo, code mort retiré) avant de toucher au visuel ; (2) supprimer le slider de déverrouillage et reconstruire le hero en flux, avec un seul moment signature et la stratégie WebGL tranchée ; (3) restyler les six sections, durcir le responsive mobile-first et l'accessibilité, consolider les animations sur une seule librairie ; (4) vérifier la performance sur l'URL déployée et polir. À la fin, un cadre pressé comprend le profil et repart impressionné en moins de 30 secondes, sur mobile comme desktop.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Fondation éditoriale** - Système de design (tokens, échelle typo) et nettoyage avant toute refonte visuelle
- [ ] **Phase 2: Hero & suppression du slider** - Accès direct au contenu, hero éditorial en flux, stratégie WebGL implémentée
- [ ] **Phase 3: Restyle sections, mobile & accessibilité** - Six sections restylées, responsive mobile-first, a11y, animations consolidées
- [ ] **Phase 4: Vérification performance & polish** - Audit Lighthouse mobile sur URL déployée et finitions

## Phase Details

### Phase 1: Fondation éditoriale
**Goal**: Le système de design minimal & éditorial existe (tokens CSS, échelle typo fluide) et le code hérité parasite est retiré, de sorte que toute la refonte visuelle qui suit s'appuie sur une base unique et propre.
**Depends on**: Nothing (first phase)
**Requirements**: FND-01, FND-02, FND-03, FND-04, FND-05
**Success Criteria** (what must be TRUE):
  1. Tous les tokens de design (couleurs, typo, espacements) sont des variables CSS consommées par Tailwind — aucune valeur hex en dur dans les composants
  2. Une échelle typographique fluide `clamp()` (display / heading / body) est disponible comme tokens Tailwind et appliquée visiblement à un écran de référence
  3. La direction visuelle minimal & éditorial (palette, polices, espacements) est documentée et validable à l'œil
  4. Le code mort (`LandingPage.tsx`, `SectionTitle` dupliqué, `Header.tsx`) et le hack `body { zoom: 0.9 }` sont supprimés, le site builde et tourne sans régression
  5. En dev, une clé de traduction manquante déclenche un avertissement visible (fin du fallback silencieux `key || key`)
**Plans**: TBD
**UI hint**: yes

Plans:
- [ ] 01-01: TBD

### Phase 2: Hero & suppression du slider
**Goal**: L'accueil donne accès direct au contenu (slider supprimé) et présente un hero éditorial où nom, titre et valeur sont lisibles dès le premier écran, avec un unique moment signature animé et la stratégie WebGL implémentée hors du chemin critique mobile.
**Depends on**: Phase 1
**Requirements**: HERO-01, HERO-02, HERO-03, HERO-04, HERO-05, NAV-02, PERF-02
**Success Criteria** (what must be TRUE):
  1. À l'ouverture du site, l'utilisateur accède directement au contenu sans aucun slider ni étape de déverrouillage
  2. Sur le plus petit mobile cible, nom + titre + proposition de valeur sont lisibles above-the-fold en FR et en EN, sans rognage (unités `svh`)
  3. Un unique moment signature animé joue sans retarder l'affichage du texte (le texte hero est dans le DOM dès le premier paint) ; la section Tagline est fondue dans le hero
  4. La visibilité de la nav et du footer découle de la position de scroll, plus d'aucun état de déverrouillage
  5. Le fond WebGL ne touche jamais le chemin critique mobile : il est désactivé ou remplacé par un fallback sur mobile selon la stratégie tranchée
**Plans**: TBD
**UI hint**: yes

Plans:
- [ ] 02-01: TBD

### Phase 3: Restyle sections, mobile & accessibilité
**Goal**: Les six sections de contenu sont restylées selon la direction éditoriale, réordonnées preuves-d'abord, entièrement responsive mobile-first et accessibles, avec les animations consolidées sur une seule librairie.
**Depends on**: Phase 2
**Requirements**: NAV-01, NAV-03, CONT-01, CONT-02, CONT-03, CONT-04, RESP-01, RESP-02, RESP-03, PERF-01, A11Y-01, A11Y-02, A11Y-03, A11Y-04
**Success Criteria** (what must be TRUE):
  1. Les six sections sont restylées via les tokens, les Expériences placées juste sous le hero, et les sections denses (Certifications, Toolbox) présentées de façon compacte et scannable ; de nouvelles entrées d'expérience figurent dans les JSON en FR et EN
  2. Le site est entièrement responsive mobile-first : aucun scroll horizontal, cibles tactiles ≥ 44×44px, plus aucun breakpoint JS en dur (768/1024)
  3. Une navigation/indicateur de progression épuré et un chemin de contact direct (`mailto:` + liens sociaux) sont accessibles en permanence
  4. Les animations sont consolidées sur `motion/react` seul (`framer-motion`, GSAP, Lenis retirés des dépendances)
  5. Accessibilité : contraste WCAG AA respecté, ordre de focus clavier logique et visible, `prefers-reduced-motion` respecté, éléments décoratifs `aria-hidden`
**Plans**: TBD
**UI hint**: yes

Plans:
- [ ] 03-01: TBD

### Phase 4: Vérification performance & polish
**Goal**: La performance mobile est vérifiée sur la production réelle et confirmée fluide, les dernières finitions appliquées — le résultat tient la promesse des 30 secondes sur un vrai téléphone.
**Depends on**: Phase 3
**Requirements**: PERF-03, PERF-04
**Success Criteria** (what must be TRUE):
  1. Un audit Lighthouse mobile sur l'URL GitHub Pages déployée montre LCP < 2.5s et CLS < 0.1
  2. Le site est validé fluide sur un vrai mobile milieu de gamme, sans jank perceptible au scroll ni aux animations
  3. Le bundle Three.js est confirmé exclu du chemin critique mobile et les micro-interactions (hover/focus/scroll) sont polies
**Plans**: TBD
**UI hint**: yes

Plans:
- [ ] 04-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Fondation éditoriale | 0/TBD | Not started | - |
| 2. Hero & suppression du slider | 0/TBD | Not started | - |
| 3. Restyle sections, mobile & accessibilité | 0/TBD | Not started | - |
| 4. Vérification performance & polish | 0/TBD | Not started | - |
