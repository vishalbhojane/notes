The key prop is a special attribute used by React for identifying unique Virtual DOM elements.

- Built-in prop in React
- Used to differentiate components in a list
- Should be unique among siblings
- Helps React optimize rendering performance

## Basic Usage

```jsx
<Component key={'1'} />
```

## Common Use Case: Lists

When rendering lists of components, keys are crucial:

```jsx
{
  items.map((item) => <Component key={item.id}>{item}</Component>);
}
```

## Using Index as Key

If a unique identifier is not available, you can use the index as a last resort:

```jsx
{
  items.map((item, index) => <Component key={index}>{item}</Component>);
}
```

Note: Using index as keys can lead to issues with component state if the list order changes. It's better to use unique and stable IDs when possible.
