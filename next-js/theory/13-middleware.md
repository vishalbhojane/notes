Middleware runs on the Edge before a request completes. Use it for cross-cutting request logic.

## File location:

- `middleware.ts` (or `.js`) at the project root (or `src/` if using `src` layout)

## Common uses:

- Authentication checks and redirects
- A/B testing or feature flags via headers/cookies
- Rewrites and redirects based on geography or hostname
- Adding security headers

## Basic example:

```ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (!request.cookies.get('session')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
```

## Matcher:

- Limit which paths run middleware for performance
- Avoid running on static assets when possible

## Constraints:

- Edge runtime: not all Node APIs are available
- Keep logic fast; heavy work belongs in Route Handlers or background jobs

## Benefits:

- Single place for request gating before render
- Runs close to users on Edge when deployed on supporting platforms
