Event listeners are functions that wait for and respond to specific events.

## Adding Event Listeners

```javascript
const btn = document.querySelector(".btn");

btn.addEventListener('click', () => {
    console.log("Clicked from 1st listener");
});

btn.addEventListener('click', () => {
    console.log("Clicked from 2nd listener");
});
```

Note: Multiple listeners on the same event execute in the order they're added.

## Removing Event Listeners

```javascript
function printClick() {
    console.log("Clicked");
}
btn.removeEventListener("click", printClick);
```

## Event Object

```javascript
btn.addEventListener("click", event => {
    console.log(event);
});
```

## Input Events

```javascript
const input = document.querySelector("[data-input-text]");

input.addEventListener("change", () => {
    console.log("Change event");
});

input.addEventListener("input", e => {
    console.log("Input event");
    console.log("Is input empty:", e.target.value === "");
});
```

## Form Events

```javascript
const form = document.querySelector("[data-form]");

form.addEventListener("submit", e => {
    e.preventDefault(); // Prevent page refresh
    console.log("Form submitted");
});
```

Note: Use `e.preventDefault()` to prevent the default form submission behavior.