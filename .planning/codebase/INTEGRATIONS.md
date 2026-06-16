# External Integrations

**Analysis Date:** 2026-06-16

## APIs & External Services

**Professional Platforms (Links Only):**
- HackTheBox - Cybersecurity training platform
  - Link: `https://app.hackthebox.com/users/2224924`
  - SDK/Client: None (external link only)
  - Location: `src/components/layout/Footer.tsx`

- TryHackMe - Penetration testing training platform
  - Link: `https://tryhackme.com/p/benzo004`
  - SDK/Client: None (external link only)
  - Location: `src/components/layout/Footer.tsx`

- LinkedIn - Professional networking
  - Link: `https://www.linkedin.com/in/andriiz/`
  - SDK/Client: None (external link only)
  - Location: `src/components/layout/Footer.tsx`, `src/pages/LandingPage.tsx`

- GitHub - Code repository hosting
  - Link: `https://github.com/benzo004`
  - SDK/Client: None (external link only)
  - Location: `src/components/layout/Footer.tsx`, `src/pages/LandingPage.tsx`

## Data Storage

**Databases:**
- None - Static portfolio site

**File Storage:**
- Local filesystem only
- Static assets in `public/` directory
- Images stored in `src/assets/images/`:
  - `lab-network-update.png`
  - `osint-intelligence-update.png`
  - `pentest-silverhand.png`
  - `icon.png` (favicon)

**Caching:**
- Browser caching via HTTP headers (standard static site)
- No application-level caching service

## Data Retrieval

**Static Data Files:**
All portfolio content is loaded from JSON files in `src/data/`:
- `certifications.json` - Loaded in `src/components/sections/CertificationsSection.tsx`
- `experiences.json` - Loaded in `src/components/sections/ExperiencesSection.tsx`
- `projects.json` - Loaded in `src/components/sections/ProjectsSection.tsx`
- `tools.json` - Loaded in `src/components/sections/ToolboxSection.tsx`
- `platforms.json` - Professional platform definitions
- `links.json` - External links and social profiles

## Authentication & Identity

**Auth Provider:**
- None - Static public portfolio site
- No authentication mechanism required

## Monitoring & Observability

**Error Tracking:**
- None - No error tracking service integrated

**Logs:**
- Console logging only via standard browser DevTools
- No centralized logging service

## CI/CD & Deployment

**Hosting:**
- GitHub Pages
- Deployment configuration: `.github/workflows/deploy-pages.yml`
- Branch: `main`
- Automatic deployment on push to main or manual trigger

**CI Pipeline:**
- GitHub Actions
- Workflow file: `.github/workflows/deploy-pages.yml`
- Build steps:
  1. Checkout code (actions/checkout@v4)
  2. Setup Node.js 20 (actions/setup-node@v4) with npm cache
  3. Install dependencies (npm ci)
  4. Build project (npm run build)
  5. Configure GitHub Pages (actions/configure-pages@v5)
  6. Upload dist artifact (actions/upload-pages-artifact@v3)
  7. Deploy artifact (actions/deploy-pages@v4)

## Environment Configuration

**Required env vars:**
- None - Static portfolio requires no environment variables

**Optional env vars:**
- `.env` file pattern defined in `.gitignore` but not used
- No API keys, secrets, or credentials required

**Secrets location:**
- Not applicable - no secrets in use

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

## Third-Party Services

**Visual & Design Components:**
- shadcn/ui - Component library (configuration in `components.json`)
- Registry: `https://reactbits.dev/r/{name}.json` for @react-bits components
- Icon provider: Lucide React icons

**Font Delivery:**
- Self-hosted fonts via @fontsource packages (no CDN dependency)
- No external font loading service

## Build & Deployment Dependencies

**Build Tools:**
- Vite 5.0.11 - Development server and build tool
- TypeScript 5.3.3 - Type compilation
- PostCSS 8.4.33 - CSS processing
- Autoprefixer 10.4.16 - CSS vendor prefixes

**Package Management:**
- npm registry for dependency installation
- package-lock.json for version pinning

---

*Integration audit: 2026-06-16*
