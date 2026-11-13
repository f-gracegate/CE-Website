# Charismatic Evangelicals

Church website built with **Next.js (App Router)**, **React 19**, **Tailwind CSS v4** and **Motion**.

Features: campus finder with Google Maps, giving calculator, small-group sign-up, a community prayer wall, an AI Sermon Companion (Gemini) and Google sign-in (Firebase).

## Getting started

**Prerequisites:** Node.js 20+

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment

Copy `.env.example` to `.env.local` and fill in what you need. Every key is optional; features without a key fall back gracefully.

| Variable | Used for |
| --- | --- |
| `GEMINI_API_KEY` | Sermon Companion (server-side only) |
| `NEXT_PUBLIC_GOOGLE_MAPS_PLATFORM_KEY` | Satellite map in the campus finder |
| `NEXT_PUBLIC_FIREBASE_*` | Real Google sign-in (otherwise a simulated sign-in is used) |
| `NEXT_PUBLIC_SITE_URL` | Social preview links |

## API routes

| Route | Description |
| --- | --- |
| `GET /api/prayers` | List prayer requests |
| `POST /api/prayers` | Add a prayer request (`author`, `request`, `category`) |
| `POST /api/prayers/:id/pray` | Increment a prayer's "praying" count |
| `POST /api/sermon-companion` | Ask the Sermon Companion (`message`) |

Prayer requests are kept in server memory and reset on restart or redeploy. Replace `src/lib/prayers.ts` with a database to keep them.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | Type-check |
