Server Components run on the server. They are the default in the App Router.

## Characteristics:

- Can be `async` and `await` data directly (database, fetch, file system)
- Do not ship component code for server-only logic to the browser
- Cannot use browser-only APIs or React hooks like `useState` / `useEffect`

## Example:

```tsx
// app/posts/page.tsx — Server Component by default
export default async function PostsPage() {
  const res = await fetch('https://api.example.com/posts', { cache: 'no-store' });
  const posts = await res.json();
  return (
    <ul>
      {posts.map((p: { id: string; title: string }) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  );
}
```

## Why use them:

- Smaller client bundles for static structure and data read on the server
- Secrets and credentials stay on the server
- Natural place for SEO-friendly HTML generation

## Passing data to the client:

- Pass serializable props from Server Components into Client Components
- Do not pass functions unless they are Server Actions (special case)

## Mental model:

- Think “this runs once per request (or per cached render)” for dynamic server work
- Use Client Components when you need interactivity or effects

## Limitations:

- No `useState`, `useReducer`, `useEffect`, or browser APIs
- Children can still be Client Components when composed correctly
