Next.js does not mandate a styling solution; it works with common React styling approaches.

## Global CSS:

- Import in root `app/layout.tsx`

```tsx
import './globals.css';
```

## CSS Modules:

- File name `*.module.css`; scoped class names

```tsx
import styles from './Button.module.css';

export function Button() {
  return <button className={styles.primary}>OK</button>;
}
```

## Tailwind CSS:

- Popular choice via official setup in `create-next-app`
- Utility-first classes in JSX

## CSS-in-JS:

- Some libraries need Client Components or specific configuration
- Check library docs for App Router compatibility

## Sass:

- Supported by installing `sass` and using `.scss` / `.sass` files

## Recommendations:

- Use CSS Modules or Tailwind for component-local styles
- Keep global CSS small (resets, variables, base typography)

## Benefits:

- Flexibility: team can adopt what fits existing skills
- Code splitting applies to CSS Modules and many bundler-driven solutions
