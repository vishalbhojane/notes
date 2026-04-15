Client Components run in the browser. They hydrate like typical React components.

## When to use:

- Event handlers (`onClick`, `onChange`)
- State: `useState`, `useReducer`
- Effects: `useEffect`, `useLayoutEffect`
- Browser APIs: `localStorage`, `window`, `document`

## How to declare:

Add the directive at the top of the file (before imports):

```tsx
'use client';

import { useState } from 'react';

export default function Counter() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n + 1)}>Count: {n}</button>;
}
```

## Composition pattern:

- Server Components can import and render Client Components
- Client Components should not import Server Components (pass them as `children` instead)

```tsx
// ServerComponent.tsx (no 'use client')
import ClientWrapper from './ClientWrapper';

export default function ServerPage() {
  return (
    <ClientWrapper>
      <p>This static part can stay on the server.</p>
    </ClientWrapper>
  );
}
```

## Bundle impact:

- Client Component trees are included in the JavaScript sent to the browser
- Prefer keeping interactive islands small

## Best practices:

- Default to Server Components; add `'use client'` at the leaf that needs it
- Avoid marking large parent trees as client-only unless necessary
