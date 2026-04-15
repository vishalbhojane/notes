Special files define loading, error, and not-found UI per route segment.

## loading.tsx:

- Wraps the segment in React Suspense automatically
- Shows fallback while server components for that segment resolve

```tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return <p>Loading dashboard…</p>;
}
```

## error.tsx:

- Client boundary; must include `'use client'`
- Catches errors in child segments during rendering

```tsx
'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h2>Something went wrong</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

## not-found.tsx:

- Custom UI when `notFound()` is called or no matching route exists

```tsx
// app/not-found.tsx
export default function NotFound() {
  return <h1>404 — Page not found</h1>;
}
```

```tsx
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getItem(id);
  if (!item) notFound();
  return <div>{item.name}</div>;
}
```

## Benefits:

- Better UX than blank screens or generic errors
- Localized fallbacks per section of the app

## Notes:

- `error.tsx` does not catch errors in event handlers (same as React error boundaries)
- Nest `error.tsx` deeper for more granular recovery
