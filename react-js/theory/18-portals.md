Portals allow rendering of React components into DOM nodes that exist outside the parent component's hierarchy.

- Render components anywhere in the DOM tree
- Useful for modals, tooltips, dropdowns
- Break free from parent's layout and styles
- Maintain React's event propagation system

## Basic Usage

```jsx
import {createPortal} from 'react-dom';

function ParentComponent() {
  return (
    <div>
      <p>I'm in the parent div</p>
      {createPortal(
        <p>I'm in the document body</p>, // Component to render
        document.body // DOM node to render into
      )}
    </div>
  );
}
```

## How It Works:

1. Use `createPortal` function
2. Pass the component you want to render
3. Specify the DOM element where it should be rendered

## Use Cases:

- Modals that overlay the entire application
- Tooltips that need to escape clipping
- Floating menus or dropdowns
