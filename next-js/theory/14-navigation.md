Client-side navigation in Next.js avoids full page reloads and prefetches linked routes when appropriate.

## Link component:

```tsx
import Link from 'next/link';

export function Nav() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </nav>
  );
}
```

## Programmatic navigation:

```tsx
'use client';

import { useRouter } from 'next/navigation';

export function GoDashboard() {
  const router = useRouter();
  return <button onClick={() => router.push('/dashboard')}>Go</button>;
}
```

## Hooks (App Router):

- `useRouter()` from `next/navigation` — push, replace, refresh
- `usePathname()`, `useSearchParams()` — read current URL parts in Client Components

## Prefetching:

- `Link` prefetches routes in the viewport in production (configurable)

## Benefits:

- Faster transitions than full document loads
- Preserves client state in surviving layout subtrees

## Best practices:

- Use `Link` for declarative navigation
- Use `router.refresh()` to re-fetch server components after a mutation
