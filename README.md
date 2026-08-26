# Find My Home

A mobile-first, private household inventory built with Next.js, TypeScript, Tailwind CSS, Supabase, and browser-based QR scanning. The included demo mode is immediately browsable without credentials.

## Requirements

- Node.js 20.9 or newer
- npm
- A Supabase project for persistent accounts, records, and secure file storage

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The current UI uses the bundled demo inventory so every flow is available before Supabase is connected.

The development script binds to `127.0.0.1` and uses Webpack for compatibility with restricted local environments. To preview on another device on your network, run `npm run dev -- --hostname 0.0.0.0` instead.

## Supabase setup

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local` and add the project URL and anon key from **Project Settings → API**.
3. In the Supabase SQL Editor, run `supabase/migrations/20260825000000_initial_schema.sql`.
4. Enable email/password authentication in **Authentication → Providers**.
5. Create a test user, replace the placeholder UUID in `supabase/seed.sql` with that user's `auth.users.id`, and run the seed file.

The migration creates homes, future-ready household membership, infinitely nested locations, items, movement history, private storage, full-text search support, and row-level security. Storage paths must begin with the authenticated user's UUID, e.g. `{user-id}/items/{item-id}/photo.jpg`.

## QR testing

- Open any item or location and choose **QR label**.
- Print the label or download its PNG.
- Visit `/scan` on a phone over HTTPS, grant camera permission, and scan the label.
- For local testing without a camera, paste `canadian-passport`, `black-safe`, or a generated record URL into manual entry.

QR data contains only the app URL and public-safe record identifier. Inventory details are never embedded in a QR code and should be protected by authentication when the Supabase data layer is enabled.

## Useful commands

```bash
npm run dev
npm run lint
npm run build
npm start
```

## Project map

- `src/app` — App Router pages and user flows
- `src/components` — shared shell, cards, and QR label UI
- `src/lib/demo-data.ts` — immediate demo dataset
- `src/lib/supabase` — browser/server Supabase clients
- `supabase/migrations` — schema, indexes, storage rules, RLS, move transaction
- `supabase/seed.sql` — requested Canada Home sample inventory

## Production checklist

Wire form actions and route loaders to the provided Supabase clients, enforce authenticated route middleware, add generated PWA icons, configure a trusted production origin for QR URLs, and test all policies with two separate accounts before importing private data.
