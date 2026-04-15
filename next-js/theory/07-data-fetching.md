In the App Router, data fetching usually happens in Server Components using `fetch`, your ORM, or other server-only APIs.

## fetch in Server Components:

- Extended `fetch` supports caching hints via options
- `async` server components can await data before rendering

```tsx
export default async function Page() {
  const res = await fetch('https://api.example.com/items', {
    next: { revalidate: 60 }, // ISR-style: revalidate every 60 seconds
  });
  const items = await res.json();
  return <List items={items} />;
}
```

## Common cache modes:

| Option                         | Behavior (conceptually)              |
| ------------------------------ | ------------------------------------ |
| Default (static)               | Result may be cached across requests |
| `cache: 'no-store'`            | Always fresh (dynamic)               |
| `next: { revalidate: n }`      | Time-based revalidation              |
| `next: { tags: ['x'] }`        | Tag for on-demand revalidation       |

## Client-side fetching:

- Use `useEffect` + `fetch`, SWR, React Query, etc. in Client Components
- Good for highly interactive UI; consider server fetching first for SEO and TTFB

## Parallel fetching:

- Start independent requests before awaiting to avoid waterfalls

```tsx
const a = fetch('/api/a');
const b = fetch('/api/b');
const [ra, rb] = await Promise.all([a, b]);
```

## Best practices:

- Keep secrets and database access in Server Components or Route Handlers
- Choose caching based on how fresh the data must be
