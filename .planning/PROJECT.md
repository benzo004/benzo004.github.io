# Portfolio benzo004 — Refonte minimal & éditorial

## What This Is

Portfolio personnel d'un professionnel de la cybersécurité (`benzo004.github.io`), site web statique bilingue (FR/EN) déployé sur GitHub Pages. Ce milestone est une **refonte stylistique** : on fait évoluer le site existant vers une direction **minimal & éditorial**, pensée pour qu'un cadre d'entreprise pressé saisisse et soit impressionné par le profil en quelques secondes, sur mobile comme sur desktop.

## Core Value

Un cadre d'entreprise pressé comprend qui je suis **et repart impressionné** en moins de 30 secondes — sur mobile comme sur desktop —, l'effet "wow" venant du raffinement (typographie, espace, motion soigné) et non de la surcharge.

## Requirements

### Validated

<!-- Capacités déjà présentes dans le codebase existant (brownfield). -->

- ✓ Portfolio SPA bilingue FR/EN avec sélecteur de langue — existing
- ✓ 6 sections de contenu (Expériences, Projets, Certifications, Éducation, Tagline, Toolbox) — existing
- ✓ Footer avec coordonnées et liens sociaux — existing
- ✓ Contenu piloté par données JSON statiques (`src/data/*.json`) — existing
- ✓ Stack d'animations avancées (Framer Motion, GSAP, Three.js/WebGL, Lenis) — existing
- ✓ Déploiement statique sur GitHub Pages — existing
- ✓ Hero d'accueil animé (fond WebGL liquide + slider de déverrouillage) — existing *(sera retravaillé dans ce milestone)*

### Active

<!-- Objectifs de ce milestone. Hypothèses jusqu'à mise en ligne et validation. -->

- [ ] Restyle complet du site vers une direction visuelle **minimal & éditorial** (typo forte, espace, hiérarchie nette)
- [ ] Suppression du slider de déverrouillage de l'accueil — accès direct au contenu, zéro friction
- [ ] Hero éditorial : nom / titre / valeur lisibles immédiatement, avec **un seul** moment signature animé
- [ ] Site **totalement responsive mobile** (approche mobile-first)
- [ ] Navigation simplifiée permettant une lecture utile en moins de 30 secondes
- [ ] Ajout de nouvelles expériences (contenu) dans les données
- [ ] Stratégie du fond WebGL à trancher en phase design (allégé desktop / désactivé mobile, vs retrait complet)

### Out of Scope

<!-- Frontières explicites avec raison, pour éviter de les ré-ajouter. -->

- Refonte « from-scratch » / nouveau design system complet — choix assumé de garder la structure existante (meilleur rapport effort/impact)
- Backend, base de données ou API — le site reste 100% statique (GitHub Pages)
- CV téléchargeable (PDF) — non retenu pour cette itération
- Formulaire de contact — non retenu pour cette itération (liens directs suffisent)
- Témoignages / recommandations — non retenu pour cette itération
- Blog / articles / veille cyber — non retenu pour cette itération

## Context

- **Brownfield** : codebase existant et cartographié (voir `.planning/codebase/`). React 18 + Vite + TypeScript + Tailwind, animations Framer Motion / GSAP / Three.js / Lenis, shadcn/ui, Lucide.
- **Cible précise** : un cadre d'entreprise qui a peu de temps, qui « a déjà vu beaucoup de portfolios », et qu'il faut impressionner par la qualité d'exécution.
- **Tension centrale** : minimalisme + navigation rapide d'un côté, effet « wow » créatif de l'autre. Résolue par la direction *minimal & éditorial*, où le raffinement EST le wow.
- **Friction identifiée** : le slider de déverrouillage actuel bloque l'accès immédiat au contenu — incompatible avec une cible pressée.
- **Points de vigilance hérités** (cf. `.planning/codebase/CONCERNS.md`) : perf du fond WebGL (Three.js), composant `SectionTitle` dupliqué, boucle de retry dans `PortfolioPage`, clés de traduction en chaînes magiques, absence de tests.

## Constraints

- **Tech stack** : conserver React / Vite / TypeScript / Tailwind — pas de changement de framework.
- **Hébergement** : site statique GitHub Pages — pas de runtime serveur, pas d'env vars secrètes.
- **Internationalisation** : maintenir le bilingue FR/EN existant tout au long de la refonte.
- **Données** : conserver le modèle JSON statique (`src/data/*.json`) comme source de contenu.
- **Performance mobile** : la fluidité mobile est une exigence dure, pas un bonus.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Direction visuelle minimal & éditorial | Impressionne par le raffinement, pas la surcharge ; se navigue vite | — Pending |
| Garder la structure existante (vs refonte from-scratch) | Meilleur rapport effort/impact, structure éprouvée | — Pending |
| Supprimer le slider de déverrouillage | Friction n°1 pour un cadre pressé | — Pending |
| Responsive mobile complet, approche mobile-first | La cible peut consulter sur mobile ; exigence dure | — Pending |
| Hero éditorial avec un seul moment signature | Wow maîtrisé sans rebloquer la navigation | — Pending |
| Sort du fond WebGL à trancher en phase design | Arbitrage perf mobile vs effet wow | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-06-16 after initialization*
