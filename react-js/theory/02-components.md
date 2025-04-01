Components are the fundamental building blocks of React applications.

- Allow creation of reusable UI elements
- Can represent simple elements (buttons, inputs) or complex layouts (entire pages)
- Can be used multiple times, like Lego bricks
- Two main types: Functional and Class components

```jsx
<App>
  <Header />
  <Content />
  <Footer />
</App>
```

## Types of Components

1. Functional Components (Modern approach):

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

2. Class Components:

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
