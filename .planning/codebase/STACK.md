# Technology Stack

**Analysis Date:** 2026-06-16

## Languages

**Primary:**
- TypeScript 5.3.3 - Application logic, components, and configuration
- JSX/TSX - React component syntax throughout the codebase

**Secondary:**
- CSS - Styling via Tailwind CSS and PostCSS
- JavaScript - Vite configuration and build scripts
- JSON - Data files and configuration

## Runtime

**Environment:**
- Node.js 20 (specified in GitHub Actions workflow)
- Browser (Client-side execution only)

**Package Manager:**
- npm (with package-lock.json)
- Lockfile: Present (`package-lock.json`)

## Frameworks

**Core:**
- React 18.2.0 - UI framework
- React Router DOM 6.21.1 - Client-side routing

**Animation & Motion:**
- Framer Motion 10.18.0 - React animation library
- Motion 12.24.10 - Animation primitives and utilities
- GSAP 3.14.2 - Animation library with ScrollTrigger
- Lenis 1.3.17 - Smooth scrolling library

**3D Graphics:**
- Three.js 0.167.1 - 3D JavaScript library

**Styling:**
- Tailwind CSS 3.4.1 - Utility-first CSS framework
- PostCSS 8.4.33 - CSS transformation tool
- Autoprefixer 10.4.16 - Vendor prefixing
- Tailwind Merge 2.6.0 - Merge Tailwind class utilities
- Tailwindcss Animate 1.0.7 - Animation utilities for Tailwind

**Components & UI:**
- shadcn/ui - Component library (via components.json configuration)
- Lucide React 0.562.0 - Icon library

**Build/Dev:**
- Vite 5.0.11 - Frontend build tool and dev server
- Vite React Plugin 4.2.1 - React support for Vite
- TypeScript 5.3.3 - Static type checking

**Utilities:**
- CLSX 2.1.1 - Conditional CSS class management
- Class Variance Authority 0.7.1 - Type-safe CSS class utilities
- MathJS 14.9.1 - Mathematical expression evaluation and computation

## Key Dependencies

**Critical:**
- React 18.2.0 - Fundamental UI framework
- TypeScript 5.3.3 - Type safety and development experience
- Vite 5.0.11 - Build performance and dev server
- Tailwind CSS 3.4.1 - Styling foundation

**Infrastructure:**
- Framer Motion 10.18.0 - Rich animation capabilities for portfolio showcase
- GSAP 3.14.2 - Advanced scroll-based animations with ScrollTrigger
- Three.js 0.167.1 - 3D visual elements
- React Router DOM 6.21.1 - Application routing

**Fonts:**
- @fontsource/inter 5.0.16 - Inter font family
- @fontsource/jetbrains-mono 5.0.18 - JetBrains Mono monospace font
- @fontsource/space-grotesk 5.0.18 - Space Grotesk font family

## Configuration

**Environment:**
- No environment variables required - static portfolio site
- `.env` files listed in `.gitignore` but none are in use

**Build:**
- `vite.config.ts` - Vite configuration with React plugin and path aliases
- `tsconfig.json` - TypeScript compiler options
- `tailwind.config.js` - Tailwind theme extensions and plugins
- `postcss.config.js` - PostCSS plugin configuration
- `components.json` - shadcn/ui configuration for component generation
- `package.json` - Dependency and script definitions

## Platform Requirements

**Development:**
- Node.js 20 or compatible
- npm or compatible package manager
- Any modern terminal/shell

**Production:**
- Deployment target: GitHub Pages
- Build output: Static files in `dist/` directory
- No server-side runtime required

---

*Stack analysis: 2026-06-16*
