# Jest Introduction

Jest is a delightful JavaScript testing framework with a focus on simplicity and support for large web applications.

## What is Jest?

- A JavaScript testing framework developed by Facebook
- Zero-configuration testing platform
- Built-in assertion library
- Mocking capabilities
- Code coverage reporting
- Snapshot testing
- Parallel test execution

## Why Use Jest?

- **Zero Configuration**: Works out of the box for most JavaScript projects
- **Fast**: Parallel test execution and intelligent caching
- **Snapshot Testing**: Capture component snapshots for regression testing
- **Isolated**: Tests run in isolation with automatic cleanup
- **Mocking**: Built-in mocking capabilities for functions and modules
- **Coverage**: Built-in code coverage reporting
- **Watch Mode**: Interactive mode for development
- **Rich Ecosystem**: Extensive plugin and extension support

## Key Features

1. **Test Runner**: Execute tests with various options
2. **Assertions**: Built-in expect() function with matchers
3. **Mocking**: Mock functions, modules, and timers
4. **Snapshots**: Capture and compare component outputs
5. **Coverage**: Generate coverage reports
6. **Watch Mode**: Run tests in watch mode for development
7. **Configuration**: Flexible configuration options

## Installation

### Basic Installation

```bash
npm install --save-dev jest
```

### With TypeScript Support

```bash
npm install --save-dev jest @types/jest ts-jest
```

### With React Testing Library

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

## Basic Setup

### Package.json Configuration

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "jest": {
    "testEnvironment": "node",
    "collectCoverageFrom": [
      "src/**/*.{js,jsx,ts,tsx}",
      "!src/**/*.d.ts"
    ]
  }
}
```

### Jest Configuration File

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.js',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

## Basic Test Structure

### Simple Test

```javascript
// sum.test.js
function sum(a, b) {
  return a + b;
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

### Test Suite

```javascript
// calculator.test.js
describe('Calculator', () => {
  test('adds two numbers', () => {
    expect(2 + 2).toBe(4);
  });

  test('subtracts two numbers', () => {
    expect(5 - 3).toBe(2);
  });

  test('multiplies two numbers', () => {
    expect(4 * 3).toBe(12);
  });
});
```

## Test File Naming Conventions

Jest looks for test files using these patterns:

- Files with `.test.js` suffix
- Files with `.spec.js` suffix
- Files in `__tests__` folders

```bash
# Examples of test file names
src/
├── utils/
│   ├── math.js
│   └── math.test.js
├── components/
│   ├── Button.jsx
│   └── Button.test.jsx
└── __tests__/
    ├── utils.test.js
    └── components.test.js
```

## Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- math.test.js

# Run tests matching a pattern
npm test -- --testNamePattern="adds"

# Run tests in verbose mode
npm test -- --verbose
```

### Watch Mode Options

```bash
# Run tests in watch mode
npm test -- --watch

# Run tests in watch mode (interactive)
npm test -- --watchAll

# Run tests in watch mode (non-interactive)
npm test -- --watchAll=false
```

## Test Environment

Jest supports different test environments:

### Node Environment (Default)

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'node',
};
```

### Browser Environment (jsdom)

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
};
```

### Custom Environment

```javascript
// jest.config.js
module.exports = {
  testEnvironment: '<rootDir>/custom-environment.js',
};
```

## Setup and Teardown

### Global Setup

```javascript
// jest.config.js
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
};
```

```javascript
// src/setupTests.js
import '@testing-library/jest-dom';

// Global setup code
beforeAll(() => {
  // Setup code that runs once before all tests
});

afterAll(() => {
  // Cleanup code that runs once after all tests
});
```

### Per-Test Setup

```javascript
describe('User API', () => {
  beforeEach(() => {
    // Setup code that runs before each test
    console.log('Setting up test...');
  });

  afterEach(() => {
    // Cleanup code that runs after each test
    console.log('Cleaning up test...');
  });

  test('should create user', () => {
    // Test code
  });
});
```

## Configuration Options

### Common Configuration

```javascript
// jest.config.js
module.exports = {
  // Test environment
  testEnvironment: 'jsdom',
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  
  // Module name mapping
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  
  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.js',
  ],
  
  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  
  // Test timeout
  testTimeout: 10000,
  
  // Verbose output
  verbose: true,
};
```

## Project Structure Example

```
project/
├── src/
│   ├── components/
│   │   ├── Button.jsx
│   │   └── Button.test.jsx
│   ├── utils/
│   │   ├── math.js
│   │   └── math.test.js
│   └── setupTests.js
├── __tests__/
│   └── integration.test.js
├── jest.config.js
└── package.json
```

## Best Practices

### 1. Test Organization

```javascript
// Group related tests in describe blocks
describe('UserService', () => {
  describe('createUser', () => {
    test('should create user with valid data', () => {
      // Test implementation
    });

    test('should throw error with invalid data', () => {
      // Test implementation
    });
  });

  describe('updateUser', () => {
    test('should update user successfully', () => {
      // Test implementation
    });
  });
});
```

### 2. Test Naming

```javascript
// Use descriptive test names
test('should return sum of two positive numbers', () => {
  expect(sum(2, 3)).toBe(5);
});

test('should handle negative numbers correctly', () => {
  expect(sum(-1, -2)).toBe(-3);
});

test('should return zero when both inputs are zero', () => {
  expect(sum(0, 0)).toBe(0);
});
```

### 3. Test Isolation

```javascript
// Each test should be independent
describe('User API', () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
  });

  test('should create user', () => {
    // Test implementation
  });

  test('should update user', () => {
    // Test implementation
  });
});
```

## Common Use Cases

### Testing Functions

```javascript
// math.js
export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

// math.test.js
import { add, multiply } from './math';

describe('Math functions', () => {
  test('add should return sum of two numbers', () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
    expect(add(0, 0)).toBe(0);
  });

  test('multiply should return product of two numbers', () => {
    expect(multiply(2, 3)).toBe(6);
    expect(multiply(-2, 3)).toBe(-6);
    expect(multiply(0, 5)).toBe(0);
  });
});
```

### Testing Async Code

```javascript
// api.js
export async function fetchUser(id) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// api.test.js
import { fetchUser } from './api';

describe('API functions', () => {
  test('fetchUser should return user data', async () => {
    const user = await fetchUser(1);
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
  });
});
```

## Next Steps

After understanding the basics, explore:

1. **Assertions and Matchers**: Learn about expect() and matchers
2. **Mocking**: Understand how to mock functions and modules
3. **Testing Patterns**: Learn about different testing strategies
4. **React Testing**: Test React components and hooks
5. **Advanced Configuration**: Customize Jest for your project needs
