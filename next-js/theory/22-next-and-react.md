Next.js is a framework *on top of* React. Your React notes map naturally with a few shifts in where code runs.

## Concept mapping:

| React concept              | In Next.js App Router                          |
| -------------------------- | ---------------------------------------------- |
| Components                 | Server Components by default; `'use client'` when needed |
| State / effects            | Client Components (`useState`, `useEffect`)    |
| Data fetching in `useEffect` | Often replaced by `async` Server Components + `fetch` |
| Context                    | Works in Client Components; providers usually client |
| Suspense                   | `loading.tsx`, streaming, `React.Suspense`     |
| Error boundaries           | `error.tsx` per segment                        |
| Routing (React Router)     | File-system routing in `app/`                |

## What stays the same:

- JSX, props, composition, keys in lists
- Hooks rules in Client Components
- Thinking in reusable UI pieces

## What is new:

- Request-level rendering and caching semantics
- Server Actions for mutations
- Metadata API, Route Handlers, middleware

## Learning path:

1. Solid React fundamentals (your `react-js/theory` notes)
2. Server vs Client Components mental model
3. Data fetching + caching + revalidation
4. Deployment and env configuration

## Additional notes:

- Framework versions evolve quickly—verify details (e.g. async `params`) against your installed Next.js docs
- Pages Router apps still exist; App Router is the default for new projects
