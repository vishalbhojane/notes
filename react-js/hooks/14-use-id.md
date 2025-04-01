- A hook for generating unique IDs that are stable across the server and client
- Useful for accessibility attributes and other cases where a unique, stable ID is required

## How to use it

```jsx
const id = useId();
```

- Returns a unique string ID

## Key Points

1. Generates IDs that are consistent across server and client rendering
2. Helps avoid hydration mismatches in server-side rendering
3. Should not be used as keys in lists (use array index or unique data id instead)
4. Generates the same ID for a given component across renders

## Example: Accessible Form Labels

```jsx
import React, {useId} from 'react';

function FormField({label, type}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} />
    </div>
  );
}

function SignUpForm() {
  return (
    <form>
      <FormField label="Name" type="text" />
      <FormField label="Email" type="email" />
      <FormField label="Password" type="password" />
    </form>
  );
}
```

## When to Use useId

- Creating accessible labels that need to be associated with form inputs
- Generating unique IDs for ARIA attributes
- Any scenario where you need a stable, unique identifier across renders and across server/client

## Tips

- Use when you need a unique ID that's consistent between server and client
- Prefer useId over manually created unique IDs or incrementing counters
- Can be used to generate related IDs by appending suffixes
- Don't use for keys in list rendering; use data-based keys instead
- Useful in component libraries or reusable form components

## Example: Generating Related IDs

```jsx
function NameFields() {
  const id = useId();
  return (
    <div>
      <label htmlFor={id + '-firstName'}>First Name</label>
      <input id={id + '-firstName'} type="text" />
      <label htmlFor={id + '-lastName'}>Last Name</label>
      <input id={id + '-lastName'} type="text" />
    </div>
  );
}
```

## useId vs Manual ID Creation

- useId ensures consistency between server and client rendering
- Manual ID creation can lead to hydration mismatches and accessibility issues
- useId is preferred for its built-in handling of server-side rendering scenarios
