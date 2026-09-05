# YAM Prototype

A local, responsive prototype for a centralized Y(A–Z)M project portal.

## Included

- Central overview with project health and status filters
- Searchable project directory
- Add-project workflow
- People and access management prototype
- Activity history
- Workspace settings and preferences
- Desktop, tablet, and mobile layouts

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Prototype views

- `http://localhost:3000/` — **YAM Prototype**, the owner/admin experience
- `http://localhost:3000/user` — **YAM_Prototype_User**, the regular-user experience

The user experience intentionally excludes project administration, user management, workspace configuration, and other owner-only controls.

## Validate a production build

```bash
npm run build
npm start
```

This version uses realistic demo data. Buttons and settings are prototype interactions and do not yet connect to a database or authentication provider.
