HTML events are actions that occur on HTML elements, which JavaScript can respond to.

## Examples of HTML Events

- Web page finishes loading
- Input field value changes
- Button is clicked

## Event Syntax

```html
<element event="some JavaScript">
```

Example:

```html
<button onclick="document.getElementById('demo').innerHTML = Date()">
  The time is?
</button>
```

## Common HTML Events

- `onchange`: Element's value changes
- `onclick`: Element is clicked
- `onmouseover`: Mouse moves over an element
- `onmouseout`: Mouse moves away from an element
- `onkeydown`: Key is pressed
- `onload`: Browser finishes loading the page