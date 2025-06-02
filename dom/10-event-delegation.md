Event delegation is a pattern for efficient event handling by leveraging event bubbling.

## Concept

Instead of attaching event listeners to individual elements, add a single listener to a parent element and use `event.target` to handle specific child elements.

## Benefits

1. Memory efficiency: Fewer event handlers
2. Less code
3. Easier DOM manipulation for dynamically added elements

## Limitations

Not all events bubble up (e.g., `blur`, `focus`, `scroll`)

## Examples

### Navigation Example

```html
<ul id="category">
    <li id="laptops">laptops</li>
    <li id="cameras">cameras</li>
    <li id="shoes">shoes</li>
</ul>
```

```javascript
document.querySelector("#category").addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        window.location.href = "/" + e.target.id;
    }
});
```

### Form Input Example

```html
<div id="form">
    <input type="text" id="name" data-uppercase>
    <input type="text" id="pan">
    <input type="text" id="mobile" data-uppercase>
</div>
```

```javascript
document.querySelector("#form").addEventListener('keyup', (e) => {
    if (e.target.dataset.uppercase !== undefined) {
        e.target.value = e.target.value.toUpperCase();
    }
});
```

Note: Event delegation is particularly useful for handling events on multiple similar elements or dynamically added elements, reducing the need for individual event listeners.