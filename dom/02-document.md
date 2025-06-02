The `document` object provides access to and manipulation of the currently loaded HTML document. It's a property of the global `window` object.

## Key Properties and Methods:

### Accessing Document Elements:

```javascript
document.documentElement  // Accesses the <html> element
document.body             // Accesses the <body> element
```

### Creating Elements:

```javascript
const element = document.createElement("span");
element.innerText = "Hello World";
document.body.appendChild(element);
```

### Selecting Elements: 1. By ID:

```javascript
const divWithId = document.getElementById("div-id");
```

2. By Class Name:

```javascript
const divsWithClass = document.getElementsByClassName("div-class");
const divsWithClassArray = Array.from(divsWithClass);
```

3. Using Query Selector:

```javascript
document.querySelector("#id .class element");  // Returns first match
document.querySelector('[data-test]');         // Selects by data attribute
document.querySelector("input[type='text']");  // Selects specific input
document.querySelector("body > input[type='text']");  // More specific selection
```

4. Using Query Selector All:

```javascript
const divsWithClasses = document.querySelectorAll('.div-class');
```

### Manipulating Elements:

```javascript
divWithId.style.color = "red";  // Setting inline CSS
```

### Working with NodeLists:

```javascript
divsWithClasses.forEach(div => div.style.color = "red");
```

## Best Practices:

- Prefer `querySelector` and `querySelectorAll` for flexibility.
- Use `getElementById` for performance when selecting by ID.
- Convert HTMLCollections to arrays for full array method access.
- Minimize DOM manipulation for better performance.
- Use `textContent` over `innerText` for better performance when setting text.

## Important Notes:

- `getElementById` returns `null` if the ID doesn't exist.
- `getElementsByClassName` returns a live HTMLCollection.
- `querySelectorAll` returns a static NodeList.
- NodeLists have `forEach`, but for other array methods, convert to an array first.

Remember: Efficient DOM manipulation is crucial for web application performance. Always consider the most appropriate method for your specific use case.