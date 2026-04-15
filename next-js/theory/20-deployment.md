Next.js apps compile to a Node server, static assets, and optionally Edge functions depending on features used.

## Build output:

```bash
npm run build
npm start
```

- Produces an optimized production server and static files in `.next/`

## Hosting options:

- Vercel: zero-config integration with Next.js features
- Node hosting: run `next start` behind a process manager
- Docker: official examples wrap `next build` + `next start`
- Static export: `output: 'export'` for fully static sites (limits dynamic features)

## Environment:

- Set production env vars on the host
- Use HTTPS and correct `NEXT_PUBLIC_*` values for each environment

## Preview deployments:

- Many platforms build per branch/PR for QA before merging

## Checklist:

- Run `build` locally before release
- Verify image domains in `next.config` for production CDNs
- Configure caching headers for static assets at the CDN or reverse proxy when self-hosting

## Benefits:

- Same codebase can target static marketing sites or fully dynamic apps
- Incremental adoption: start static, add server features as needed
