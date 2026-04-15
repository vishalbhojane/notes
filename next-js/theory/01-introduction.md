- Next.js is a React framework for building full-stack web applications.
- Created by Vercel; open source and widely used for production sites.
- Adds routing, rendering strategies, data fetching conventions, and deployment tooling on top of React.
- Ships with optimizations for performance (images, fonts, scripts) and SEO.

## Next.js core ideas:

- File-system routing: URLs map to files in the project
- Server and Client Components: choose where UI and data logic run
- Built-in data fetching and caching tied to the request lifecycle
- Hybrid rendering: static, dynamic, and incremental approaches per route

## Next.js vs plain React:

| Plain React (e.g. CRA, Vite) | Next.js                                      |
| ---------------------------- | -------------------------------------------- |
| You bring your own router    | App Router (or Pages Router) included        |
| Mostly client-rendered SPA   | Server-first options + client interactivity  |
| Manual SSR setup if needed   | First-class server rendering and streaming   |

## Ecosystem:

- Deploy to Vercel, Netlify, or any Node-compatible host
- Works with TypeScript, Tailwind CSS, and common React libraries
- React knowledge still applies: components, hooks, JSX, state

## Setup

Create a new app (recommended):

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

Create with TypeScript (interactive prompts also offer TypeScript):

```bash
npx create-next-app@latest my-app --typescript
```

Common scripts in `package.json`:

- `npm run dev` — development server (hot reload)
- `npm run build` — production build
- `npm start` — run production build locally

## What you should know first:

- Comfortable with React components and hooks
- Basic understanding of HTTP (requests, responses, status codes)
- Optional: TypeScript for safer larger projects
