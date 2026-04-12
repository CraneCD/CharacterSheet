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
npm run build                            # prisma generate && tsc --skipLibCheck
npm run prisma:migrate                   # Run Prisma migrations
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

- **Frontend:** Next.js 16 (App Router), React 18, TypeScript, CSS Modules. Deployed to Vercel.
- **Backend:** Express + TypeScript, Prisma ORM, PostgreSQL. Deployed to Render.
- **Database:** PostgreSQL. Character data stored as a flexible JSON blob in `Character.data` — avoiding rigid schema migrations for MVP iteration.

### Authentication Flow

JWT-based. The backend signs tokens (1-day expiry) with `JWT_SECRET`. The frontend stores the token in `localStorage`, and the API client at `frontend/lib/api.ts` injects it as `Authorization: Bearer <token>` on every request. On a 401 response, the client calls `logout()` and redirects to `/login`. Token expiration is also checked client-side by parsing the JWT payload (see `frontend/lib/auth.ts`).

### Frontend Data Fetching

All API calls go through the centralized client in `frontend/lib/api.ts` (methods: `get`, `post`, `put`, `patch`, `delete`). The base URL is resolved from `NEXT_PUBLIC_API_URL` or falls back to `http://localhost:3001/api`. There is no Redux or Zustand — state is managed with component-level React hooks.

### Route Protection

`frontend/app/layout.tsx` wraps the app in an `AuthGuard` component that checks the stored token and redirects unauthenticated users to `/login` for protected routes.

### Backend API Structure

Routes are mounted in `backend/src/index.ts`:
- `/api/auth` — register, login
- `/api/characters` — CRUD; protected by `authenticateToken` middleware
- `/api/campaigns` — CRUD + membership; protected
- `/api/reference` — D&D reference data (classes, races, spells, feats) served from static JSON/TS files in `backend/src/data/`

### Key Data Models (Prisma)

- **User** — auth credentials and ownership anchor
- **Character** — belongs to User, optionally to Campaign; stores all sheet data in a JSON `data` column
- **Campaign** — owned by a DM (User), players join via unique `joinCode`
- **CampaignMember** — join table between Campaign and User

### CORS

The backend uses exact-match CORS validation (prevents subdomain bypass). Allowed origins: `localhost:3000`, `https://character-sheet-frontend.vercel.app`, and the `FRONTEND_URL` env var.

## Deployment

- **Backend:** `backend/render.yaml` configures Render. Build: `cd .. && npm install && cd backend && npm run build`. Start: `npm start`.
- **Frontend:** Vercel (Next.js native). Set `NEXT_PUBLIC_API_URL` to the Render backend URL.
