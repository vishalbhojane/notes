Route Handlers replace API Routes from the Pages Router. They live in `route.ts` (or `route.js`) next to the App Router tree.

## Basic GET handler:

```ts
// app/api/hello/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello' });
}
```

## Supported HTTP methods:

- Export named functions: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`

## Request and response:

```ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ ok: true, received: body }, { status: 201 });
}
```

## Dynamic API routes:

- `app/api/users/[id]/route.ts` → `/api/users/:id`

## When to use:

- Webhooks, mobile clients, or third parties calling your backend
- Mutations that should not be exposed as Server Actions

## Notes:

- Runs on the server (Edge or Node depending on config)
- Do not confuse with React Server Components—`route.ts` is HTTP, not UI

## Best practices:

- Validate input; return appropriate status codes
- Keep handlers focused; share logic with Server Components via modules
