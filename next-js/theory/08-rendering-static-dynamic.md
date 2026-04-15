Next.js can render routes as static HTML, on each request, or stream HTML as it becomes ready.

## Static rendering:

- HTML (and RSC payload) generated at build time or when revalidated
- Fast CDN delivery; great for content that changes rarely

## Dynamic rendering:

- Per-request rendering when the route opts into dynamic APIs or uncached data
- Examples: `cookies()`, `headers()`, `searchParams` in some setups, `fetch` with `no-store`

## Streaming:

- Send HTML in chunks using Suspense boundaries
- Improves perceived load time for slow data sources

```tsx
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<p>Loading…</p>}>
      <SlowSection />
    </Suspense>
  );
}
```

## Partial Prerendering (PPR) — when enabled:

- Static shell with dynamic holes streamed in (framework feature; availability depends on version/config)

## Choosing a strategy:

| Need                    | Typical approach              |
| ----------------------- | ----------------------------- |
| Marketing pages, docs   | Static / ISR                  |
| Personalized dashboards | Dynamic server render         |
| Mixed                   | Static layout + dynamic islands |

## Mental model:

- Static by default where possible; dynamic when the response must vary per user or time
- `loading.tsx` adds a Suspense boundary for the route segment
