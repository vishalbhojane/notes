`preventDefault()` is a method that cancels the default action of an event.

## Key Points

- Cancels the event's default behavior
- Has no effect on non-cancellable events
- Use `event.cancelable` to check if an event can be cancelled

## Examples

### Preventing Form Submission

```javascript
form.addEventListener("submit", e => {
    e.preventDefault(); // Prevents page refresh on form submission
    console.log("Form submitted");
});
```

### Preventing Link Navigation

```javascript
const link = document.querySelector("a");
link.addEventListener("click", e => {
    e.preventDefault();
    console.log("Default navigation prevented");
});
```

### Other Event Types

```javascript
// These events don't typically have default behaviors to prevent
link.addEventListener("mouseenter", e => { /* ... */ });
link.addEventListener("mouseleave", e => { /* ... */ });
link.addEventListener("focus", e => { /* ... */ });
link.addEventListener("blur", e => { /* ... */ });

// Window resize event (usually doesn't need preventDefault)
window.addEventListener("resize", () => console.log("Window resized"));
```

Note: Always consider the user experience when preventing default behaviors. Ensure that alternative functionality is provided when necessary.