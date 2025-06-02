Event bubbling and capturing are two phases of event propagation in the HTML DOM API.

## Key Concepts

- **Bubbling**: Event starts from the target element and bubbles up to the root.
- **Capturing**: Event starts from the root and trickles down to the target element.
- Remember: *Trickle down (Capturing), Bubble up (Bubbling)*

## Event Flow

1. Capturing phase: Root → Target
2. Target phase: Event reaches the target element
3. Bubbling phase: Target → Root

## Stopping Propagation

Use `event.stopPropagation()` to prevent further propagation of an event.

## Enabling Capture

Capture is off by default. Enable it with `{capture: true}` in `addEventListener`.

## Example

```html
<div id="grandparent">
    <div id="parent">
        <div id="child"></div>
    </div>
</div>
```

```javascript
document.querySelector("#grandparent").addEventListener('click', (e) => {
    console.log("Grandparent Clicked!");
    // e.stopPropagation();
}, { capture: true });

document.querySelector("#parent").addEventListener('click', (e) => {
    console.log("Parent Clicked!");
});

document.querySelector("#child").addEventListener('click', (e) => {
    console.log("Child Clicked!");
});
```

Note: With capture enabled on grandparent, clicking the child will log:
1. "Grandparent Clicked!" (capturing phase)
2. "Child Clicked!" (target phase)
3. "Parent Clicked!" (bubbling phase)

Without capture, the order would be: Child → Parent → Grandparent.