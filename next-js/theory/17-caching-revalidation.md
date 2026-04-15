Next.js caches parts of the rendering and data layer. Understanding cache controls helps you get fresh data when needed.

## Layers (conceptual):

- Request memoization: repeated `fetch` in one tree may dedupe
- Data cache: cached `fetch` results across requests (unless opted out)
- Full route cache: static HTML/RSC payload for static routes
- Router cache: client-side session cache of segments (short-lived)

## Opting out / dynamic:

- `fetch(url, { cache: 'no-store' })` — skip data cache for that request
- `export const dynamic = 'force-dynamic'` — force dynamic rendering for the route (when needed)

## Time-based revalidation:

```tsx
await fetch('https://api.example.com/data', {
  next: { revalidate: 3600 },
});
```

## On-demand revalidation:

```tsx
// In a Server Action or Route Handler
import { revalidatePath } from 'next/cache';
revalidatePath('/blog');

import { revalidateTag } from 'next/cache';
revalidateTag('posts');
```

Tag fetches in Server Components:

```tsx
fetch('https://api.example.com/posts', { next: { tags: ['posts'] } });
```

## Best practices:

- Default to caching for public read-heavy pages
- Invalidate after writes with tags or path revalidation
- Avoid marking everything dynamic unless necessary (impacts cost and speed)

## Debugging:

- Use logging and response headers in dev to see cache behavior for your version
