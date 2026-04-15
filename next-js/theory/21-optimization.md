Beyond images and fonts, Next.js provides tools to trim JavaScript and control third-party scripts.

## next/script:

- Control when external scripts load (`afterInteractive`, `lazyOnload`, `beforeInteractive`)

```tsx
import Script from 'next/script';

export default function Page() {
  return (
    <>
      <Script src="https://example.com/analytics.js" strategy="afterInteractive" />
    </>
  );
}
```

## Dynamic import:

- Code-split heavy Client Components

```tsx
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <p>Loading chart…</p>,
  ssr: false, // optional: skip server render for browser-only libs
});
```

## Bundle analysis:

- Use `@next/bundle-analyzer` (or similar) to find large dependencies

## Server-first UI:

- Prefer Server Components to keep interactive JS off the initial page

## Caching and prefetch:

- Appropriate `fetch` caching reduces duplicate work
- `Link` prefetch reduces navigation latency

## Benefits:

- Smaller JS improves TTI and mobile performance
- Deferred scripts reduce main-thread contention during load

## Best practices:

- Measure with Lighthouse or Web Vitals before micro-optimizing
- Lazy-load below-the-fold widgets and modals
