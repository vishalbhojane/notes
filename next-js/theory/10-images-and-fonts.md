Next.js optimizes images and fonts to improve Core Web Vitals and reduce layout shift.

## next/image:

- Serves responsive sizes, lazy loading, and modern formats when configured
- Requires `width` and `height` (or `fill`) to avoid layout shift

```tsx
import Image from 'next/image';

export default function Hero() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero"
      width={1200}
      height={630}
      priority // optional: for LCP images above the fold
    />
  );
}
```

## Remote images:

- Allow domains in `next.config` (`images.remotePatterns`) for external URLs

## next/font:

- Self-hosts fonts and reduces external requests
- Applies `display: swap` style behavior to limit invisible text

```tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

## Benefits:

- Better LCP and CLS scores vs unoptimized `<img>` and render-blocking font CSS
- Predictable font loading across environments

## Notes:

- Use `priority` sparingly for the main hero image only
- Always meaningful `alt` text for accessibility and SEO
