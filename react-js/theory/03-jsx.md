JSX stands for JavaScript XML. It is a syntax extension for JavaScript, commonly used with React to describe what the UI should look like.

- Allows writing HTML-like code in React
- Makes it easier to create and visualize UI components
- Every React component typically returns JSX
- JSX is transformed into regular JavaScript at runtime

## Basic Syntax

```jsx
function Button() {
  return <button>Click Me</button>;
}
```

## JSX vs createElement

JSX is syntactic sugar for React.createElement:

```jsx
createElement(type, props, ...children);
createElement('button', {className: 'btn'}, 'Click Me 😐');
```

## JSX Specifics

- Use `className` instead of `class` (JavaScript keyword)
- Use `htmlFor` instead of `for`

```jsx
<button className="btn">Click Me</button>
```

## Dynamic Values in JSX

Use `{ }` to embed JavaScript expressions:

```jsx
const planet = 'Earth';
<h1>Hello {planet}</h1>;

// Dynamic attributes
const imgSrc = '/earth.png';
<img src={imgSrc} />;

// Dynamic styles
const background = 'red';
<div style={{background: background}}></div>;
```
