# Prism Shadow Website

This project contains the Prism Shadow company website built with Vite, React, and TypeScript.

## Requirements

- Node.js 20+
- npm

## Setup

```bash
npm install
```

## Local Development

```bash
npm run dev
```

Open the local URL printed by Vite.

The Vite dev server only serves the frontend. Use Vercel's local runtime when
you need to test `api/contact.ts` end to end.

## Validation

```bash
npm run lint
npm run build
```

## Project Map

- `src/App.tsx` - current application shell and page rendering
- `src/i18n/` - shared locale types and translated shared UI copy
- `src/seo/` - route metadata, canonical URL handling, and social metadata helpers
- `src/index.css` - current styling and responsive rules
- `api/contact.ts` - Vercel contact form endpoint
- `public/` - static images, icons, `robots.txt`, and `sitemap.xml`

## Contact Form

`/contact` submits `name`, `email`, and `message` to the existing `contacts`
database table used by the previous website. The table is expected to provide
defaults for `status` and `created_at`.

Required Vercel environment variables:

- `DB_PROVIDER` - optional; use `local` for PostgreSQL, otherwise Supabase is used
- `DATABASE_URL` - required only when `DB_PROVIDER=local`
- `NEXT_PUBLIC_SUPABASE_URL` - required for Supabase
- `SUPABASE_SERVICE_ROLE_KEY` - required for Supabase server-side inserts

## Notes

- Production domain metadata is configured for `https://prismshadow.com`.
- The current app is a single-page Vite build with manual path routing.
- `vercel.json` rewrites non-API deep links to `index.html` for SPA routing.
