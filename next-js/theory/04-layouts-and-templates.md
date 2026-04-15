Layouts and templates wrap child routes. They define shared chrome (nav, sidebars) and persist or reset state differently.

## Layout (`layout.tsx`):

- Wraps the segment and all deeper routes
- State inside a layout survives navigation between child pages
- Use for headers, footers, side navigation, providers that should persist

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <nav>Dashboard nav</nav>
      {children}
    </section>
  );
}
```

## Template (`template.tsx`):

- Also wraps children, but remounts on navigation
- Useful when you need a fresh instance per navigation (animations, keyed state)

## Root layout:

- `app/layout.tsx` is required (except in rare partial setups)
- Must include `<html>` and `<body>` for a full document

## Nesting:

- Layouts nest from root downward: root → segment → segment
- Each layout wraps its `children` with shared UI

## Benefits:

- Avoid duplicating nav and shell markup on every page
- Keep concern boundaries clear: route UI in `page.tsx`, shared structure in `layout.tsx`

## Best practices:

- Keep layouts thin; heavy data fetching often belongs in `page.tsx` or child components
- Put global styles and fonts in the root layout when appropriate
