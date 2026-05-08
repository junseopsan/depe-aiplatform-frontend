# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Critical: Next.js 16 + React 19

This project pins **Next.js 16.2.4** and **React 19.2.4**. Many APIs differ from older training data — the `@AGENTS.md` rule above is non-negotiable. Concrete gotchas already encountered:

- `error.tsx` / `global-error.tsx` props are `{ error, unstable_retry }` (not `reset`).
- Route handlers / pages receive `params` as a `Promise<{...}>` and must `await` it.
- Dev runs on Turbopack by default.

When in doubt, read the matching file under `node_modules/next/dist/docs/01-app/` rather than guessing.

## Commands

```bash
npm run dev      # Dev server (Turbopack)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint via eslint-config-next
```

There is **no test runner configured** — do not invent `npm test`. If you need to verify behavior, run dev and curl routes (or open in a browser).

`@/*` resolves to `./src/*`.

## Architecture

### Routing surfaces (`src/app/`)

Three independent surfaces share the root layout:

- `/` → `redirect('/projects')`
- `/projects` (list) and `/projects/[projectId]` (detail).
  The detail route has its own `[projectId]/layout.tsx` that fetches a project from `MOCK_PROJECTS`, calls `notFound()` if missing, and renders `ProjectInfoBar` above `{children}`. The leaf `page.tsx` is the route's content slot.
- `/components` — internal design-system docs. Has its own `layout.tsx` with `ComponentDocsSidebar`; intentionally inherits the root `AppHeader` from above.

Root layout (`src/app/layout.tsx`) mounts `AppHeader` (which contains `TopLoadingBar`) globally. App-wide error boundaries: `error.tsx`, `global-error.tsx`, `not-found.tsx`.

### Component layers (3-tier)

The naming rule in `@AGENTS.md` is enforced by folder location. Summary:

- `src/components/ui/Ui*` — design system primitives, built on `@base-ui/react` + `cva` variants. No business logic.
- `src/components/common/<Role>` — app chrome (`AppHeader`, `TopLoadingBar`). May reference routes / branding.
- `src/features/<feature>/components/<Domain>` — feature-scoped, colocated with the feature's `data/`, `types/`, `utils/`.

The `Ui` prefix is **reserved for primitives**. Don't apply it to app or feature components.

### Styling

- Tailwind v4 + `tw-animate-css` + shadcn (`base-nova` style, see `components.json`).
- Design tokens are CSS variables in `src/styles/tokens.css` — reference as `var(--primary-500)`, `var(--gray-200)`, etc. The same palette is mirrored at `doc/common.css` for HTML prototypes.
- Compose classNames with `cn()` from `@/lib/utils` (clsx + tailwind-merge).
- Build variant components with `cva` (class-variance-authority).
- Icons: `lucide-react`. Fonts: IBM Plex Sans KR / IBM Plex Mono (loaded in `globals.css`).

### Design reference: `doc/`

`doc/` holds the canonical HTML prototypes and `common.css`. When implementing UI from a screenshot or comp, **check the matching `doc/*.html`** for exact heights, paddings, and class structures before writing Tailwind — the screenshots may not show every spec value.

### Data pattern

Each feature owns its mock data under `src/features/<feature>/data/`. Server components look up by id and `notFound()` on miss. The pattern is designed to be swapped for real fetches without changing the route structure.

## Conventions

- Arrow function exports preferred (`export const X = () => {}`) over `function` declarations.
- Branches: `<type>/DAP-<issue#>-description` (e.g., `feat/DAP-579-common-header-component`).
- When editing a `Ui*` component that has a sibling `*-docs.md`, update the doc in the same change.
- Task notes live in `tasks/` as markdown named after the branch.

## CI / AI review

`.gitlab-ci.yml` runs `scripts/ai-review.py` on merge request events. The script fetches the MR diff via the GitLab API and posts a Gemini-generated review as a comment. CI env vars: `CI_SERVER_URL`, `CI_PROJECT_ID`, `CI_MERGE_REQUEST_IID`, `GITLAB_TOKEN`, `GEMINI_API_KEY`. Optional: `GEMINI_MODEL` (default `gemini-2.5-flash`), `AI_REVIEW_MAX_RETRIES`, `AI_REVIEW_RETRY_DELAY`, `AI_REVIEW_MAX_DIFF_CHARS`.
