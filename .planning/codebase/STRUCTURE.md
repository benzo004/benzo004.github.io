# Codebase Structure

**Analysis Date:** 2026-06-16

## Directory Layout

```
benzo004.github.io/
├── src/                          # Application source code
│   ├── main.tsx                  # Vite entry point (React 18 createRoot)
│   ├── App.tsx                   # Router + LanguageProvider wrapper
│   ├── vite-env.d.ts            # Vite type definitions
│   ├── components/               # React components (33 files)
│   │   ├── sections/            # Page sections (6 major sections)
│   │   │   ├── HeroSection.tsx
│   │   │   ├── TaglineSection.tsx
│   │   │   ├── ExperiencesSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── CertificationsSection.tsx
│   │   │   ├── EducationSection.tsx
│   │   │   └── ToolboxSection.tsx
│   │   ├── layout/               # Page layout wrappers
│   │   │   ├── Header.tsx       # Navigation (unused in current implementation)
│   │   │   ├── Footer.tsx       # Contact + social links + decrypted text
│   │   │   └── ProgressNav.tsx  # Fixed nav bar (shown after landing)
│   │   ├── ui/                   # Reusable UI primitives
│   │   │   ├── Card.tsx
│   │   │   ├── SectionTitle.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── FilterTabs.tsx
│   │   │   ├── ToolBadge.tsx
│   │   │   ├── LanguageSwitcher.tsx
│   │   │   ├── CustomCursor.tsx
│   │   │   ├── GradientBackground.tsx
│   │   │   └── FloatingElement.tsx
│   │   ├── LiquidEther.tsx       # WebGL animation wrapper (Three.js)
│   │   ├── ScrollStack.tsx       # Parallax scroll component (Lenis)
│   │   ├── ScrollFloat.tsx       # Floating element on scroll
│   │   ├── DecryptedText.tsx     # Character scramble/reveal effect
│   │   ├── ShinyText.tsx         # Shimmer/shine text animation
│   │   └── SectionTitle.tsx      # Duplicate (root-level, unused)
│   ├── pages/                    # Page components (route-level)
│   │   ├── PortfolioPage.tsx     # Single page: landing + 6 sections
│   │   └── LandingPage.tsx       # Unused
│   ├── contexts/                 # React Context
│   │   └── LanguageContext.tsx   # Global i18n state (fr/en)
│   ├── lib/                      # Utilities
│   │   └── utils.ts             # cn() Tailwind class merging helper
│   ├── data/                     # Static portfolio content
│   │   ├── experiences.json      # Work history + coaching
│   │   ├── projects.json         # Cybersecurity + other projects
│   │   ├── certifications.json   # Credentials + in-progress
│   │   ├── tools.json            # Skills/toolbox badges
│   │   ├── platforms.json        # Platform credentials
│   │   └── links.json            # Social/contact links
│   ├── assets/                   # Static files
│   │   └── images/              # Project/section images
│   │       ├── lab-network-update.png
│   │       ├── pentest-silverhand.png
│   │       └── osint-intelligence-update.png
│   └── styles/                   # Global styling
│       └── globals.css          # Tailwind directives + custom CSS
│
├── public/                       # Static assets served as-is
│   └── icon.png                 # Favicon + apple-touch-icon
│
├── .planning/                    # Planning documents (generated)
│   └── codebase/                # Codebase analysis
│       ├── ARCHITECTURE.md      # Architecture patterns, layers, data flow
│       └── STRUCTURE.md         # Directory layout, file purposes (this file)
│
├── .github/                      # GitHub configuration
│   └── workflows/               # CI/CD pipelines (if any)
│
├── index.html                    # HTML entry point
├── vite.config.ts               # Vite bundler config
├── tailwind.config.js           # Tailwind CSS config
├── tsconfig.json                # TypeScript compiler options
├── tsconfig.node.json           # TypeScript for Node (Vite config)
├── package.json                 # Dependencies + scripts
├── postcss.config.js            # PostCSS config (Tailwind)
├── components.json              # UI component config (shadcn/ui style)
└── .gitignore                   # Git exclusions
```

## Directory Purposes

**`src/`:**
- Purpose: All application source code
- Contains: Components, pages, contexts, utilities, styles, data
- Key files: `main.tsx`, `App.tsx`, `pages/PortfolioPage.tsx`

**`src/components/`:**
- Purpose: Reusable React components
- Contains: 33 TSX files across 4 subdirectories + root-level animation components
- Key files: Section components in `sections/`, layout wrappers in `layout/`, UI primitives in `ui/`

**`src/components/sections/`:**
- Purpose: Full-page section components (content areas)
- Contains: 7 files representing the 6 visible sections + 1 unused
- Pattern: Each imports data from `@/data/*.json`, uses `useLanguage()` hook, applies Framer Motion animations

**`src/components/layout/`:**
- Purpose: Page-level wrapper/navigation components
- Contains: Header (unused), Footer (contact + social), ProgressNav (fixed nav bar)
- Pattern: Footer uses DecryptedText for animated email/text reveal

**`src/components/ui/`:**
- Purpose: Reusable, single-responsibility UI components
- Contains: Card, SectionTitle, ProgressBar, FilterTabs, ToolBadge, LanguageSwitcher, CustomCursor, GradientBackground, FloatingElement
- Pattern: Styled via Tailwind, composed into larger components

**`src/pages/`:**
- Purpose: Route-level page components
- Contains: PortfolioPage (active), LandingPage (unused stub)
- Pattern: Single-page application; PortfolioPage orchestrates all sections

**`src/contexts/`:**
- Purpose: React Context providers for global state
- Contains: LanguageContext (i18n state + translation lookup)
- Pattern: Exports provider component and `useLanguage()` hook

**`src/lib/`:**
- Purpose: Utility functions
- Contains: `cn()` helper for merging Tailwind classes with clsx + tailwind-merge
- Pattern: Imported by components needing conditional styling

**`src/data/`:**
- Purpose: Static portfolio content as JSON
- Contains: 6 JSON files with structured data (experiences, projects, certifications, tools, platforms, links)
- Pattern: Imported directly in section components, typed via TypeScript interfaces defined in consuming components

**`src/assets/`:**
- Purpose: Project images and static media
- Contains: Subdirectory `images/` with PNG project screenshots
- Pattern: Imported in ProjectsSection.tsx for lazy-loaded display

**`src/styles/`:**
- Purpose: Global CSS and design tokens
- Contains: `globals.css` with Tailwind directives, custom fonts, grain texture overlay, scrollbar styling
- Pattern: Imported in `main.tsx`, applied to entire application

**`public/`:**
- Purpose: Static files served directly by Vite dev server and build output
- Contains: `icon.png` (favicon + apple-touch-icon)
- Pattern: Linked in `index.html`, never bundled

## Key File Locations

**Entry Points:**
- `index.html` - HTML root, loads `<div id="root">` + `<script type="module" src="/src/main.tsx">`
- `src/main.tsx` - JavaScript entry, mounts React app via createRoot
- `src/App.tsx` - Application entry, wraps BrowserRouter + LanguageProvider

**Configuration:**
- `vite.config.ts` - Build/dev server config, path alias `@` → `./src`
- `tsconfig.json` - TypeScript strict mode, path aliases, JSX react-jsx
- `tailwind.config.js` - Tailwind theme extensions (fonts, colors, border-radius)
- `package.json` - Dependencies (React, Framer Motion, Three.js, Tailwind, etc.)

**Core Logic:**
- `src/pages/PortfolioPage.tsx` - Page orchestrator, landing state, scroll detection
- `src/contexts/LanguageContext.tsx` - i18n state + translation map
- `src/components/sections/*.tsx` - 6 main content sections
- `src/data/*.json` - Portfolio content

**Testing:**
- None visible — no test files found (no `.test.tsx` or `.spec.ts` files)

## Naming Conventions

**Files:**
- PascalCase for component files: `HeroSection.tsx`, `ExperiencesSection.tsx`, `ProgressNav.tsx`
- camelCase for utility/helper files: `utils.ts`, `globals.css` (CSS file)
- camelCase for data files: `experiences.json`, `certifications.json`
- Descriptive names: `DecryptedText.tsx`, `LiquidEther.tsx`, `ScrollStack.tsx`

**Directories:**
- lowercase for feature/domain directories: `components/`, `sections/`, `layout/`, `ui/`, `data/`, `assets/`
- Hierarchical: `src/components/sections/`, `src/components/layout/`, `src/components/ui/`

**TypeScript Types:**
- PascalCase interfaces: `Experience`, `Certification`, `Project`, `Tool`
- Props interfaces: `{ComponentName}Props` (e.g., `HeroSectionProps`, `DecryptedTextProps`)
- Verb-based type names: `ScrollStackItemProps`, `LiquidEtherProps`

**Variables/Functions:**
- camelCase for functions: `handleUnlock()`, `setShowLanding()`, `useLanguage()`
- camelCase for state: `showLanding`, `isFooterVisible`, `language`
- SCREAMING_SNAKE_CASE for constants: `TRANSLATION_KEYS` (if defined)

## Where to Add New Code

**New Section/Feature:**
- Create `src/components/sections/{FeatureName}Section.tsx`
- Import `useLanguage()` and relevant data from `src/data/`
- Export default function component
- Add to PortfolioPage.tsx imports and render (around line 4-11, 111-116)

**New UI Component:**
- Create `src/components/ui/{ComponentName}.tsx`
- Export as default or named export
- Style via Tailwind className + optional cn() merging
- Document props interface

**New Utility Function:**
- Add to `src/lib/utils.ts` or create new file in `src/lib/`
- Export as named export
- Import via `@/lib/utils` or `@/lib/{filename}`

**New Global Context/State:**
- Create `src/contexts/{FeatureName}Context.tsx`
- Define context type, create context, export provider component + hook
- Wrap provider in `src/App.tsx` (inside or alongside LanguageProvider)

**New Static Data:**
- Add JSON file to `src/data/{featureName}.json`
- Define TypeScript interface in consuming component or shared types file
- Import via `import data from '@/data/{featureName}.json'`

**New Animation Component:**
- If scroll-based: extend ScrollStack pattern in `src/components/ScrollStack.tsx`
- If custom: create `src/components/{AnimationName}.tsx` using Framer Motion
- Wrap consumers with motion.div or motion.span, apply variants prop

**New Page:**
- Create `src/pages/{PageName}.tsx`
- Add route to `src/App.tsx` Router (currently only "/" exists)
- Note: Current arch is single-page; adding routes requires Header/nav updates

## Special Directories

**`.planning/`:**
- Purpose: Planning and analysis documents
- Generated: Yes (by GSD agents)
- Committed: Yes (documents tracked in git, not .gitignored)

**`node_modules/`:**
- Purpose: Installed npm dependencies
- Generated: Yes (from package-lock.json)
- Committed: No (.gitignored)

**`.git/`:**
- Purpose: Git version control
- Generated: Yes (git init)
- Committed: N/A (not committed, but part of repo)

---

*Structure analysis: 2026-06-16*
