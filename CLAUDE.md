# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

This is an npm workspaces monorepo. Run workspace commands from the root or from within each package directory.

**Root:**
```bash
npm install           # Install all workspace dependencies
npm run dev:backend   # Start backend with nodemon
npm run dev:frontend  # Start Next.js frontend
npm test              # Run tests across all workspaces
```

**Backend (`/backend`):**
```bash
npm run dev                              # Run with nodemon
npm run build                            # prisma generate && tsc --skipLibCheck (+ prisma migrate deploy on Render)
npm run prisma:migrate                   # Run Prisma migrations
npm run sync-reference                   # Dry run: diff src/data against the ReferenceItem table
npm run sync-reference -- --apply        # Push rules updates (skips admin-edited rows)
npm test                                 # Jest
npx jest --testPathPattern=auth          # Run a single test file
```

**Frontend (`/frontend`):**
```bash
npm run dev    # Next.js dev server on port 3000
npm run lint   # ESLint
npm test       # Jest + testing-library
```

## Environment Setup

Backend requires a `backend/.env` file:
```
DATABASE_URL=postgresql://user:password@localhost:5432/dnd_character_sheet
JWT_SECRET=your-secret
PORT=3001
FRONTEND_URL=http://localhost:3000   # Optional; added to CORS allowlist
```

Frontend requires `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Architecture

**Full-stack D&D 5.5e (One D&D) character sheet and campaign manager.**

- **Frontend:** Next.js 16 (App Router), React 18, TypeScript, global CSS with design tokens (`app/globals.css`) plus inline styles (being migrated to shared components). Deployed to Vercel.
- **Backend:** Express + TypeScript, Prisma ORM, PostgreSQL. Deployed to Render.
- **Database:** PostgreSQL. Character data stored as a flexible JSON blob in `Character.data` — avoiding rigid schema migrations for MVP iteration.

### Authentication Flow

JWT-based. The backend signs tokens (1-day expiry) with `JWT_SECRET`. The frontend stores the token in `localStorage`, and the API client at `frontend/lib/api.ts` injects it as `Authorization: Bearer <token>` on every request. On a 401 response, the client calls `logout()` and redirects to `/login`. Token expiration is also checked client-side by parsing the JWT payload (see `frontend/lib/auth.ts`).

### Frontend Data Fetching

All API calls go through the centralized client in `frontend/lib/api.ts` (methods: `get`, `post`, `put`, `patch`, `delete`). The base URL is resolved from `NEXT_PUBLIC_API_URL` or falls back to `http://localhost:3001/api`. There is no Redux or Zustand — state is managed with component-level React hooks.

API errors are thrown as `ApiError` (`status` + the server's `error` text as `message`), readable enough to show to users.

### UI Conventions

- **Tokens:** colors, spacing, radius, type scale and shadows are CSS variables in `frontend/app/globals.css`. Use them (`var(--surface)`, `var(--space-4)`, ...) instead of literal values; colors are redefined for the light theme and for print, so hardcoded colors break those. `--primary` (candle gold)/`--error` are for text and accents; fills are `--primary-strong` with `--primary-contrast` (dark ink) text and `--error-strong` with white text (the pairs meet WCAG AA in both themes). Names and page titles use `--font-display` (Alegreya SC, `.heading`); everything else uses Alegreya Sans (`--font-sans`), both loaded with `next/font` in `app/layout.tsx`.
- **Shared components** live in `frontend/app/components/ui` (import from `@/app/components/ui`): `Button`/`buttonClass` (the only button styles: `.btn` + `btn-secondary|ghost|danger`, `btn-sm|lg`), `Modal` (focus trap, Escape, labelled dialog — don't hand-roll `.modal-overlay`), `ConfirmDialog`, `Field`/`TextField`, `Stat`/`EditableStat`/`EditableNumber`, `Menu` (menu button), `Tabs`/`tabPanelProps`, `Skeleton`, `SectionHeader`.
- **Feedback:** never use `alert()`/`confirm()`. Use `useToast()` for messages and `ConfirmDialog` for confirmations. Saves should be optimistic with rollback: `useOptimisticSave()`, or `persistData()` from `useCharacterSheetData` on the sheet. Failed saves must tell the user (`describeError(message, err)`), not just `console.error`.
- **Tap to roll:** the sheet is wrapped in `DiceProvider` (`app/components/dice/DiceTray.tsx`); wrap any rollable modifier in `RollButton` (label, modifier, optional damage). Dice maths lives in `frontend/lib/dice.ts`. Class colours come from `lib/classColors.ts` (`--class-color`); portraits render through `CharacterToken`.
- **Actions card:** `ActionsCard` groups everything by timing (Action / Bonus / Reaction / Other). Rows are built live in `frontend/lib/actionRows.ts` from equipped weapons (`lib/attacks.ts`, mastery from `lib/weaponMastery.ts`), castable spells (reported by `SpellManager` via `onCastableChange`) and class resources; only custom and magic-item actions are stored in `data.actions`. Don't store generated copies of weapons, spells or mastery.
- **Conditions:** `data.conditions`/`data.exhaustion` are toggled in `ConditionsCard`; rules live in `frontend/lib/conditions.ts`. `DiceProvider` receives the active conditions and applies them only to rolls that always change: pass `kind` (`check`/`save`/`attack`/`initiative`) and `ability` to `RollButton`, don't adjust modifiers by hand. Situational effects (e.g. attacks against a Prone target) are left to the player.
- **Left column cards:** Senses, Proficiencies & Languages, Conditions and Notes use `CoreCard` (collapsible, one-line summary). `useCoreColumnFit` collapses them (Notes → Proficiencies → Senses → Conditions) when the left column would outgrow the others; the player's own open/close choice wins and is kept in `localStorage`. Notes (`data.notepad.pages`) autosave as you type and expand to a larger view (a `Modal` sharing the same editor state).
- **Sheet rules helpers:** HP changes (damage through temp HP, healing, death saves) live in `frontend/lib/hp.ts`; Short/Long Rest planning and summaries in `frontend/lib/rest.ts`. The sheet has one rest flow (header buttons → `RestDialogs`); don't add per-card rest buttons.
- **Character creation:** the wizard autosaves a draft per user in `localStorage` (`frontend/lib/characterDraft.ts`); the dashboard offers to continue or discard it. Step components must restore their state from props when revisited (see `StepAbilities`). Import/export parsing and file naming live in `frontend/lib/characterTransfer.ts`.
- **Accessibility:** tie every label to its control (`htmlFor`/`id`, or `TextField`), make clickable things buttons (see `selectableProps` for card-style choices), and keep `frontend/__tests__/a11y.test.tsx` (jest-axe) passing when adding screens.
- **Sheet structure:** the sheet page composes cards from `app/character/[id]/components/sections`; rules math lives in `frontend/lib` (`armorClass.ts`, `spellcastingSetup.ts`, `hp.ts`, `rest.ts`, `spellFilters.ts`). Add new rules logic there with tests rather than inline in render.
- **Campaigns:** pages live in `app/campaigns` (list → hub `[id]` with Party / Sessions / Encounters / Loot / Bestiary / Notes tabs → tracker `[id]/encounters/[encounterId]`). Loot items are hidden from players until `revealed`; sessions until `shared`. Prep files (`lib/campaignPrep.ts`, format `dnd55e-campaign-prep`) carry a campaign's notes, sessions, encounters, custom monsters and loot: DMs export them from the hub menu and import them as a new campaign or into one; nothing group-specific (players, characters, rolls, holders) travels. API shapes and the DM's party numbers are in `lib/campaigns.ts`; encounter rules in `lib/initiative.ts` (turn order, damage, XP) and `lib/encounterDifficulty.ts` (2024 XP budgets); stat block helpers in `lib/monsters.ts`. Pages refresh with `usePolling` (no websockets). Players never see another player's sheet or the DM's notes; the backend enforces this in `backend/src/lib/campaignViews.ts`.
- **Read-only sheet:** the DM of a character's campaign opens the real sheet with `access: 'dm'`. `SheetReadOnlyProvider` (`app/character/[id]/SheetReadOnly.tsx`) hides edit controls: new sheet controls should check `useSheetReadOnly()` (or sit in `ReadOnlyRegion`). The owner's sheet saves `data.derivedStats` (AC, passives, spell DC) via `DerivedStatsSync` so the party view shows real numbers.
- **Print:** `@media print` in `globals.css` lays the sheet out for paper; phone-only rules are `@media screen and (max-width: 767px)` so they never apply to print.
- **Theme:** dark by default, light follows the OS or the nav toggle (`data-theme` on `<html>`, see `frontend/lib/theme.ts`).

### Route Protection

`frontend/app/layout.tsx` wraps the app in `ToastProvider` → `AuthGuard` → `AppShell`. `AuthGuard` checks the stored token and redirects unauthenticated users to `/login` for protected routes; `AppShell` renders the main nav on those routes.

### Backend API Structure

Routes are mounted in `backend/src/index.ts`:
- `/api/auth` — register, login
- `/api/characters` — CRUD; protected by `authenticateToken` middleware
- `/api/campaigns` — CRUD, join by code, leave/remove members, `PUT /assign-character`; nested `/:id/encounters` (DM only), `/:id/sessions` and `/:id/items` (loot). Prep files: `POST /import` (new campaign), `GET|POST /:id/prep` (export / import into), one transaction each, in `backend/src/lib/campaignPrep.ts`. Access checks go through `loadCampaign` in `backend/src/lib/campaignAccess.ts` (404 for campaigns you aren't in)
- `/api/monsters` — a DM's custom monsters (same shape as SRD monsters, `backend/src/lib/monsterSchema.ts`)
- `/api/reference` — D&D reference data (classes, races, spells, feats, monsters, ...) served from the `ReferenceItem` table (admin-editable). `backend/src/data/*.ts` is the seed/sync source: `prisma db seed` fills an empty DB, `npm run sync-reference` pushes later rules updates.

### Rules Data (2024 / 5.5e)

`backend/src/data` follows the 2024 PHB; text comes from SRD 5.2 (CC-BY-4.0, attribution in README) where available and is summarized otherwise. Pre-2024 content is kept with `legacy: true` (never deleted — characters reference ids) and hidden from pickers. Keep ids stable; append new base items to the end of `baseItems.ts` (keys are slugs assigned in order). `backend/src/tests/referenceData.test.ts` checks cross-references. Monster stat blocks (`monsters.ts`, SRD 5.2, 2024 layout) are checked against `monsterSchema` by `backend/src/tests/monsters.test.ts`; give attacks `attackBonus` + `damage` so they're rollable.

### Key Data Models (Prisma)

- **User** — auth credentials and ownership anchor
- **Character** — belongs to User, optionally to one Campaign; stores all sheet data in a JSON `data` column. Readable by its owner and its campaign's DM (read-only); writes are owner-only
- **Campaign** — owned by a DM (User), players join via unique `joinCode`; `notes` are DM-only
- **CampaignMember** — join table between Campaign and User
- **Encounter** — a campaign's fight; `data` holds combatants (in turn order), `round`, `turn`; one `active` at a time
- **CampaignSession** — session log entry (`recap` shared, `dmNotes` private; `shared: false` hides it from players)
- **CampaignItem** — loot: `revealed` to players or not, optionally `heldBy` a character, private `dmNotes`
- **Monster** — a user's custom stat block

### CORS

The backend uses exact-match CORS validation (prevents subdomain bypass). Allowed origins: `localhost:3000`, `https://character-sheet-frontend.vercel.app`, and the `FRONTEND_URL` env var.

## Deployment

- **Backend:** `backend/render.yaml` configures Render. Build: `cd .. && npm install && cd backend && npm run build`. Start: `npm start`. On Render (`RENDER` is set) the build ends with `prisma migrate deploy` (`backend/prisma/deploy-migrations.js`), so new migrations apply on deploy and a failed one aborts it; commit migrations with the code that needs them. Render installs production dependencies only (`@types/node` is dev-only there), so Node built-ins the build imports need a declaration in `backend/src/global.d.ts`, and only ES2018 APIs type-check there (no `trimEnd`, `flat`, `at`, ...: they pass locally only because `@types/node` adds them). Check with `NODE_ENV=production npm install && npm run build` in a clean checkout. Reference data updates (`sync-reference`) aren't automatic: run it locally with `DATABASE_URL` pointed at production.
- **Frontend:** Vercel (Next.js native). Set `NEXT_PUBLIC_API_URL` to the Render backend URL.
