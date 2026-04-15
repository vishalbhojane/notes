`next.config` configures builds, images, redirects, headers, and experimental features.

## File formats:

- `next.config.mjs`, `next.config.js`, or `next.config.ts` (with type support)

## Common options:

```ts
// next.config.ts (shape varies by version)
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.example.com' }],
  },
  async redirects() {
    return [{ source: '/old', destination: '/new', permanent: true }];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [{ key: 'X-Frame-Options', value: 'DENY' }],
      },
    ];
  },
};

export default nextConfig;
```

## TypeScript paths:

- Often configured in `tsconfig.json` with `paths` for `@/` imports

## Environment-specific behavior:

- Some options differ between `next dev` and `next build`
- Check release notes when upgrading major versions

## Best practices:

- Keep config minimal; prefer code-based metadata and routing over large redirect tables when possible
- Version-control `next.config`; document non-obvious flags for the team
