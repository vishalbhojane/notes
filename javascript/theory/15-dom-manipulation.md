The Document Object Model (DOM) is a programming interface for web documents. JavaScript can manipulate the DOM to dynamically change content, structure, and style.

## 1. Selecting Elements

### A. Single Element Selection

| Method             | Description                        | Example                             |
| ------------------ | ---------------------------------- | ----------------------------------- |
| `getElementById()` | Selects by id                      | `document.getElementById("header")` |
| `querySelector()`  | Selects first match (CSS selector) | `document.querySelector(".btn")`    |

### B. Multiple Elements Selection

| Method                     | Description                        | Example                                   |
| -------------------------- | ---------------------------------- | ----------------------------------------- |
| `getElementsByClassName()` | Selects by class                   | `document.getElementsByClassName("item")` |
| `getElementsByTagName()`   | Selects by tag                     | `document.getElementsByTagName("div")`    |
| `querySelectorAll()`       | Selects all matches (CSS selector) | `document.querySelectorAll("li")`         |

**Example:**

```javascript
const header = document.getElementById('header');
const buttons = document.querySelectorAll('.btn');
```

## 2. Changing Content

| Method           | Description                      | Example                                     |
| ---------------- | -------------------------------- | ------------------------------------------- |
| `innerText`      | Sets/gets visible text           | `element.innerText = "Hello"`               |
| `textContent`    | Gets all text (including hidden) | `element.textContent = "Hello"`             |
| `innerHTML`      | Sets/gets HTML content           | `element.innerHTML = "<strong>Hi</strong>"` |
| `setAttribute()` | Changes an attribute             | `element.setAttribute("href", "#")`         |

**Example:**

```javascript
const div = document.querySelector('div');
div.innerText = 'New text';
div.innerHTML = '<p>Styled text</p>';
div.setAttribute('class', 'active');
```

## 3. Adding & Removing Elements

### A. Creating & Adding Elements

```javascript
const newElement = document.createElement('div');
newElement.innerText = "I'm new!";

// Append to the end
document.body.appendChild(newElement);

// Insert before another element
parent.insertBefore(newElement, referenceElement);
```

### B. Removing Elements

```javascript
const element = document.querySelector('.item');
element.remove(); // Modern way (ES6)

// Older way
parent.removeChild(element);
```

## 4. Event Listeners

### A. Adding Events

```javascript
const button = document.querySelector('button');
button.addEventListener('click', () => {
  console.log('Button clicked!');
});
```

### B. Removing Events

```javascript
function handleClick() {
  console.log('Clicked!');
}

button.addEventListener('click', handleClick);
button.removeEventListener('click', handleClick); // Removes the listener
```

### Common Events

| Event                       | Description       |
| --------------------------- | ----------------- |
| `click`                     | Mouse click       |
| `mouseenter` / `mouseleave` | Hover effects     |
| `keydown` / `keyup`         | Keyboard input    |
| `submit`                    | Form submission   |
| `load`                      | Page/image loaded |

## 5. Event Delegation

Efficiently handle events for multiple elements using a single parent listener.

### Problem Without Delegation

```javascript
// Inefficient (adds listeners to every button)
document.querySelectorAll('.btn').forEach((btn) => {
  btn.addEventListener('click', handleClick);
});
```

### Solution With Delegation

```javascript
// Efficient (one listener on parent)
document.getElementById('container').addEventListener('click', (e) => {
  if (e.target.classList.contains('btn')) {
    console.log('Button clicked:', e.target);
  }
});
```

**Benefits:**

- Works for dynamically added elements
- Better performance for many elements

## 6. Forms & Input Handling

### A. Accessing Form Data

```javascript
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevents page reload
  const input = document.querySelector('#username');
  console.log(input.value); // Get input value
});
```

### B. Input Events

```javascript
const input = document.querySelector('input');
input.addEventListener('input', (e) => {
  console.log('Typed:', e.target.value);
});
```

### C. Form Validation

```javascript
form.addEventListener('submit', (e) => {
  const email = document.getElementById('email').value;
  if (!email.includes('@')) {
    alert('Invalid email!');
    e.preventDefault();
  }
});
```
