<!-- refreshed: 2026-06-16 -->
# Architecture

**Analysis Date:** 2026-06-16

## System Overview

```text
┌─────────────────────────────────────────────────────────────────┐
│                    React Router Application                      │
│                      `src/App.tsx`                               │
├──────────────────────────────────────────────────────────────────┤
│                  LanguageContext Provider                         │
│            `src/contexts/LanguageContext.tsx`                    │
│                   (French/English i18n)                          │
└────────────────┬─────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      PortfolioPage Route                         │
│               `src/pages/PortfolioPage.tsx`                      │
│          (Landing + Portfolio sections orchestrator)             │
├────────────┬───────────────────────────┬────────────────────────┤
│  HeroSection│ TaglineSection            │ ExperiencesSection     │
│  (Landing) │ ProjectsSection           │ CertificationsSection  │
│            │ EducationSection          │ ToolboxSection         │
│ `sections/ │ Footer with contact       │ `sections/*`           │
│ Hero*.tsx` │ `layout/Footer.tsx`       │                        │
└────────────┴───────────────────────────┴────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Presentation Layer                           │
│  UI Components, Animations, Styling                             │
│  `components/ui/` - Card, ProgressBar, FilterTabs, etc.         │
│  `components/layout/` - Header, Footer, ProgressNav             │
│  Custom animations - ScrollStack, DecryptedText, LiquidEther    │
└────────┬────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Data & Utilities Layer                        │
│  JSON data: `src/data/*.json`                                    │
│  Helper functions: `src/lib/utils.ts`                           │
│  Translation lookup: LanguageContext.tsx                        │
└─────────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| App | Router setup, LanguageProvider wrapper | `src/App.tsx` |
| PortfolioPage | Landing/portfolio state management, scroll tracking, section orchestration | `src/pages/PortfolioPage.tsx` |
| LanguageContext | i18n state (fr/en), translation lookup | `src/contexts/LanguageContext.tsx` |
| HeroSection | Initial landing screen with slider to unlock portfolio | `src/components/sections/HeroSection.tsx` |
| ProgressNav | Fixed header with navigation, language switcher, hire me button | `src/components/layout/ProgressNav.tsx` |
| Sections (6) | Experiences, Projects, Certifications, Education, Tagline, Toolbox | `src/components/sections/*.tsx` |
| Footer | Contact info, social links, decrypted text animations | `src/components/layout/Footer.tsx` |
| UI Primitives | Reusable cards, badges, progress bars, filters | `src/components/ui/*.tsx` |
| Animation Utils | ScrollStack (scroll-based parallax), DecryptedText, LiquidEther (WebGL) | `src/components/*.tsx` |

## Pattern Overview

**Overall:** Single Page Application with Framer Motion animations and client-side routing

**Key Characteristics:**
- Landing page acts as modal/overlay until unlocked via slider
- Content sections render below hero and animate in/out with AnimatePresence
- Intersection Observer patterns for viewport-based visibility
- Context API for language state (no Redux/Zustand)
- Static JSON data files for experiences, projects, certifications, tools
- Heavy use of Framer Motion for scroll-triggered and micro-interactions
- WebGL animation (LiquidEther via Three.js) for background effects

## Layers

**Presentation Layer:**
- Purpose: React components rendering UI and animations
- Location: `src/components/` (ui/, layout/, sections/, root .tsx files)
- Contains: Functional components with hooks, motion elements, styled containers
- Depends on: Framer Motion, React Router, Context API, data files
- Used by: Page components and each other

**Context/State Layer:**
- Purpose: Global state (language) and provider setup
- Location: `src/contexts/LanguageContext.tsx`
- Contains: React Context with i18n logic and translation map
- Depends on: React hooks
- Used by: Any component needing `useLanguage()` hook

**Data Layer:**
- Purpose: Static portfolio content (experiences, projects, etc.)
- Location: `src/data/*.json`
- Contains: JSON with structured portfolio data
- Depends on: TypeScript type safety (interface definitions in consuming components)
- Used by: Section components that map over data

**Utilities Layer:**
- Purpose: Shared helper functions
- Location: `src/lib/utils.ts`
- Contains: `cn()` function (Tailwind class merging via clsx + tailwind-merge)
- Depends on: clsx, tailwind-merge
- Used by: Components needing conditional styling

**Styling Layer:**
- Purpose: Global CSS and design tokens
- Location: `src/styles/globals.css`, `tailwind.config.js`
- Contains: Tailwind directives, custom fonts, grain texture overlay
- Depends on: Tailwind CSS, PostCSS
- Used by: All components via className

## Data Flow

### Primary Request Path: Landing to Portfolio Unlock

1. **App mounts** (`src/App.tsx:5-14`)
   - Wraps with LanguageProvider and Router
   
2. **PortfolioPage renders** (`src/pages/PortfolioPage.tsx:14-81`)
   - Initializes state: `showLanding=true`, `isFooterVisible=false`, `showProgressBar=false`
   
3. **HeroSection displays** (`src/pages/PortfolioPage.tsx:92-102`)
   - Fixed overlay with LiquidEther background and slider
   - User drags slider to >= 0.95 threshold
   
4. **`handleUnlock` fires** (`src/pages/PortfolioPage.tsx:70-76`)
   - Sets `showLanding=false`
   - Scrolls to top smoothly
   
5. **AnimatePresence transitions out HeroSection, transitions in portfolio sections** (`src/pages/PortfolioPage.tsx:92-120`)
   - Exit animation: opacity 0, y -50, 0.5s duration
   - Entry animation: opacity 1, y 0, 0.5s delay 0.2s
   
6. **Sections render in sequence:**
   - TaglineSection → ExperiencesSection → ProjectsSection → CertificationsSection → EducationSection → ToolboxSection → Footer

### Secondary Flow: Scroll-based UI Updates

1. **Scroll event triggered**
2. **PortfolioPage.useEffect (lines 29-36):**
   - Finds #experiences element
   - Calculates distance from top: `activationY = window.innerHeight * 0.35`
   - If experiences top <= activationY, shows ProgressBar
3. **IntersectionObserver (lines 46-54):**
   - Observes #footer with 0.15 threshold
   - Sets `isFooterVisible` based on intersection
   - Used to dim ProgressNav when footer is visible

### Data Access Pattern

1. Section component imports static data: `import experiencesData from '@/data/experiences.json'`
2. Uses `useLanguage()` hook: `const { language, t } = useLanguage()`
3. Maps over data array, uses `t(key)` for translations
4. Renders with Framer Motion variants for staggered animations

**State Management:**
- Global: Language (LanguageContext)
- Local: showLanding, isFooterVisible, showProgressBar (PortfolioPage component state)
- No shared UI state; sections are largely independent

## Key Abstractions

**AnimatePresence Pattern:**
- Purpose: Manage component mount/unmount animations
- Examples: `src/pages/PortfolioPage.tsx:92-120` (landing ↔ portfolio transition)
- Pattern: Framer Motion's `<AnimatePresence mode="wait">` wraps conditional render, each branch gets `key` + motion variants

**ScrollStack Custom Hook:**
- Purpose: Parallax scroll effect with scale/rotation/blur per item
- Examples: `src/components/ScrollStack.tsx`, used in ProjectsSection
- Pattern: useLayoutEffect + Lenis scroll hijacking + requestAnimationFrame for frame-synced transforms

**DecryptedText Animation:**
- Purpose: Character-by-character reveal/encryption effect
- Examples: `src/components/DecryptedText.tsx`, used in Footer
- Pattern: useState tracks revealed indices, setInterval scrambles hidden chars, Framer Motion spans track state

**LiquidEther WebGL:**
- Purpose: Interactive liquid/ether animation background
- Examples: `src/components/LiquidEther.tsx`, used in HeroSection
- Pattern: THREE.js simulation (Navier-Stokes solver), mouse tracking, auto-demo fallback

**IntersectionObserver Pattern:**
- Purpose: Viewport-based visibility detection
- Examples: PortfolioPage (footer detection), individual sections (fade-in on scroll)
- Pattern: useEffect sets up IntersectionObserver, returns cleanup disconnect

## Entry Points

**HTML Entry:**
- Location: `index.html`
- Loads: Vite module at `/src/main.tsx`
- Target: `<div id="root">`

**JavaScript Entry:**
- Location: `src/main.tsx`
- Renders: `<App />` (React 18 createRoot API)
- Imports: `src/App.tsx`, `src/styles/globals.css`

**Application Entry:**
- Location: `src/App.tsx`
- Initializes: BrowserRouter, LanguageProvider
- Routes: Single route "/" → PortfolioPage

**Page Entry:**
- Location: `src/pages/PortfolioPage.tsx`
- State management: Landing vs. portfolio display
- Orchestrates: All section components and layout

## Architectural Constraints

- **Single SPA:** One route (/) — no multi-page routing. Navigation within sections via scroll.
- **Client-side only:** No backend API calls visible. All data is static JSON.
- **Fixed landing overlay:** Hero section uses position: fixed, z-index: 30. AnimatePresence handles enter/exit.
- **Scroll hijacking:** ScrollStack component uses Lenis to smooth-scroll, interferes with native scroll in projects section.
- **Context-only state:** No Redux/Zustand. LanguageContext is sole global state holder.
- **Tailwind + custom CSS:** Styling via Tailwind utilities + globals.css for grain texture, fonts, scrollbar.
- **No env vars:** No .env configuration for API keys or settings visible in code.

## Anti-Patterns

### Duplicate SectionTitle Component

**What happens:** `src/components/SectionTitle.tsx` exists at root, but `src/components/ui/SectionTitle.tsx` also exists.
**Why it's wrong:** Component duplication causes maintenance burden. If styling changes needed, both must be updated.
**Do this instead:** Delete one duplicate (likely the root-level one) and import from `src/components/ui/SectionTitle.tsx` everywhere.

### useEffect with Retry Loop in PortfolioPage

**What happens:** Lines 38-44 set up IntersectionObserver with a retry timer that recurses if footer element not found.
**Why it's wrong:** setTimeout recursion can cause unbounded polling if footer never mounts. If component unmounts during timer, leak occurs.
**Do this instead:** Add explicit check for unmounted state or use a maximum retry count. Consider moving footer setup into Footer component's own useEffect.

### Magic string keys in LanguageContext

**What happens:** Translation keys hardcoded throughout components (e.g., `t('nav.discover')`, `t('hero.title.1')`).
**Why it's wrong:** No validation that keys exist. Typos silently return the key itself. No IDE autocomplete.
**Do this instead:** Create a TypeScript const enum or const record of all keys. Use as `t(TRANSLATION_KEYS.NAV_DISCOVER)`.

## Error Handling

**Strategy:** Minimal error handling visible. No try-catch blocks in main components.

**Patterns:**
- LanguageContext throws error if `useLanguage()` called outside provider (line 15-18)
- IntersectionObserver cleanup in useEffect return function
- No explicit error boundaries; defaults to browser console errors

## Cross-Cutting Concerns

**Logging:** No logging framework. Components use console implicitly for debugging.

**Validation:** Type safety via TypeScript interfaces (e.g., `Experience`, `Certification`). No runtime validation of data structure.

**Authentication:** No authentication layer. Portfolio is public read-only.

---

*Architecture analysis: 2026-06-16*
