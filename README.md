# D&D 5.5e Character Sheet

A modern web application for creating and managing D&D 5.5e (One D&D) characters.

## Tech Stack
- **Frontend**: Next.js (React), TypeScript, CSS Modules.
- **Backend**: Node.js, Express, TypeScript.
- **Database**: PostgreSQL, Prisma ORM.

## Prerequisites
- Node.js (v18+)
- PostgreSQL

## Setup

1.  **Install Dependencies**
    ```bash
    # Root
    npm install

    # Or manually in each workspace if root install fails
    cd backend && npm install
    cd ../frontend && npm install
    ```

2.  **Database Setup**
    - Create a PostgreSQL database (e.g., `dnd_character_sheet`).
    - Configure `.env` in `backend/`:
      ```
      DATABASE_URL="postgresql://user:password@localhost:5432/dnd_character_sheet?schema=public"
      JWT_SECRET="your_secret"
      ```
    - Run migrations:
      ```bash
      cd backend
      npx prisma migrate dev --name init
      ```

    - On Render, `npm run build` applies pending migrations itself
      (`prisma/deploy-migrations.js`; a failed migration fails the deploy). For any
      other existing database, apply them with:
      ```bash
      cd backend
      npx prisma migrate deploy
      ```

3.  **Load Reference Data** (spells, species, classes, backgrounds, feats, items, monsters)
    ```bash
    cd backend
    npx prisma db seed          # first time: fills an empty database
    npm run sync-reference      # later: preview rules updates from src/data
    npm run sync-reference -- --apply
    ```
    `sync-reference` updates rows in an existing database but leaves anything an
    admin edited through the admin panel alone (it lists those; pass
    `--force-keys type:key,...` to overwrite specific ones). It never deletes rows.

4.  **Run Development Servers**
    - **Backend**:
      ```bash
      cd backend
      npm run dev
      ```
    - **Frontend**:
      ```bash
      cd frontend
      npm run dev
      ```

## Features Implemented (MVP)
- **Auth**: Register, Login (JWT).
- **Characters**: Create, List, View Sheet (Basic Stats).
- **Campaigns**: create one as its DM or join with a code; each character plays in one campaign at a time
  (move it from its sheet, or leave the campaign). The DM sees the party's HP, AC, passives and conditions
  (refreshing on their own) and can open players' sheets read-only; players see who's in the party but not
  each other's sheets.
- **DM tools**: session log (recaps for players, private DM notes), campaign notes, a bestiary of SRD 5.2
  monsters plus your own custom stat blocks, an encounter builder with 2024 XP budgets (Low / Moderate / High),
  and a combat tracker (initiative, rounds, monster HP and conditions, tap-to-roll stat blocks). Players follow
  the running fight's turn order from the campaign page.
- **Loot and campaign prep files**: plan treasure (items or coin piles) and reveal it as the party finds it.
  Players claim found loot, or take their share of a stack or of the coins; the DM gives or splits anything.
  Whatever is handed out lands on the character's sheet (equipment or currency). Hide sessions you're still
  preparing. Export a campaign's prep (notes, sessions, encounters, custom monsters, loot) as a file to reuse or
  share it, and start a new campaign from one, or add one to an existing campaign.
- **UI**: Premium Dark Theme, Responsive Layout.

## Testing
- Backend: `cd backend && npm test`
- Frontend: `cd frontend && npm test`

## Rules Content (2024 / 5.5e)
Reference data in `backend/src/data` follows the 2024 Player's Handbook rules.
Pre-2024 options that existing characters may use (older species, subclasses,
backgrounds, feats, Unearthed Arcana spells) are kept with `legacy: true` and are
hidden in the pickers unless "show legacy" is ticked.

This work includes material from the System Reference Document 5.2 ("SRD 5.2")
by Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd. The
SRD 5.2 is licensed under the Creative Commons Attribution 4.0 International
License, available at https://creativecommons.org/licenses/by/4.0/legalcode.
2024 content outside the SRD is summarized in our own words.
