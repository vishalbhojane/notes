Children props allow components to pass other components or elements as props.

- Enables component composition
- Useful for creating layout components
- Accessed via `props.children`

## Passing Children

```jsx
<Parent>
  <Child /> {/* Passed as children */}
</Parent>
```

## Accessing Children

```jsx
function Parent(props) {
  return <div>{props.children}</div>;
}
```

## Use Case: Layout Components

Children props are great for creating reusable layout components:

```jsx
<Layout>
  {' '}
  {/* Contains common elements like Header, Footer */}
  {/* Children content is inserted here */}
</Layout>
```
