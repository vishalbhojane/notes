Next.js projects follow conventions so the framework can find routes, layouts, and config automatically.

## Typical App Router layout:

- `app/`: Routes, layouts, loading and error UI (App Router)
- `public/`: Static files served at the site root (favicons, `robots.txt`)
- `next.config.ts` or `next.config.mjs`: Framework configuration
- `package.json`: Dependencies and npm scripts
- `tsconfig.json`: TypeScript settings (if using TS)

## Important files and folders:

| Path            | Role                                              |
| --------------- | ------------------------------------------------- |
| `app/layout.tsx` | Root layout; wraps the whole app                 |
| `app/page.tsx`   | Home route `/`                                   |
| `app/globals.css`| Often global styles imported from root layout    |

## Route segments:

- Each folder under `app/` is a URL segment unless wrapped in parentheses `(group)` or marked private with `_`
- `page.tsx` makes a route publicly accessible
- `layout.tsx` wraps that segment and its children

## Co-location:

- You can keep components, styles, and tests next to the route that uses them
- Shared UI often lives in `components/` at the project root (convention, not required)

## Private folders and route groups:

- Folder prefix `_` (e.g. `_components`): not part of the URL
- Parentheses `(marketing)`: organize files without changing the path

This structure keeps routing predictable and scales as the app grows.
