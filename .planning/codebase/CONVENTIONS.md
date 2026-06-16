# Coding Conventions

**Analysis Date:** 2026-06-16

## Naming Patterns

**Files:**
- PascalCase for React components: `ShinyText.tsx`, `DecryptedText.tsx`, `Card.tsx`
- camelCase for utility/helper files: `utils.ts`, `globals.css`
- kebab-case for data files: `certifications.json`, `projects.json`, `experiences.json`
- Functional components default pattern (no class components observed)

**Functions:**
- camelCase for function names: `handleSliderChange()`, `getNextIndex()`, `setDisplayText()`
- Prefix event handlers with "handle": `handleMouseEnter()`, `handleMouseLeave()`, `handleUnlock()`
- Prefix state setters with "set": `setIsPaused()`, `setDisplayText()`, `setLanguage()`
- Prefix custom hooks with "use": `useLanguage()`, `useMotionValue()`, `useAnimationFrame()`

**Variables:**
- camelCase for local variables and state: `isPaused`, `progress`, `elapsedRef`, `isViscous`
- UPPER_SNAKE_CASE for constants: `animationDuration`, `BFECC` (when representing configuration flags)
- boolean variables prefixed with "is" or verb forms: `isHovering`, `isPaused`, `isBounce`, `disabled`
- Ref variables suffixed with "Ref": `elapsedRef`, `lastTimeRef`, `mountRef`, `webglRef`

**Types and Interfaces:**
- PascalCase for all type/interface names: `ShinyTextProps`, `DecryptedTextProps`, `LanguageContextType`
- Props interfaces suffixed with "Props": `FilterTabsProps`, `HeroSectionProps`, `CardProps`
- Discriminate types with descriptive names: `SimOptions`, `LiquidEtherWebGL`, `Language`

## Code Style

**Formatting:**
- No explicit linter/formatter config detected (Prettier/ESLint not in devDependencies)
- Default formatting appears to be manual with consistent 2-space indentation
- Imports organized with blank lines between groups
- Consistent spacing around JSX attributes and destructuring

**Linting:**
- TypeScript strict mode enabled in `tsconfig.json`:
  - `strict: true`
  - `noUnusedLocals: true`
  - `noUnusedParameters: true`
  - `noFallthroughCasesInSwitch: true`
- No explicit ESLint or Prettier config detected in repository
- Code follows implicit conventions rather than explicit rules

**Type Coverage:**
- React.FC generic used for component typing: `React.FC<ShinyTextProps>`
- Full TypeScript adoption for all source files (`.tsx`, `.ts`)
- Inline type aliases alongside components: `type Language = 'fr' | 'en'`

## Import Organization

**Order:**
1. React and framework imports: `import React, { ... } from 'react'`
2. Third-party library imports: `import { motion } from 'framer-motion'`, `import * as THREE from 'three'`
3. Local context/hook imports: `import { useLanguage } from '../../contexts/LanguageContext'`
4. Component imports: `import ScrollStack from '@/components/ScrollStack'`
5. Data imports: `import projectsData from '@/data/projects.json'`
6. Asset imports: `import labNetworkUpdateImg from '@/assets/images/lab-network-update.png'`

**Path Aliases:**
- `@/` alias configured in `tsconfig.json` pointing to `./src/`
- Used consistently across all files: `@/lib/utils`, `@/components/...`, `@/contexts/...`, `@/data/...`, `@/assets/...`
- Relative imports avoided in favor of absolute `@/` imports

## Error Handling

**Patterns:**
- Context error handling with explicit throw statements:
  ```typescript
  export const useLanguage = () => {
      const context = useContext(LanguageContext);
      if (!context) {
          throw new Error('useLanguage must be used within a LanguageProvider');
      }
      return context;
  };
  ```
- Null-coalescing with optional chaining: `resolveProjectImage(project) ?? project.image`
- Guard clauses for early returns: `if (!mountRef.current) return;`

**Fallback Values:**
- Default translations provided at hook level: `const t = (key: string): string => translations[language][key] || key;`
- Prop defaults in function parameters: `disabled = false`, `speed = 2`, `pauseOnHover = false`
- Undefined coercion: `Boolean(entry?.isIntersecting)` for safe boolean conversion

## Logging

**Framework:** Native `console` API (no logging library detected)

**Patterns:**
- No explicit logging observed in codebase
- Error handling through try-catch implicit (component-level error boundaries not visible)
- Development debugging likely inline with console statements during development

## Comments

**When to Comment:**
- Animation logic: comments explain phase transitions in `ShinyText.tsx`: `// Animation goes from 0 to 100`, `// Forward animation: 0 -> 100`
- Complex algorithms: explanation of reveal direction logic in `DecryptedText.tsx`
- CSS grid overrides: `/* Grain Texture Overlay */`, `/* Minimalist Scrollbar */`
- Deliberately minimal comments - self-documenting code preferred through naming

**JSDoc/TSDoc:**
- No JSDoc annotations observed
- TypeScript types serve as inline documentation
- Interface/type definitions provide property documentation implicitly

## Function Design

**Size:**
- Small, focused functions preferred
- Utility functions kept under 10 lines: `cn()` helper 6 lines
- Complex components broken into sub-components: `SlideToBegin` extracted in `HeroSection.tsx`
- Animation logic encapsulated in `useAnimationFrame` and `useEffect` hooks

**Parameters:**
- Destructured props in function signatures: `function Card({ children, className, hover = false }: CardProps)`
- Spread operator for HTML props: `{...hoverProps}`, `{...props}`
- Default parameter values inline: `maxIterations = 20`, `revealDirection = 'start'`

**Return Values:**
- Explicit React component returns: `return <motion.span>...</motion.span>`
- Conditional rendering with ternary operators: `activeFilter === option ? ... : ...`
- Early returns for guard clauses: `if (!mountRef.current) return;`

## Module Design

**Exports:**
- Default exports for page components: `export default function PortfolioPage()`
- Named exports for utilities: `export const cn(...)`, `export const useLanguage()`
- Mix of default and named in contexts: `export const useLanguage` (named), `export const LanguageProvider` (named)

**Barrel Files:**
- No barrel/index files detected
- Direct imports from specific component files preferred: `import ShinyText from '../ShinyText'`
- JSON data files directly imported as data: `import projectsData from '@/data/projects.json'`

## Component Patterns

**Functional Components:**
- All components are functional with hooks
- Props interface defined above component: `interface ShinyTextProps { ... }` followed by `const ShinyText: React.FC<ShinyTextProps>`
- Hooks used for state management (`useState`, `useRef`, `useContext`, `useCallback`, `useEffect`)

**Event Handlers:**
- Inline arrow functions for simple handlers: `onClick={() => onFilterChange(option)}`
- useCallback for performance: `const handleMouseEnter = useCallback(() => { ... }, [pauseOnHover])`
- Native browser APIs wrapped in useEffect for DOM interaction

**Animations:**
- Framer-motion for component animations: `motion.div`, `motion.span` with variants
- GSAP imported but not used: `import gsap from 'gsap'` (unused import in some files)
- Three.js for WebGL: custom `LiquidEther` component wraps THREE.js initialization

## Tailwind CSS Usage

**Classes:**
- Utility-first approach throughout
- Responsive prefixes: `md:flex`, `sm:text-[1.625rem]`, `lg:gap-12`
- Arbitrary values allowed: `text-[10px]`, `h-[248px]`
- Custom Tailwind config colors used: `text-mint-300`, `bg-mint-50`, `text-mint-dark`
- Hover states: `hover:text-mint-dark`, `hover:border-mint-300`

**Custom Utilities:**
- `cn()` utility function combines clsx + tailwind-merge: `cn('flex ...', condition && 'border-mint-300', className)`
- Located in `src/lib/utils.ts`
- Used throughout for conditional class composition

---

*Convention analysis: 2026-06-16*
