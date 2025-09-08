The Fetch API provides a JavaScript interface for making HTTP requests and processing responses.

## Basic Syntax

```javascript
fetch('url')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

## Parameters

1. **URL**: The endpoint for the request.
2. **Options** (optional): An object with properties:
   - `method`: HTTP method (GET, POST, PUT, DELETE, etc.)
   - `headers`: Request headers
   - `body`: Data to send (for POST/PUT requests)
   - `mode`: Request mode (e.g., 'cors', 'no-cors', 'same-origin')
   - `credentials`: Whether to send cookies (e.g., 'include', 'same-origin', 'omit')

## GET Request

```javascript
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

## POST Request

```javascript
const data = {key1: 'value1', key2: 'value2'};

fetch('https://api.example.com/post', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

## Using Async/Await

```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

fetchData();
```

## Error Handling

```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

fetchData();
```

## AbortController

Sometimes you may want to cancel an ongoing fetch request
for example, when a user navigates away, or a search input changes before the request completes
You can use the AbortController API for this purpose

Basic Usage

```javascript
const controller = new AbortController();
const signal = controller.signal;

fetch('https://api.example.com/data', {signal})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => {
    if (error.name === 'AbortError') {
      console.log('Fetch aborted');
    } else {
      console.error('Fetch error:', error);
    }
  });

// Abort the request after 2 seconds
setTimeout(() => controller.abort(), 2000);
```

## Key Points

- `fetch()` returns a Promise that resolves to a Response object.
- Use `response.json()` to parse JSON responses.
- Always include error handling with `.catch()` or try/catch blocks.
- For non-GET requests, specify the method and include necessary headers and body.
- Use async/await for more readable asynchronous code.
