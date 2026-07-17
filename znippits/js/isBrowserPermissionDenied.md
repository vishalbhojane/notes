```ts
export const isBrowserPermissionDenied = (error: unknown): boolean => {
  const name = error instanceof Error ? error.name : '';
  return name === 'NotAllowedError' || name === 'PermissionDeniedError';
};
```
