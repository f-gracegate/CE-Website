# Charismatic Evangelicals

Church website built with **Next.js (App Router)**, **React 19**, **Tailwind CSS v4** and **Motion**.

Features: campus list with embedded maps, weekly gatherings with add-to-calendar links, small-group sign-up and a community prayer wall.

## Getting started

**Prerequisites:** Node.js 20+

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment

Copy `.env.example` to `.env.local`. The only setting is optional.

| Variable | Used for |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Social preview links |

## API routes

| Route | Description |
| --- | --- |
| `GET /api/prayers` | List prayer requests |
| `POST /api/prayers` | Add a prayer request (`author`, `request`, `category`) |
| `POST /api/prayers/:id/pray` | Increment a prayer's "praying" count |

Prayer requests are kept in server memory and reset on restart or redeploy. Replace `src/lib/prayers.ts` with a database to keep them.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | Type-check |
