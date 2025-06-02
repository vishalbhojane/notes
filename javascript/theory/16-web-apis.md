Web APIs extend JavaScript's capabilities in the browser, enabling interactions with the browser, device, and network.

## 1. Fetch API

Used for making HTTP requests (replaces XMLHttpRequest).

### Basic GET Request

```javascript
fetch("https://api.example.com/data")
  .then((response) => {
    if (!response.ok) throw new Error("Network error");
    return response.json(); // Parses JSON
  })
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

### POST Request

```javascript
fetch("https://api.example.com/data", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ key: "value" }),
}).then((response) => response.json());
```

**Key Points:**

- Returns a Promise
- Requires .json()/.text() to parse response
- Use async/await for cleaner code:

javascript

```javascript
async function fetchData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}
```

## 2. Local Storage & Session Storage

Store data in the browser.

| Feature     | localStorage                                | sessionStorage          |
| ----------- | ------------------------------------------- | ----------------------- |
| Persistence | Survives browser restart                    | Cleared when tab closes |
| Scope       | Shared across tabs                          | Tab-specific            |
| Methods     | setItem(), getItem(), removeItem(), clear() | Same as localStorage    |

### Usage

javascript

```javascript
// Set
localStorage.setItem("username", "Alice");

// Get
const user = localStorage.getItem("username"); // "Alice"

// Remove
localStorage.removeItem("username");

// Clear all
localStorage.clear();
```

**Limitations:**

- ❌ Only stores strings (use JSON.stringify() for objects)
- ❌ 5MB limit per domain

## 3. WebSockets

Real-time bidirectional communication (e.g., chat apps).

**Example**

```javascript
const socket = new WebSocket("wss://echo.websocket.org");

socket.onopen = () => {
  socket.send("Hello!");
};

socket.onmessage = (event) => {
  console.log("Received:", event.data);
};

socket.onclose = () => {
  console.log("Connection closed");
};
```

**Key Points:**

- Uses ws:// (unencrypted) or wss:// (encrypted)
- Events: onopen, onmessage, onclose, onerror

## 4. Geolocation API

Access the user's location (requires permission).

### Get Current Position

```javascript
navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log("Latitude:", position.coords.latitude);
    console.log("Longitude:", position.coords.longitude);
  },
  (error) => {
    console.error("Error:", error.message);
  }
);
```

**Methods:**

- getCurrentPosition() → One-time location
- watchPosition() → Continuously track location

## 5. Notifications API

Display system notifications (requires permission).

**Example**

```javascript
// Request permission
Notification.requestPermission().then((permission) => {
  if (permission === "granted") {
    new Notification("Hello!", {
      body: "This is a notification",
      icon: "/icon.png",
    });
  }
});
```

**Note:** - 🔔 Only works after user interaction (e.g., button click)

## 6. Canvas API

Draw graphics dynamically using JavaScript.

### Basic Usage

```html
<canvas id="myCanvas" width="200" height="100"></canvas>
```

```javascript
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Draw a red rectangle
ctx.fillStyle = "red";
ctx.fillRect(10, 10, 150, 80);

// Draw text
ctx.font = "20px Arial";
ctx.fillText("Hello Canvas!", 30, 60);
```

**Use Cases:**

- Charts, games, image editing

## 7. Web Workers

Run scripts in background threads (avoid UI freezing).

### Main Script

```javascript
const worker = new Worker("worker.js");

worker.postMessage("Start!"); // Send data to worker

worker.onmessage = (event) => {
  console.log("Worker says:", event.data);
};
```

### worker.js

```javascript
self.onmessage = (event) => {
  console.log("Main script sent:", event.data);
  self.postMessage("Working hard!");
};
```

**Key Points:**

- Workers cannot access the DOM
- Use postMessage() for communication

## 8. Clipboard API

Provides read/write access to the system clipboard.

### A. Writing to Clipboard

```javascript
// Text
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Copied to clipboard");
  } catch (err) {
    console.error("Failed to copy:", err);
  }
}

// Complex data (e.g., images)
const blob = new Blob(["Clipboard data"], { type: "text/plain" });
const clipboardItem = new ClipboardItem({ "text/plain": blob });
await navigator.clipboard.write([clipboardItem]);
```

### B. Reading from Clipboard

```javascript
async function pasteText() {
  try {
    const text = await navigator.clipboard.readText();
    console.log("Pasted:", text);
  } catch (err) {
    console.error("Failed to read:", err);
  }
}

// For sensitive data (requires permission)
const permission = await navigator.permissions.query({
  name: "clipboard-read",
});
if (permission.state === "granted") {
  // Read clipboard
}
```

**Security Notes:**

- Requires user gesture (e.g., click event)
- HTTPS or localhost only
- Browser may show permission prompt

## 9. Payment Request API

Standardizes checkout flows across websites.

### Basic Implementation

```javascript
const paymentMethods = [{
  supportedMethods: 'basic-carsupportedNetworks: ['visa', 'mastercard']
  }
}];

const paymentDetails = {
  total: {
    label: 'Total',
    amount: { currency: 'USD', value: '10.00' }
  }
};

const paymentRequest = new PaymentRequest(
  paymentMethods,
  paymentDetails
);

async function processPayment() {
  try {
    const paymentResponse = await paymentRequest.show();
    // Send paymentResponse to server
    await paymentResponse.complete('success');
  } catch (err) {
    console.error('Payment failed:', err);
  }
}

// Trigger on button click
document.getElementById('pay').addEventListener('click', processPayment);
```

## 10. File & Directory Access API

### A. File Access (Legacy)

```javascript
// Single file
const fileInput = document.getElementById("file-input");
fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  console.log("Selected file:", file.name);
});

// Multiple files
const files = e.target.files; // FileList
```

### B. File System Access API (Modern)

```javascript
// Open file
async function openFile() {
  try {
    const [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();
    console.log("File content:", await file.text());
  } catch (err) {
    if (err.name !== "AbortError") {
      console.error(err);
    }
  }
}

// Save file
async function saveFile() {
  const options = {
    types: [
      {
        description: "Text Files",
        accept: { "text/plain": [".txt"] },
      },
    ],
  };
  const handle = await window.showSaveFilePicker(options);
  const writable = await handle.createWritable();
  await writable.write("File content");
  await writable.close();
}

// Directory access
const dirHandle = await window.showDirectoryPicker();
for await (const entry of dirHandle.values()) {
  console.log(entry.kind, entry.name);
}
```

### C. File Reading Methods

| Method         | Returns        | Use Case             |
| -------------- | -------------- | -------------------- |
| .text()        | String         | Text files           |
| .arrayBuffer() | ArrayBuffer    | Binary data          |
| .stream()      | ReadableStream | Large files          |
| .slice()       | Blob           | Partial file reading |

```javascript
const buffer = await file.arrayBuffer();
const img = new Blob([buffer], { type: file.type });
document.getElementById("preview").src = URL.createObjectURL(img);
```
