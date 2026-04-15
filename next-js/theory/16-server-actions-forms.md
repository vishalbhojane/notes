Server Actions are async functions that run on the server. They integrate with forms and mutations without hand-written API routes.

## Defining a Server Action:

```tsx
// app/actions.ts
'use server';

export async function createItem(formData: FormData) {
  const name = formData.get('name') as string;
  // validate, save to DB, etc.
  return { ok: true };
}
```

## Using with a form:

```tsx
import { createItem } from './actions';

export default function Page() {
  return (
    <form action={createItem}>
      <input name="name" />
      <button type="submit">Save</button>
    </form>
  );
}
```

## Progressive enhancement:

- Forms work without JavaScript when using `action` with Server Actions
- Client Components can call actions via `action` or `formAction`

## Revalidation after mutation:

```tsx
'use server';

import { revalidatePath } from 'next/cache';

export async function createItem(formData: FormData) {
  // ... persist
  revalidatePath('/items');
}
```

## Security:

- Treat actions like public endpoints: validate auth and input
- Do not trust client-supplied data

## When to prefer Route Handlers:

- Non-browser clients, webhooks, or explicit REST APIs

## Benefits:

- Less boilerplate than CRUD API routes for same-origin form posts
- Natural colocation with UI that triggers the mutation
