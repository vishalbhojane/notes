Props allow passing data from parent to child components.

- Props are read-only (immutable)
- Can pass any JavaScript value: strings, numbers, booleans, arrays, objects, functions
- Use camelCase for prop names (e.g., `userName` instead of `username`)

## Passing Props

```jsx
// Parent component
<Greeting name="Vishal" age={25} isStudent={true} />
```

## Receiving and Using Props

1. Basic method:

```jsx
function Greeting(props) {
  return <h1>Hello {props.name}</h1>;
}
```

2. Destructuring method (recommended):

```jsx
function Greeting({name, age, isStudent}) {
  return (
    <h1>
      Hello {name}, you are {age} years old.
    </h1>
  );
}
```

## Additional Features

- Default values can be set using default parameters:

```jsx
function Greeting({name = 'Guest'}) {
  return <h1>Hello {name}</h1>;
}
```

- Props can be spread if you have an object of props:

```jsx
const user = {name: 'Vishal', age: 25};
<Greeting {...user} />;
```
