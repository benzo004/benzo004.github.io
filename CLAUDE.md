<!-- GSD:project-start source:PROJECT.md -->

## Project

**Portfolio benzo004 — Refonte minimal & éditorial**

Portfolio personnel d'un professionnel de la cybersécurité (`benzo004.github.io`), site web statique bilingue (FR/EN) déployé sur GitHub Pages. Ce milestone est une **refonte stylistique** : on fait évoluer le site existant vers une direction **minimal & éditorial**, pensée pour qu'un cadre d'entreprise pressé saisisse et soit impressionné par le profil en quelques secondes, sur mobile comme sur desktop.

**Core Value:** Un cadre d'entreprise pressé comprend qui je suis **et repart impressionné** en moins de 30 secondes — sur mobile comme sur desktop —, l'effet "wow" venant du raffinement (typographie, espace, motion soigné) et non de la surcharge.

### Constraints

- **Tech stack** : conserver React / Vite / TypeScript / Tailwind — pas de changement de framework.
- **Hébergement** : site statique GitHub Pages — pas de runtime serveur, pas d'env vars secrètes.
- **Internationalisation** : maintenir le bilingue FR/EN existant tout au long de la refonte.
- **Données** : conserver le modèle JSON statique (`src/data/*.json`) comme source de contenu.
- **Performance mobile** : la fluidité mobile est une exigence dure, pas un bonus.

<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->

## Technology Stack

## Languages

- TypeScript 5.3.3 - Application logic, components, and configuration
- JSX/TSX - React component syntax throughout the codebase
- CSS - Styling via Tailwind CSS and PostCSS
- JavaScript - Vite configuration and build scripts
- JSON - Data files and configuration

## Runtime

- Node.js 20 (specified in GitHub Actions workflow)
- Browser (Client-side execution only)
- npm (with package-lock.json)
- Lockfile: Present (`package-lock.json`)

## Frameworks

- React 18.2.0 - UI framework
- React Router DOM 6.21.1 - Client-side routing
- Framer Motion 10.18.0 - React animation library
- Motion 12.24.10 - Animation primitives and utilities
- GSAP 3.14.2 - Animation library with ScrollTrigger
- Lenis 1.3.17 - Smooth scrolling library
- Three.js 0.167.1 - 3D JavaScript library
- Tailwind CSS 3.4.1 - Utility-first CSS framework
- PostCSS 8.4.33 - CSS transformation tool
- Autoprefixer 10.4.16 - Vendor prefixing
- Tailwind Merge 2.6.0 - Merge Tailwind class utilities
- Tailwindcss Animate 1.0.7 - Animation utilities for Tailwind
- shadcn/ui - Component library (via components.json configuration)
- Lucide React 0.562.0 - Icon library
- Vite 5.0.11 - Frontend build tool and dev server
- Vite React Plugin 4.2.1 - React support for Vite
- TypeScript 5.3.3 - Static type checking
- CLSX 2.1.1 - Conditional CSS class management
- Class Variance Authority 0.7.1 - Type-safe CSS class utilities
- MathJS 14.9.1 - Mathematical expression evaluation and computation

## Key Dependencies

- React 18.2.0 - Fundamental UI framework
- TypeScript 5.3.3 - Type safety and development experience
- Vite 5.0.11 - Build performance and dev server
- Tailwind CSS 3.4.1 - Styling foundation
- Framer Motion 10.18.0 - Rich animation capabilities for portfolio showcase
- GSAP 3.14.2 - Advanced scroll-based animations with ScrollTrigger
- Three.js 0.167.1 - 3D visual elements
- React Router DOM 6.21.1 - Application routing
- @fontsource/inter 5.0.16 - Inter font family
- @fontsource/jetbrains-mono 5.0.18 - JetBrains Mono monospace font
- @fontsource/space-grotesk 5.0.18 - Space Grotesk font family

## Configuration

- No environment variables required - static portfolio site
- `.env` files listed in `.gitignore` but none are in use
- `vite.config.ts` - Vite configuration with React plugin and path aliases
- `tsconfig.json` - TypeScript compiler options
- `tailwind.config.js` - Tailwind theme extensions and plugins
- `postcss.config.js` - PostCSS plugin configuration
- `components.json` - shadcn/ui configuration for component generation
- `package.json` - Dependency and script definitions

## Platform Requirements

- Node.js 20 or compatible
- npm or compatible package manager
- Any modern terminal/shell
- Deployment target: GitHub Pages
- Build output: Static files in `dist/` directory
- No server-side runtime required

<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->

## Conventions

## Naming Patterns

- PascalCase for React components: `ShinyText.tsx`, `DecryptedText.tsx`, `Card.tsx`
- camelCase for utility/helper files: `utils.ts`, `globals.css`
- kebab-case for data files: `certifications.json`, `projects.json`, `experiences.json`
- Functional components default pattern (no class components observed)
- camelCase for function names: `handleSliderChange()`, `getNextIndex()`, `setDisplayText()`
- Prefix event handlers with "handle": `handleMouseEnter()`, `handleMouseLeave()`, `handleUnlock()`
- Prefix state setters with "set": `setIsPaused()`, `setDisplayText()`, `setLanguage()`
- Prefix custom hooks with "use": `useLanguage()`, `useMotionValue()`, `useAnimationFrame()`
- camelCase for local variables and state: `isPaused`, `progress`, `elapsedRef`, `isViscous`
- UPPER_SNAKE_CASE for constants: `animationDuration`, `BFECC` (when representing configuration flags)
- boolean variables prefixed with "is" or verb forms: `isHovering`, `isPaused`, `isBounce`, `disabled`
- Ref variables suffixed with "Ref": `elapsedRef`, `lastTimeRef`, `mountRef`, `webglRef`
- PascalCase for all type/interface names: `ShinyTextProps`, `DecryptedTextProps`, `LanguageContextType`
- Props interfaces suffixed with "Props": `FilterTabsProps`, `HeroSectionProps`, `CardProps`
- Discriminate types with descriptive names: `SimOptions`, `LiquidEtherWebGL`, `Language`

## Code Style

- No explicit linter/formatter config detected (Prettier/ESLint not in devDependencies)
- Default formatting appears to be manual with consistent 2-space indentation
- Imports organized with blank lines between groups
- Consistent spacing around JSX attributes and destructuring
- TypeScript strict mode enabled in `tsconfig.json`:
- No explicit ESLint or Prettier config detected in repository
- Code follows implicit conventions rather than explicit rules
- React.FC generic used for component typing: `React.FC<ShinyTextProps>`
- Full TypeScript adoption for all source files (`.tsx`, `.ts`)
- Inline type aliases alongside components: `type Language = 'fr' | 'en'`

## Import Organization

- `@/` alias configured in `tsconfig.json` pointing to `./src/`
- Used consistently across all files: `@/lib/utils`, `@/components/...`, `@/contexts/...`, `@/data/...`, `@/assets/...`
- Relative imports avoided in favor of absolute `@/` imports

## Error Handling

- Context error handling with explicit throw statements:
- Null-coalescing with optional chaining: `resolveProjectImage(project) ?? project.image`
- Guard clauses for early returns: `if (!mountRef.current) return;`
- Default translations provided at hook level: `const t = (key: string): string => translations[language][key] || key;`
- Prop defaults in function parameters: `disabled = false`, `speed = 2`, `pauseOnHover = false`
- Undefined coercion: `Boolean(entry?.isIntersecting)` for safe boolean conversion

## Logging

- No explicit logging observed in codebase
- Error handling through try-catch implicit (component-level error boundaries not visible)
- Development debugging likely inline with console statements during development

## Comments

- Animation logic: comments explain phase transitions in `ShinyText.tsx`: `// Animation goes from 0 to 100`, `// Forward animation: 0 -> 100`
- Complex algorithms: explanation of reveal direction logic in `DecryptedText.tsx`
- CSS grid overrides: `/* Grain Texture Overlay */`, `/* Minimalist Scrollbar */`
- Deliberately minimal comments - self-documenting code preferred through naming
- No JSDoc annotations observed
- TypeScript types serve as inline documentation
- Interface/type definitions provide property documentation implicitly

## Function Design

- Small, focused functions preferred
- Utility functions kept under 10 lines: `cn()` helper 6 lines
- Complex components broken into sub-components: `SlideToBegin` extracted in `HeroSection.tsx`
- Animation logic encapsulated in `useAnimationFrame` and `useEffect` hooks
- Destructured props in function signatures: `function Card({ children, className, hover = false }: CardProps)`
- Spread operator for HTML props: `{...hoverProps}`, `{...props}`
- Default parameter values inline: `maxIterations = 20`, `revealDirection = 'start'`
- Explicit React component returns: `return <motion.span>...</motion.span>`
- Conditional rendering with ternary operators: `activeFilter === option ? ... : ...`
- Early returns for guard clauses: `if (!mountRef.current) return;`

## Module Design

- Default exports for page components: `export default function PortfolioPage()`
- Named exports for utilities: `export const cn(...)`, `export const useLanguage()`
- Mix of default and named in contexts: `export const useLanguage` (named), `export const LanguageProvider` (named)
- No barrel/index files detected
- Direct imports from specific component files preferred: `import ShinyText from '../ShinyText'`
- JSON data files directly imported as data: `import projectsData from '@/data/projects.json'`

## Component Patterns

- All components are functional with hooks
- Props interface defined above component: `interface ShinyTextProps { ... }` followed by `const ShinyText: React.FC<ShinyTextProps>`
- Hooks used for state management (`useState`, `useRef`, `useContext`, `useCallback`, `useEffect`)
- Inline arrow functions for simple handlers: `onClick={() => onFilterChange(option)}`
- useCallback for performance: `const handleMouseEnter = useCallback(() => { ... }, [pauseOnHover])`
- Native browser APIs wrapped in useEffect for DOM interaction
- Framer-motion for component animations: `motion.div`, `motion.span` with variants
- GSAP imported but not used: `import gsap from 'gsap'` (unused import in some files)
- Three.js for WebGL: custom `LiquidEther` component wraps THREE.js initialization

## Tailwind CSS Usage

- Utility-first approach throughout
- Responsive prefixes: `md:flex`, `sm:text-[1.625rem]`, `lg:gap-12`
- Arbitrary values allowed: `text-[10px]`, `h-[248px]`
- Custom Tailwind config colors used: `text-mint-300`, `bg-mint-50`, `text-mint-dark`
- Hover states: `hover:text-mint-dark`, `hover:border-mint-300`
- `cn()` utility function combines clsx + tailwind-merge: `cn('flex ...', condition && 'border-mint-300', className)`
- Located in `src/lib/utils.ts`
- Used throughout for conditional class composition

<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->

## Architecture

## System Overview

```text

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

- Landing page acts as modal/overlay until unlocked via slider
- Content sections render below hero and animate in/out with AnimatePresence
- Intersection Observer patterns for viewport-based visibility
- Context API for language state (no Redux/Zustand)
- Static JSON data files for experiences, projects, certifications, tools
- Heavy use of Framer Motion for scroll-triggered and micro-interactions
- WebGL animation (LiquidEther via Three.js) for background effects

## Layers

- Purpose: React components rendering UI and animations
- Location: `src/components/` (ui/, layout/, sections/, root .tsx files)
- Contains: Functional components with hooks, motion elements, styled containers
- Depends on: Framer Motion, React Router, Context API, data files
- Used by: Page components and each other
- Purpose: Global state (language) and provider setup
- Location: `src/contexts/LanguageContext.tsx`
- Contains: React Context with i18n logic and translation map
- Depends on: React hooks
- Used by: Any component needing `useLanguage()` hook
- Purpose: Static portfolio content (experiences, projects, etc.)
- Location: `src/data/*.json`
- Contains: JSON with structured portfolio data
- Depends on: TypeScript type safety (interface definitions in consuming components)
- Used by: Section components that map over data
- Purpose: Shared helper functions
- Location: `src/lib/utils.ts`
- Contains: `cn()` function (Tailwind class merging via clsx + tailwind-merge)
- Depends on: clsx, tailwind-merge
- Used by: Components needing conditional styling
- Purpose: Global CSS and design tokens
- Location: `src/styles/globals.css`, `tailwind.config.js`
- Contains: Tailwind directives, custom fonts, grain texture overlay
- Depends on: Tailwind CSS, PostCSS
- Used by: All components via className

## Data Flow

### Primary Request Path: Landing to Portfolio Unlock

### Secondary Flow: Scroll-based UI Updates

### Data Access Pattern

- Global: Language (LanguageContext)
- Local: showLanding, isFooterVisible, showProgressBar (PortfolioPage component state)
- No shared UI state; sections are largely independent

## Key Abstractions

- Purpose: Manage component mount/unmount animations
- Examples: `src/pages/PortfolioPage.tsx:92-120` (landing ↔ portfolio transition)
- Pattern: Framer Motion's `<AnimatePresence mode="wait">` wraps conditional render, each branch gets `key` + motion variants
- Purpose: Parallax scroll effect with scale/rotation/blur per item
- Examples: `src/components/ScrollStack.tsx`, used in ProjectsSection
- Pattern: useLayoutEffect + Lenis scroll hijacking + requestAnimationFrame for frame-synced transforms
- Purpose: Character-by-character reveal/encryption effect
- Examples: `src/components/DecryptedText.tsx`, used in Footer
- Pattern: useState tracks revealed indices, setInterval scrambles hidden chars, Framer Motion spans track state
- Purpose: Interactive liquid/ether animation background
- Examples: `src/components/LiquidEther.tsx`, used in HeroSection
- Pattern: THREE.js simulation (Navier-Stokes solver), mouse tracking, auto-demo fallback
- Purpose: Viewport-based visibility detection
- Examples: PortfolioPage (footer detection), individual sections (fade-in on scroll)
- Pattern: useEffect sets up IntersectionObserver, returns cleanup disconnect

## Entry Points

- Location: `index.html`
- Loads: Vite module at `/src/main.tsx`
- Target: `<div id="root">`
- Location: `src/main.tsx`
- Renders: `<App />` (React 18 createRoot API)
- Imports: `src/App.tsx`, `src/styles/globals.css`
- Location: `src/App.tsx`
- Initializes: BrowserRouter, LanguageProvider
- Routes: Single route "/" → PortfolioPage
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

### useEffect with Retry Loop in PortfolioPage

### Magic string keys in LanguageContext

## Error Handling

- LanguageContext throws error if `useLanguage()` called outside provider (line 15-18)
- IntersectionObserver cleanup in useEffect return function
- No explicit error boundaries; defaults to browser console errors

## Cross-Cutting Concerns

<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->

## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->

## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:

- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->

## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
