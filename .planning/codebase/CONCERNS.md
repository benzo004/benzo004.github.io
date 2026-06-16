# Codebase Concerns

**Analysis Date:** 2026-06-16

## Tech Debt

**Type Safety Gaps:**
- Issue: `any` type casting used for JSON data importing without proper TypeScript interfaces
- Files: `src/components/sections/ExperiencesSection.tsx` (line 103), `src/components/LiquidEther.tsx` (line 1021)
- Impact: Runtime errors possible if JSON schema changes; IDE cannot help with refactoring; no type checking on JSON field access
- Fix approach: Create proper TypeScript interfaces for all JSON data imports (`experiences.json`, `projects.json`, `certifications.json`). Replace `as any[]` casts with properly typed objects

**Type System Laxity:**
- Issue: Complex THREE.js integration uses loosely typed props (e.g., `SimOptions`, `Uniforms` with `Record<string, { value: any }>`)
- Files: `src/components/LiquidEther.tsx` (lines 26-37, 556-590)
- Impact: No type safety for shader uniforms; difficult to catch configuration errors; hard to understand what parameters are required
- Fix approach: Create stricter type definitions for shader uniforms and simulation options; avoid `any` in uniform value types

**Implicit Type Coercion in Variables:**
- Issue: Timer and interval variables declared as `any` type instead of proper timer types
- Files: `src/components/DecryptedText.tsx` (lines 45-46)
- Impact: Cleanup may fail or behave unexpectedly; difficult to refactor timer management
- Fix approach: Use `NodeJS.Timeout | undefined` for timer variables; declare interval as `number | undefined`

## Memory Management & Resource Cleanup

**Potential Memory Leaks in Animation:**
- Issue: `DecryptedText.tsx` maintains `interval` and `timeout` with implicit `any` types that may not be properly cleared
- Files: `src/components/DecryptedText.tsx` (lines 116, 146)
- Impact: Multiple rapid re-renders could accumulate uncleaned intervals; browser memory usage grows over time on portfolio page
- Safe modification: Use explicit timer types; ensure every `setInterval`/`setTimeout` has corresponding cleanup. Test with React DevTools Profiler for interval leaks

**ResizeObserver Not Explicitly Handled:**
- Issue: `LiquidEther.tsx` creates ResizeObserver and stores ref, but disposal logic is incomplete
- Files: `src/components/LiquidEther.tsx` (line 80)
- Impact: ResizeObserver may continue monitoring after component unmount; memory leak on page navigation
- Improvement path: Explicitly call `resizeObserverRef.current?.disconnect()` in cleanup function; verify WebGL context disposal in `webglRef.current?.dispose()`

**Event Listener Accumulation:**
- Issue: Multiple scroll/resize listeners attached without cleanup in some cases
- Files: `src/pages/PortfolioPage.tsx` (lines 58-66), `src/components/layout/ProgressNav.tsx` (lines 62-64), `src/components/ui/CustomCursor.tsx` (lines 41-50)
- Impact: Duplicate listeners added on re-renders; scroll performance degradation on longer pages
- Safe modification: Verify cleanup functions always execute; use `useEffect` dependency arrays correctly; test listener count with browser DevTools

## Performance Bottlenecks

**LiquidEther WebGL Component - File Size & Complexity:**
- Problem: Largest component at 1248 lines; contains complex THREE.js simulation with no code splitting
- Files: `src/components/LiquidEther.tsx`
- Cause: All simulation logic, shader code, and render loop tightly coupled in single component
- Improvement path: Extract shader code to separate file; move simulation classes to util; use lazy loading for this heavy component. Consider `React.lazy()` for LiquidEther in landing section

**ScrollStack Animation Performance:**
- Problem: Complex scroll-driven animation with many calculated properties per scroll frame
- Files: `src/components/ScrollStack.tsx`
- Cause: `lastTransformsRef` Map grows with card count; calculations on every scroll event without debouncing
- Improvement path: Use `will-change` CSS only on active cards; implement requestAnimationFrame batching; consider visibility-based pruning

**Repeated DOM Queries:**
- Problem: `getElementById()` and `querySelectorAll()` called frequently without caching
- Files: `src/pages/PortfolioPage.tsx` (lines 30-31), `src/components/layout/ProgressNav.tsx` (lines 48-56), `src/components/ScrollFloat.tsx` (line 47)
- Cause: Dynamic elements; queries repeated in scroll handlers
- Improvement path: Cache element references in useRef; use IntersectionObserver instead of repeated DOM queries in scroll handlers

**Animation Frame Overhead:**
- Problem: `ShinyText.tsx` uses `useAnimationFrame` continuously even when off-screen
- Files: `src/components/ShinyText.tsx` (lines 40-91)
- Cause: No visibility detection; animation runs regardless of viewport
- Improvement path: Use Intersection Observer to pause/resume animation based on visibility; implement viewport detection like `useInView`

## Fragile Areas

**JSON Data Dependencies:**
- Files: `src/data/experiences.json`, `src/data/projects.json`, `src/data/certifications.json`, `src/data/tools.json`
- Why fragile: Components expect specific JSON structure without runtime validation; breaking changes cause silent failures
- Safe modification: Add runtime schema validation (e.g., Zod) at data import points; create validation layer before using data
- Test coverage: No tests for JSON schema; missing tests for language switch behavior with missing translations

**Language Context Provider:**
- Files: `src/contexts/LanguageContext.tsx` (line 157)
- Why fragile: Missing translation keys return the key itself (`key || key`), masking translation errors silently
- Safe modification: Add development warning when key not found; validate all translation keys on build; add TypeScript union type for allowed keys
- Test coverage: No tests for translation fallback; untested behavior when language switch occurs during animation

**Intersection Observer Pattern Inconsistency:**
- Files: `src/pages/PortfolioPage.tsx` (lines 38-54), `src/components/layout/ProgressNav.tsx` (lines 42-65)
- Why fragile: Different retry logic patterns; hardcoded retry timers (100ms) without exponential backoff
- Safe modification: Extract observer setup to custom hook; use standard patterns across all files; document retry limits
- Test coverage: No tests for observer cleanup or retry behavior

**Direct DOM Mutation:**
- Files: Multiple components with `getElementById()` and direct element manipulation
- Why fragile: Assumes elements exist; no defensive checks in all cases
- Safe modification: Always add null checks; consider using React refs instead of DOM queries where possible
- Test coverage: No tests for missing DOM elements

## Type Safety & Error Handling

**Missing Error Boundaries:**
- Issue: No Error Boundary component wrapping content sections
- Files: `src/App.tsx`, `src/pages/PortfolioPage.tsx`
- Impact: Single component error crashes entire page; broken animations cause blank screen
- Recommendations: Add Error Boundary at App level and around heavy components (LiquidEther, ScrollStack)

**No Validation on External Links:**
- Issue: Links in data JSON not validated; `project.link`, `companyUrl` may be malformed
- Files: `src/components/sections/ProjectsSection.tsx` (line 88), `src/components/sections/ExperiencesSection.tsx` (line 166)
- Current mitigation: `rel="noopener noreferrer"` present; basic null checks exist
- Recommendations: Validate URLs at data import; use URL constructor in validator; add fallback UI for invalid links

**Unhandled Promise Rejections:**
- Issue: `navigator.clipboard.writeText()` may fail (security context, clipboard access denied) with no error handler
- Files: `src/components/layout/Footer.tsx` (line 17)
- Current mitigation: No error handling; silent failure on clipboard permission denied
- Recommendations: Add .catch() handler; show user feedback when clipboard access fails

## Missing Test Coverage

**Critical Untested Areas:**
- `Language switching` - LanguageContext doesn't test actual UI updates when language changes; DecryptedText component behavior on language switch unknown
- `Responsive behavior` - Mobile breakpoints hardcoded (768px, 1024px) but no tests verify layout; no Cypress/Playwright E2E tests
- `ScrollStack animation` - Complex scroll calculations have no unit tests; edge cases like rapid scroll, window resize unknown
- `LiquidEther mouse interaction` - Three.js simulation mouse tracking has no test; takeoverDuration, autoDemo behavior untested
- `JSON data loading` - No tests verify all required JSON fields exist; missing data handling untested
- Files: No test files exist in repository (0 test files found in `find` search)
- Priority: **High** - Portfolio shows custom animations and interactions; bugs directly impact user experience

**Infrastructure Gaps:**
- No test runner configured (no Jest, Vitest, etc. in devDependencies)
- No test directory structure established
- No linter configured (no ESLint in devDependencies)
- No pre-commit hooks for code quality

## Scaling Limits

**Three.js Bundle Size:**
- Current capacity: Full three.js (~500KB gzipped) included for single animation
- Limit: Adds 500KB+ to initial bundle for animations only
- Scaling path: Tree-shake only used THREE modules; consider Babylon.js alternative; or replace with CSS-based animation for landing

**Translation System Scale:**
- Current capacity: ~150 translation keys hardcoded in LanguageContext
- Limit: Difficult to add new languages; hard to maintain consistency; no i18n tools
- Scaling path: Migrate to i18next or similar; split translations to external JSON; implement lazy loading of language bundles

**JSON Data Growth:**
- Current capacity: All project/experience data hardcoded in `src/data/`
- Limit: Cannot scale to large portfolios; difficult to implement pagination or filtering
- Scaling path: Consider CMS integration; implement lazy loading for data; add pagination to projects section

## Dependencies at Risk

**Three.js Version Pinning:**
- Risk: Three.js `^0.167.1` will accept any minor/patch; breaking API changes possible in future versions
- Impact: Unexpected behavior in LiquidEther component if three.js updates; difficult to debug incompatibilities
- Migration plan: Pin to exact version (`0.167.1`); add Three.js to test matrix; evaluate Three.js r270+ for future upgrades

**Lenis Scroll Library Unknown State:**
- Risk: `lenis` v1.3.17 used in ScrollStack; dependency maintenance and active development unclear
- Impact: Scroll behaviors may break with browser updates; no fallback if library unmaintained
- Migration plan: Monitor lenis repository for updates; consider native scroll behavior as fallback; test scroll-timeline CSS alternative

**Framer Motion Dependency Chain:**
- Risk: Both `framer-motion` and `motion` packages in dependencies - potential version conflicts
- Impact: Tree-shaking may fail; unpredictable behavior if versions diverge
- Migration plan: Consolidate to single motion library; remove unused imports; audit lock file for duplicates

## Security Considerations

**Email Exposure:**
- Risk: Email hardcoded in Footer component and visible in source code
- Files: `src/components/layout/Footer.tsx` (line 13)
- Current mitigation: No protection; email discoverable by bot scraping
- Recommendations: Move to environment variable; consider email obfuscation; add rate limiting to contact form (if added)

**External Link Target Security:**
- Risk: Links to external platforms (GitHub, LinkedIn, TryHackMe) included; users may be redirected to phishing sites if links corrupted
- Files: `src/components/layout/Footer.tsx` (lines 29-32), `src/data/` JSON files
- Current mitigation: `rel="noopener noreferrer"` present for target="_blank" links
- Recommendations: Validate domain names on build; add link verification CI step; consider link shortening service for verified URLs

**No Content Security Policy:**
- Risk: No CSP headers defined; vulnerability to injected scripts if JSON data compromised
- Impact: Potential XSS if JSON contains user-controlled content in future
- Recommendations: Add CSP headers in vite config; validate all data content on import

## Architectural Issues

**Global Animation State:**
- Issue: `LiquidEther` maintains global autoDriver state that survives component remounts
- Files: `src/components/LiquidEther.tsx` (lines 308-379)
- Impact: Unexpected animation behavior on rapid component lifecycle changes; animation state leaks between instances
- Improvement: Extract animation state to separate service or use Context; ensure state resets on mount

**Direct Window Global References:**
- Issue: Multiple components directly reference `window` object without checking if in browser environment
- Files: `src/components/SectionTitle.tsx` (line 15), `src/components/ui/GradientBackground.tsx` (lines 25-26), `src/pages/PortfolioPage.tsx` (line 74)
- Impact: SSR/Pre-rendering would fail if attempted; hydration mismatches possible
- Improvement: Wrap in `typeof window !== 'undefined'` checks; use `useEffect` for browser-only code

---

*Concerns audit: 2026-06-16*
