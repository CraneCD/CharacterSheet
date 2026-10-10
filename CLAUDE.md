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

JWT-based. The backend signs tokens with `JWT_SECRET`: a day for a browser tab, no expiry for the installed app (login sends `device: true` when `isInstalledApp()`). Tokens carry the account's `tokenVersion` (`tv`), checked by `authenticateToken`; `POST /auth/logout-all` (Account → Sign out everywhere) and password changes bump it, ending every session (a password change returns a fresh token for the device that made it). The frontend stores the token in `localStorage`, and the API client at `frontend/lib/api.ts` injects it as `Authorization: Bearer <token>` on every request. On a 401 response, the client calls `logout()` and redirects to `/login`. Token expiration is also checked client-side by parsing the JWT payload (see `frontend/lib/auth.ts`).

### Frontend Data Fetching

All API calls go through the centralized client in `frontend/lib/api.ts` (methods: `get`, `post`, `put`, `patch`, `delete`). The base URL is resolved from `NEXT_PUBLIC_API_URL` or falls back to `http://localhost:3001/api`. There is no Redux or Zustand — state is managed with component-level React hooks.

API errors are thrown as `ApiError` (`status` + the server's `error` text as `message`), readable enough to show to users.

### UI Conventions

- **Tokens:** colors, spacing, radius, type scale and shadows are CSS variables in `frontend/app/globals.css`. Use them (`var(--surface)`, `var(--space-4)`, ...) instead of literal values; colors are redefined for the light theme and for print, so hardcoded colors break those. `--primary` (candle gold)/`--error` are for text and accents; fills are `--primary-strong` with `--primary-contrast` (dark ink) text and `--error-strong` with white text (the pairs meet WCAG AA in both themes). Names and page titles use `--font-display` (Alegreya SC, `.heading`); everything else uses Alegreya Sans (`--font-sans`), both loaded with `next/font` in `app/layout.tsx`.
- **Shared components** live in `frontend/app/components/ui` (import from `@/app/components/ui`): `Button`/`buttonClass` (the only button styles: `.btn` + `btn-secondary|ghost|danger`, `btn-sm|lg`), `Modal` (focus trap, Escape, labelled dialog — don't hand-roll `.modal-overlay`), `ConfirmDialog`, `Field`/`TextField`, `Stat`/`EditableStat`/`EditableNumber`, `Menu` (menu button), `Tabs`/`tabPanelProps`, `Skeleton`, `SectionHeader`.
- **Feedback:** never use `alert()`/`confirm()`. Use `useToast()` for messages and `ConfirmDialog` for confirmations. Saves should be optimistic with rollback: `useOptimisticSave()`, or `persistData()` from `useCharacterSheetData` on the sheet. Failed saves must tell the user (`describeError(message, err)`), not just `console.error`.
- **Tap to roll:** the sheet is wrapped in `DiceProvider` (`app/components/dice/DiceTray.tsx`); wrap any rollable modifier in `RollButton` (label, modifier, optional damage). Dice maths lives in `frontend/lib/dice.ts`. Class colours come from `lib/classColors.ts` (`--class-color`); portraits render through `CharacterToken`.
- **Actions card:** `ActionsCard` groups everything by timing (Action / Bonus / Reaction / Other). Rows are built live in `frontend/lib/actionRows.ts` from equipped weapons (`lib/attacks.ts`, mastery from `lib/weaponMastery.ts`), castable spells (reported by `SpellManager` via `onCastableChange`) and class resources; only custom and magic-item actions are stored in `data.actions`. Don't store generated copies of weapons, spells or mastery. Magic weapons add their bonus to attack and damage, and magic armor and shields to AC (`lib/magicBonus.ts`, used by `attacks.ts` and `armorClass.ts`): the item's `magicBonus` (set in the Gear tab; 0 = none), else read from its name ("Pistol, +1", "Shield +2") or SRD text. Other magic items can be equipped (worn/attuned) for their `wornBonus` (`lib/wornItems.ts`: AC, saving throws, weapon attack/damage, optionally only with some weapons or only unarmored), read from SRD text (Ring of Protection, Bracers of Archery, Bracers of Defense) until set by hand in the Gear tab. Weapons with the Ammunition property fire a gear item (`lib/ammunition.ts`: `ammunition` names it, unset = the usual kind such as Arrows, `null` = untracked); the Actions card shows what's left, spends one per attack roll and has −/+ to adjust (PATCHing only that item's `quantity`). Magic items' actions are stored ones with `item` (the gear item's name) and `charges` (spent per use): the Gear tab's "+ Action" dialog (`ItemActionDialog`) adds each as an Action, Bonus Action, Reaction or Other with its own name and text; names must be unique (the backend drops duplicates), and item actions are never treated as generated spell/attack copies. Item charges (`lib/itemCharges.ts`) live on the item (`charges: { current, max, regain }`; read from "has 7 charges ... regains 1d6 + 1 expended charges daily at dawn" until stored, `null` = not tracked); `ItemChargesCounter` spends them in the Gear row and on the item's action rows, and the Long Rest regains them (`planLongRest(data, ctx, random)` rolls; without `random` the preview only describes it). Mage Armor is `data.mageArmor`, toggled under the AC (shown while on or when it would raise AC), applied in `armorClass.ts` and ended by a Long Rest.
- **Markdown text:** item descriptions and Actions card rows render through `Markdown` (`@/app/components/ui`, parser in `lib/markdown.ts`): **bold**, *italic*, `code`, https links, `#` headings, `-`/`1.` lists and pipe tables; each line is its own paragraph. It builds React elements (never HTML), so text can't inject markup; use `stripMarkdown` for one-line previews. Players can rewrite an item's description in the Gear tab; on an item from the item list that sets `descriptionEdited`, which keeps their text over the list's live text until reset.
- **Conditions:** `data.conditions`/`data.exhaustion` are toggled in `ConditionsCard`; rules live in `frontend/lib/conditions.ts`. `DiceProvider` receives the active conditions and applies them only to rolls that always change: pass `kind` (`check`/`save`/`attack`/`initiative`) and `ability` to `RollButton`, don't adjust modifiers by hand. Situational effects (e.g. attacks against a Prone target) are left to the player. Worn gear works the same way: `lib/armorPenalties.ts` gives Disadvantage on Stealth from equipped armor (`stealthDisadvantage`, editable in the Gear tab; Mithral drops it) and −10 ft. Speed when Strength is below the armor's `strengthRequirement`; pass gear Disadvantage to `RollButton`'s `disadvantage` so the number is flagged and the tray says why.
- **Features & limited uses:** `FeaturesCard` (sheet's Features tab) groups features by source (`lib/featureList.ts`: Species, Background, Feats, each class and subclass, Custom), collapsed to one line with search and filters. Custom features (`custom: true` in `data.features`) are added and edited in a dialog and can have uses; stored features are edited/removed by index plus name (`PUT|DELETE /characters/:id/features`) because the card's list isn't `data.features`' order. Every counter (class resources, and uses of species traits, feats, subclass and custom features) lives in `data.classResources`, tagged with `source`/`feature`; `lib/featureUses.ts` holds the trait/feat/subclass uses table and `LimitedUsesProvider` (`sections/ClassResourcesSection.tsx`) adds, rescales and saves them. Both `FeaturesCard` and `LimitedUsesCard` (Combat tab) read that shared state via `useSheetLimitedUses()`; a hand-edited maximum is kept (`maxEdited`) until reset. Add new limited-use features to `FEATURE_USES`, not as new cards. Species spells live in `SPECIES_LINEAGE_SPELLS` (`lib/wizardReference.ts`) with the trait that grants them and `free: 'once' | 'pb'` for casts without a slot; those become counters named after the spell (with `spellId`), shown on the spell in the Spells tab, on the trait in Features, and as "free" uses in the Actions card. Magic Initiate's level 1 spell works the same way ("<Spell> (Magic Initiate)", source `feat`; the old `magicInitiateSpell1Used` flag is folded in and cleared). Species spells use `data.speciesSpellAbility` (Int/Wis/Cha, Charisma if unset), chosen at creation or in `SpeciesSpellSettings` on the Spells tab, and the Actions card rolls species and Magic Initiate spells with their own numbers (`spellcastingBySource`). Kobold Legacy is a lineage choice; Draconic Sorcery stores its Sorcerer cantrip in `data.speciesCantrip`.
- **Left column cards:** Senses, Proficiencies & Languages, Conditions and Notes use `CoreCard` (collapsible, one-line summary). `useCoreColumnFit` collapses them (Notes → Proficiencies → Senses → Conditions) when the left column would outgrow the others; the player's own open/close choice wins and is kept in `localStorage`. Notes (`data.notepad.pages`) autosave as you type and expand to a larger view (a `Modal` sharing the same editor state).
- **Sheet rules helpers:** HP changes (damage through temp HP, healing, death saves) live in `frontend/lib/hp.ts`; Short/Long Rest planning and summaries in `frontend/lib/rest.ts`. The sheet has one rest flow (header buttons → `RestDialogs`); don't add per-card rest buttons.
- **Character creation:** the wizard autosaves a draft per user in `localStorage` (`frontend/lib/characterDraft.ts`); the dashboard offers to continue or discard it. Step components must restore their state from props when revisited (see `StepAbilities`). Import/export parsing and file naming live in `frontend/lib/characterTransfer.ts`.
- **Accessibility:** tie every label to its control (`htmlFor`/`id`, or `TextField`), make clickable things buttons (see `selectableProps` for card-style choices), and keep `frontend/__tests__/a11y.test.tsx` (jest-axe) passing when adding screens.
- **Sheet structure:** the sheet page composes cards from `app/character/[id]/components/sections`; rules math lives in `frontend/lib` (`armorClass.ts`, `spellcastingSetup.ts`, `hp.ts`, `rest.ts`, `spellFilters.ts`). Add new rules logic there with tests rather than inline in render.
- **Campaigns:** pages live in `app/campaigns` (list → hub `[id]` with Party / Sessions / Encounters / Loot / Bestiary / Notes tabs → tracker `[id]/encounters/[encounterId]`). Loot items are hidden from players until `revealed`; sessions until `shared`. Loot (a coin pile when it has `coins`) reaches character sheets through `GiveLootDialog` → `POST /:id/items/:itemId/distribute` (`backend/src/lib/lootDelivery.ts`): players take found loot for their own characters, the DM gives or splits anything; the sheet's equipment or `currency` and the loot list change in one transaction, and each recipient's part becomes a row `heldBy` them. Loot can be linked to the item list: the DM finds an entry in the item form (`LootCatalogueField`, helpers in `lib/lootCatalogue.ts`), choosing what a magic weapon or armor is made from or leaving it to the player, and `CampaignItem.item` stores the sheet item it becomes, so it lands on the sheet with its stats; unlinked loot whose name is in the item list ("+1 Longsword" too) is matched when it's handed out (`catalogueMatch`). A renamed or reworded item isn't tied to the item list's live text (no `baseItemId`). Loot's per-item `value` ("50 gp"; else one its description gives, "worth 250 gp" / "Value: 25 gp", `backend/src/lib/lootValues.ts`) becomes the sheet item's `value`, shown and totalled in the Gear tab (`frontend/lib/itemValue.ts`; the item list's `cost` is only a placeholder hint, since it's often for a bundle). `backfillLootValues` gives items characters already hold their loot's value; it only fills missing ones (`''` = cleared by the player), and runs on every Render deploy. Sheet currency edits save a change (`POST /characters/:id/currency`), not a total, so they can't overwrite coins that arrived meanwhile; `LootSync` shows new loot on an open sheet. Prep files (`lib/campaignPrep.ts`, format `dnd55e-campaign-prep`) carry a campaign's notes, sessions, encounters, custom monsters and loot: DMs export them from the hub menu and import them as a new campaign or into one; nothing group-specific (players, characters, rolls, holders) travels. API shapes and the DM's party numbers are in `lib/campaigns.ts`; encounter rules in `lib/initiative.ts` (turn order, damage, XP) and `lib/encounterDifficulty.ts` (2024 XP budgets); stat block helpers in `lib/monsters.ts`. Pages refresh with `usePolling` (no websockets). Players never see another player's sheet or the DM's notes; the backend enforces this in `backend/src/lib/campaignViews.ts`.
- **Read-only sheet:** the DM of a character's campaign opens the real sheet with `access: 'dm'`. `SheetReadOnlyProvider` (`app/character/[id]/SheetReadOnly.tsx`) hides edit controls: new sheet controls should check `useSheetReadOnly()` (or sit in `ReadOnlyRegion`). The owner's sheet saves `data.derivedStats` (AC, passives, spell DC) via `DerivedStatsSync` so the party view shows real numbers.
- **Print:** `@media print` in `globals.css` lays the sheet out for paper; phone-only rules are `@media screen and (max-width: 767px)` so they never apply to print.
- **Phones:** the main nav collapses behind a Menu button; dialogs keep their title and footer pinned; the encounter tracker's turn controls sit at the bottom. On touch screens (`@media screen and (pointer: coarse)`) buttons are at least 44px tall (40px for `btn-sm`); dense controls such as `RollButton` and slot pips get a larger invisible hit area instead. Keep new controls at least 32px tall on touch screens.
- **Installable / offline:** `app/manifest.ts` makes the site installable as "Grulla D&D" (icons in `public/icons`, `app/icon.png`, `app/apple-icon.png`). `public/sw.js` (registered in production only, by `OfflineSupport` in `AppShell`) caches built assets (cache first), pages and API GETs (network first, falling back to the last saved copy; `public/offline.html` for pages never opened). API responses are per user, so `clearOfflineData()` (`lib/offline.ts`) drops them on log in and log out; keep `API_CACHE` in step with the worker. When the network is slow (Render waking up) the worker shows the saved copy after 4s and lets the request refresh the cache; `OfflineSupport` also pings `/health` on launch (`warmUpServer`) and says "Waking the server…" if it's slow. Bump `VERSION` in `sw.js` when its caching changes.
- **Offline edits:** in-play sheet saves pass `{ offline: true }` to `api.post|put|patch|delete`; without a connection (or while older saves wait) they go into a localStorage queue (`lib/offlineQueue.ts`) and resolve to `QUEUED` (check with `isQueued`, keep the local state). `OfflineSupport` sends the queue in order on reconnect and every 20s while saves wait, shows the count, and toasts saves the server refused (4xx; dropped). Saves carry only what changed (a `data` key, HP, one item, a coin change), so the server merges them with changes made meanwhile. Open sheets reload on `QUEUE_FLUSHED`, and the sheet saves its own copy into the API cache (`saveOfflineCopy`) so reopening it offline shows queued edits. Creation, level up, rests, campaigns and encounters stay online-only: don't opt them in. The queue is cleared on log in and log out.
- **Theme:** dark by default, light follows the OS or the nav toggle (`data-theme` on `<html>`, see `frontend/lib/theme.ts`).

### Route Protection

`frontend/app/layout.tsx` wraps the app in `ToastProvider` → `AuthGuard` → `AppShell`. `AuthGuard` checks the stored token and redirects unauthenticated users to `/login` for protected routes; `AppShell` renders the main nav on those routes.

### Backend API Structure

Routes are mounted in `backend/src/index.ts`:
- `/api/auth` — register, login (`device: true` for a non-expiring app token), `POST /change-password` (signed in; needs the current password), `POST /logout-all`. All rate-limited (`authLimiter`). The frontend's `/account` page (nav: Account) uses it
- `/api/characters` — CRUD; protected by `authenticateToken` middleware
- `/api/campaigns` — CRUD, join by code, leave/remove members, `PUT /assign-character`; nested `/:id/encounters` (DM only), `/:id/sessions` and `/:id/items` (loot, `POST /:itemId/distribute` to hand it out). Prep files: `POST /import` (new campaign), `GET|POST /:id/prep` (export / import into), one transaction each, in `backend/src/lib/campaignPrep.ts`. Access checks go through `loadCampaign` in `backend/src/lib/campaignAccess.ts` (404 for campaigns you aren't in)
- `/api/monsters` — a DM's custom monsters (same shape as SRD monsters, `backend/src/lib/monsterSchema.ts`)
- `/api/reference` — D&D reference data (classes, races, spells, feats, monsters, ...) served from the `ReferenceItem` table (admin-editable). `backend/src/data/*.ts` is the seed/sync source: `prisma db seed` fills an empty DB, `npm run sync-reference` pushes later rules updates.

### Rules Data (2024 / 5.5e)

`backend/src/data` follows the 2024 PHB; text comes from SRD 5.2 (CC-BY-4.0, attribution in README) where available and is summarized otherwise. Pre-2024 content is kept with `legacy: true` (never deleted — characters reference ids) and hidden from pickers. Keep ids stable; append new base items to the end of the `catalogue` array in `baseItems.ts` (keys are slugs assigned in order). The served `baseItems` list comes from `finishCatalogue` (`data/magicItems.ts`): magic weapons/armor/shields get `appliesTo` (what they can be made from, parsed from their "Weapon (Any Melee Weapon)" / "Armor (Scale Mail)" line), `magicBonus` and `overrides` (Mithral); exact duplicates and the generic "+1, +2, or +3" entries get `legacy: true` (hidden from pickers, kept for owners); and a +1/+2/+3 version of every mundane weapon, armor and shield is appended (`baseName` links it to its base). On the sheet, adding a magic weapon/armor/shield copies its base item's stats onto it (`frontend/lib/itemComposition.ts`: "Which weapon is your Flame Tongue?" when several fit, "Made from" in the Gear tab to change or set it), so attacks, mastery (matched by `baseName` too) and AC work like the base. `backend/src/tests/referenceData.test.ts` checks cross-references. Monster stat blocks (`monsters.ts`, SRD 5.2, 2024 layout) are checked against `monsterSchema` by `backend/src/tests/monsters.test.ts`; give attacks `attackBonus` + `damage` so they're rollable.

### Key Data Models (Prisma)

- **User** — auth credentials and ownership anchor
- **Character** — belongs to User, optionally to one Campaign; stores all sheet data in a JSON `data` column. Readable by its owner and its campaign's DM (read-only); writes are owner-only
- **Campaign** — owned by a DM (User), players join via unique `joinCode`; `notes` are DM-only
- **CampaignMember** — join table between Campaign and User
- **Encounter** — a campaign's fight; `data` holds combatants (in turn order), `round`, `turn`; one `active` at a time
- **CampaignSession** — session log entry (`recap` shared, `dmNotes` private; `shared: false` hides it from players)
- **CampaignItem** — loot: `revealed` to players or not, optionally `heldBy` a character, `coins` for currency, `item` (the linked sheet item), private `dmNotes`
- **Monster** — a user's custom stat block

### CORS

The backend uses exact-match CORS validation (prevents subdomain bypass). Allowed origins: `localhost:3000`, `https://character-sheet-frontend.vercel.app`, and the `FRONTEND_URL` env var.

## Deployment

- **Backend:** `backend/render.yaml` configures Render. Build: `cd .. && npm install && cd backend && npm run build`. Start: `npm start`. On Render (`RENDER` is set) the build ends with `prisma migrate deploy` (`backend/prisma/deploy-migrations.js`), so new migrations apply on deploy and a failed one aborts it; commit migrations with the code that needs them. Render installs production dependencies only (`@types/node` is dev-only there), so Node built-ins the build imports need a declaration in `backend/src/global.d.ts`, and only ES2018 APIs type-check there (no `trimEnd`, `flat`, `at`, ...: they pass locally only because `@types/node` adds them). Check with `NODE_ENV=production npm install && npm run build` in a clean checkout. Reference data updates (`sync-reference`) aren't automatic: run it locally with `DATABASE_URL` pointed at production. Data fill-ins the code needs go in `backend/src/tasks` (compiled, unlike `src/scripts`) and are listed in `deploy-migrations.js`, which runs them with `--apply` after migrations; they must be idempotent, and a failure is logged without failing the deploy (`npm run backfill-loot-values` previews one locally).
- **Frontend:** Vercel (Next.js native). Set `NEXT_PUBLIC_API_URL` to the Render backend URL.
