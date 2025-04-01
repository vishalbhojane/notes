JSON (JavaScript Object Notation) is a lightweight data format for storing and exchanging structured data.

## 1. What is JSON?

- Text-based format for representing structured data
- Syntax resembles JavaScript objects but is language-independent
- Commonly used in APIs, config files, and databases

**Example:**

```json
{
  "name": "Alice",
  "age": 25,
  "isStudent": true,
  "courses": ["Math", "Physics"]
}
```

**Rules:**

- Keys must be double-quoted strings
- Values can be: strings, numbers, booleans, arrays, objects, or null

## 2. Parsing and Stringifying

### A. JSON.parse()

Converts a JSON string → JavaScript object.

```javascript
const jsonString = '{"name": "Alice", "age": 25}';
const obj = JSON.parse(jsonString);
console.log(obj.name); // "Alice"
```

### B. JSON.stringify()

Converts a JavaScript object → JSON string.

```javascript
const user = {name: 'Alice', age: 25};
const jsonString = JSON.stringify(user);
console.log(jsonString); // '{"name":"Alice","age":25}'
```

**Optional Arguments:**

```javascript
// Pretty-print with 2-space indentation
JSON.stringify(user, null, 2);
```

## 3. Fetching and Sending JSON Data

### A. Fetching JSON (GET Request)

```javascript
fetch('https://api.example.com/data')
  .then((response) => response.json()) // Parse JSON response
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

### B. Sending JSON (POST Request)

```javascript
const data = {username: 'Alice', password: '123'};

fetch('https://api.example.com/login', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(data), // Convert object to JSON string
}).then((response) => response.json());
```

## 4. Data Validation

Ensure JSON data matches expected structure before use.

### A. Manual Validation

```javascript
function isValidUser(user) {
  return (
    typeof user.name === 'string' &&
    typeof user.age === 'number' &&
    Array.isArray(user.courses)
  );
}

const user = JSON.parse(jsonString);
if (isValidUser(user)) {
  console.log(");
} else {
  console.error("Invalid data!");
}
```

### B. Libraries for Validation

- Joi (Schema-based validation)
- Zod (TypeScript-friendly)
- AJV (JSON Schema validator)

**Example with Zod:**

```javascript
import {z} from 'zod';

const UserSchema = z.object({
  name: z.string(),
  age: z.number(),
  courses: z.array(z.string()),
});

const user = UserSchema.parse(JSON.parse(jsonString)); // Throws if invalid
```

## 5. Working with APIs

### A. Public APIs for Practice

| API             | Description       | Example Endpoint                                |
| --------------- | ----------------- | ----------------------------------------------- |
| JSONPlaceholder | Fake REST API     | https://jsonplaceholder.typicode.com/users      |
| OpenWeatherMap  | Weather data      | https://api.openweathermap.org/data/2.5/weather |
| Dog API         | Random dog images | https://dog.ceo/api/breeds/image/random         |

### B. Handling API Responses

```javascript
async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}`
    );
    const data = await response.json();

    if (data.cod !== 200) throw new Error(data.message);
    console.log(`Temperature: ${data.main.temp}°C`);
  } catch (error) {
    console.error('Failed to fetch weather:', error.message);
  }
}
```
