Metadata helps search engines and social platforms understand your pages. Next.js provides a Metadata API in the App Router.

## Static metadata:

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Site',
  description: 'Learn Next.js',
  openGraph: { title: 'My Site' },
};
```

## Dynamic metadata:

```tsx
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: `Post: ${slug}` };
}
```

## Benefits:

- Type-safe metadata objects
- Automatic `<head>` handling without manual string building
- Open Graph and Twitter card fields in one place

## Other SEO-related pieces:

- `sitemap.ts`, `robots.ts` for generated `sitemap.xml` and `robots.txt`
- Semantic HTML from Server Components improves crawlability

## Best practices:

- Unique `title` and `description` per important page
- Use canonical URLs when content duplicates across paths
