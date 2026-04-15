The App Router maps folders under `app/` to URLs. It is the default routing system in new Next.js apps.

## Basics:

- `app/page.tsx` → `/`
- `app/about/page.tsx` → `/about`
- Nested folders → nested paths: `app/blog/[slug]/page.tsx` → `/blog/:slug`

## Dynamic segments:

Use square brackets for dynamic params:

```tsx
// app/posts/[id]/page.tsx
export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <h1>Post {id}</h1>;
}
```

## Catch-all and optional catch-all:

- `[...slug]` — matches one or more segments
- `[[...slug]]` — same, but the route also matches with zero segments

## Parallel and intercepting routes:

- `@folder` slots for parallel routes (advanced layouts)
- `(.)`, `(..)` intercepting patterns for modals over existing URLs (advanced)

## Special files (conventions):

| File           | Purpose                                      |
| -------------- | -------------------------------------------- |
| `page.tsx`     | UI for a route                               |
| `layout.tsx`   | Shared shell for a segment and children    |
| `loading.tsx`  | Suspense fallback while segment loads        |
| `error.tsx`    | Error boundary for the segment             |
| `not-found.tsx`| Custom 404 for the segment                   |

## Notes:

- Prefer Server Components by default; add `'use client'` only when needed
- Params and search props are often async in recent Next.js versions—`await` them in server components
