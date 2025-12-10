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

3.  **Run Development Servers**
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
- **Campaigns**: Create, Join via Code.
- **UI**: Premium Dark Theme, Responsive Layout.

## Testing
- Backend: `cd backend && npm test`
- Frontend: `cd frontend && npm test`
