Testing ensures your code works as expected and prevents regressions. Here's a breakdown of key testing concepts and tools.

## 1. Unit Testing

Tests individual functions or modules in isolation.

### Popular Frameworks

| Tool  | Description                                       |
| ----- | ------------------------------------------------- |
| Jest  | All-in-one (assertions, mocking, coverage)        |
| Mocha | Flexible (needs plugins like Chai for assertions) |

### Example with Jest

```javascript
// sum.js
function sum(a, b) {
  return a + b;
}

// sum.test.js
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

**Key Features:**

- Snapshot testing
- Built-in mocking

### Example with Mocha + Chai

```javascript
const {expect} = require('chai');
const sum = require('./sum');

describe('Sum function', () => {
  it('should return 3 for 1 + 2', () => {
    expect(sum(1, 2)).to.equal(3);
  });
});
```

## 2. Integration Testing

Tests interactions between multiple units/modules.

### Example (Testing API Routes)

```javascript
// api.test.js
const request = require('supertest');
const app = require('./app');

describe('GET /users', () => {
  it('responds with JSON', async () => {
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([]));
  });
});
```

**Tools:**

- Supertest (HTTP assertions)
- Jest/Mocha (test runners)

## 3. End-to-End (E2E)

Testing Tests full user flows in a real browser.

### Popular Tools

| Tool       | Description                                  |
| ---------- | -------------------------------------------- |
| Cypress    | All-in-one (fast, debuggable)                |
| Playwright | Cross-browser (Chromium, Firefox, WebKit)    |
| Selenium   | Legacy (slower, but supports many languages) |

### Example with Cypress

javascript

```javascript
// login.spec.js
describe('Login Test', () => {
  it('successfully logs in', () => {
    cy.visit('/login');
    cy.get('#email').type('user@example.com');
    cy.get('#password').type('password');
    cy.get('form').submit();
    cy.url().should('include', '/dashboard');
  });
});
```

## 4. Test-Driven Development (TDD)

Write tests before writing code.

### TDD Cycle

1. Red: Write a failing test
2. Green: Write minimal code to pass the test
3. Refactor: Improve code without breaking tests

### Example (TDD for a Counter):

```javascript
// Step 1: Write a failing test
test('counter increments', () => {
  expect(counter(0, 'INCREMENT')).toBe(1);
});

// Step 2: Implement the counter
function counter(state, action) {
  if (action === 'INCREMENT') return state + 1;
  return state;
}
```

## 5. Mocking and Stubbing

Replace real dependencies with fake ones for testing.

### Jest Mocking Example

```javascript
// db.js
export const fetchUser = () => {
  /* ... */
};

// user.test.js
jest.mock('./db');

test('fetches user', async () => {
  const mockUser = {name: 'Alice'};
  db.fetchUser.mockResolvedValue(mockUser);
  const user = await fetchUser();
  expect(user).toEqual(mockUser);
});
```

### Sinon (for Mocha)

```javascript
const sinon = require('sinon');
const db = require('./db');

it('should call db.save', () => {
  const saveStub = sinon.stub(db, 'save');
  saveStub.returns(true);
  expect(db.save()).toBe(true);
  saveStub.restore();
});
```

## 6. Testing Async Code

### Callbacks

```javascript
test('fetches data', (done) => {
  fetchData((data) => {
    expect(data).toBe('success');
    done(); // Tell Jest the test is complete
  });
});
```

### Promises

```javascript
test('fetches data', () => {
  return fetchData().then((data) => {
    expect(data).toBe('success');
  });
});
```

### Async/Await

```javascript
test('fetches data', async () => {
  const data = await fetchData();
  expect(data).toBe('success');
});
```
