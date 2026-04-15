Environment variables configure secrets and deployment-specific values without hard-coding them in source.

## `.env` files:

- `.env` — default (usually gitignored for secrets)
- `.env.local` — local overrides (gitignored)
- `.env.development`, `.env.production` — environment-specific

## Public vs server-only:

- Prefix `NEXT_PUBLIC_` exposes a variable to the browser bundle
- Variables without that prefix are server-only (Server Components, Route Handlers, middleware with caveats)

```env
DATABASE_URL=postgres://...
NEXT_PUBLIC_SITE_URL=https://example.com
```

```tsx
// OK on server
const url = process.env.DATABASE_URL;

// OK in client (must be NEXT_PUBLIC_)
const site = process.env.NEXT_PUBLIC_SITE_URL;
```

## Access in code:

- `process.env.VAR_NAME` — inlined at build time for client-accessible vars

## Best practices:

- Never put secrets in `NEXT_PUBLIC_` variables
- Use platform env settings in production (Vercel, etc.) instead of committing `.env`

## Runtime vs build time:

- Public env vars are embedded when the client bundle is built
- Changing server env vars on the host updates server code without rebuilding public vars that were already baked in

## Notes:

- Middleware runs in Edge; confirm which env vars your host injects there
