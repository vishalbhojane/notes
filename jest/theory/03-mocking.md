# Jest Mocking

Jest provides powerful mocking capabilities to isolate units under test and control dependencies.

## What is Mocking?

- Replacing real implementations with fake ones
- Isolating the code being tested
- Controlling function behavior and return values
- Simulating external dependencies
- Making tests faster and more reliable

## Types of Mocking

1. **Function Mocks**: Mock individual functions
2. **Module Mocks**: Mock entire modules
3. **Timer Mocks**: Mock timers and intervals
4. **Manual Mocks**: Create custom mock implementations

## Function Mocking

### jest.fn() - Mock Functions

```javascript
// Basic mock function
const mockFn = jest.fn();

test('mock function', () => {
  mockFn();
  expect(mockFn).toHaveBeenCalled();
  expect(mockFn).toHaveBeenCalledTimes(1);
});
```

### Mock Return Values

```javascript
const mockFn = jest.fn();

// Mock return value
mockFn.mockReturnValue('mocked value');

test('mock return value', () => {
  expect(mockFn()).toBe('mocked value');
});

// Mock different return values for different calls
mockFn
  .mockReturnValueOnce('first call')
  .mockReturnValueOnce('second call')
  .mockReturnValue('default');

test('mock multiple return values', () => {
  expect(mockFn()).toBe('first call');
  expect(mockFn()).toBe('second call');
  expect(mockFn()).toBe('default');
  expect(mockFn()).toBe('default');
});
```

### Mock Implementation

```javascript
const mockFn = jest.fn();

// Mock implementation
mockFn.mockImplementation((a, b) => a + b);

test('mock implementation', () => {
  expect(mockFn(2, 3)).toBe(5);
  expect(mockFn).toHaveBeenCalledWith(2, 3);
});
```

### Mock Async Functions

```javascript
const mockAsyncFn = jest.fn();

// Mock async function
mockAsyncFn.mockResolvedValue('async result');

test('mock async function', async () => {
  const result = await mockAsyncFn();
  expect(result).toBe('async result');
});

// Mock rejected promise
mockAsyncFn.mockRejectedValue(new Error('async error'));

test('mock async error', async () => {
  await expect(mockAsyncFn()).rejects.toThrow('async error');
});
```

## Module Mocking

### jest.mock() - Mock Modules

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

// Mock the entire module
jest.mock('./math');

test('mocked module', () => {
  // The real functions are replaced with mock functions
  expect(add(2, 3)).toBeUndefined();
  expect(multiply(2, 3)).toBeUndefined();
});
```

### Partial Module Mocking

```javascript
// utils.js
export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

export function divide(a, b) {
  return a / b;
}

// utils.test.js
import { add, multiply, divide } from './utils';

// Mock only specific functions
jest.mock('./utils', () => ({
  ...jest.requireActual('./utils'),
  multiply: jest.fn().mockReturnValue(10),
}));

test('partial mock', () => {
  expect(add(2, 3)).toBe(5); // Real function
  expect(multiply(2, 3)).toBe(10); // Mocked function
  expect(divide(6, 2)).toBe(3); // Real function
});
```

### Mock with Implementation

```javascript
// api.js
export async function fetchUser(id) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// api.test.js
import { fetchUser } from './api';

jest.mock('./api', () => ({
  fetchUser: jest.fn().mockResolvedValue({
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
  }),
}));

test('mocked API', async () => {
  const user = await fetchUser(1);
  expect(user).toEqual({
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
  });
});
```

## Manual Mocks

### Creating Manual Mocks

```javascript
// __mocks__/fs.js
const fs = jest.genMockFromModule('fs');

fs.readFileSync = jest.fn().mockReturnValue('mocked file content');

module.exports = fs;

// fileReader.test.js
import fs from 'fs';

jest.mock('fs');

test('manual mock', () => {
  const content = fs.readFileSync('test.txt');
  expect(content).toBe('mocked file content');
});
```

### Mocking Node Modules

```javascript
// __mocks__/axios.js
const axios = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

export default axios;

// api.test.js
import axios from 'axios';

jest.mock('axios');

test('mocked axios', async () => {
  axios.get.mockResolvedValue({ data: { id: 1, name: 'John' } });
  
  const response = await axios.get('/api/users/1');
  expect(response.data).toEqual({ id: 1, name: 'John' });
});
```

## Timer Mocking

### Mocking Timers

```javascript
// timer.js
export function delayedFunction(callback) {
  setTimeout(() => {
    callback('done');
  }, 1000);
}

// timer.test.js
import { delayedFunction } from './timer';

jest.useFakeTimers();

test('timer mock', () => {
  const callback = jest.fn();
  
  delayedFunction(callback);
  
  // Fast-forward time
  jest.runAllTimers();
  
  expect(callback).toHaveBeenCalledWith('done');
});
```

### Mocking Intervals

```javascript
// interval.js
export function startInterval(callback) {
  return setInterval(callback, 1000);
}

// interval.test.js
import { startInterval } from './interval';

jest.useFakeTimers();

test('interval mock', () => {
  const callback = jest.fn();
  
  startInterval(callback);
  
  // Fast-forward time
  jest.advanceTimersByTime(1000);
  expect(callback).toHaveBeenCalledTimes(1);
  
  jest.advanceTimersByTime(1000);
  expect(callback).toHaveBeenCalledTimes(2);
});
```

### Timer Utilities

```javascript
jest.useFakeTimers();

test('timer utilities', () => {
  const callback = jest.fn();
  
  setTimeout(callback, 1000);
  
  // Different ways to control timers
  jest.runAllTimers(); // Run all timers
  jest.runOnlyPendingTimers(); // Run only pending timers
  jest.advanceTimersByTime(1000); // Advance by specific time
  jest.advanceTimersToNextTimer(); // Advance to next timer
  
  expect(callback).toHaveBeenCalled();
});
```

## Spy Functions

### jest.spyOn() - Function Spies

```javascript
// math.js
export function add(a, b) {
  return a + b;
}

// math.test.js
import { add } from './math';

test('function spy', () => {
  const spy = jest.spyOn(console, 'log');
  
  add(2, 3);
  console.log('test');
  
  expect(spy).toHaveBeenCalledWith('test');
  
  spy.mockRestore(); // Restore original function
});
```

### Spy with Mock Implementation

```javascript
// api.js
export async function fetchData() {
  const response = await fetch('/api/data');
  return response.json();
}

// api.test.js
import { fetchData } from './api';

test('spy with mock', async () => {
  const mockData = { id: 1, name: 'Test' };
  
  const spy = jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });
  
  const result = await fetchData();
  
  expect(result).toEqual(mockData);
  expect(spy).toHaveBeenCalledWith('/api/data');
  
  spy.mockRestore();
});
```

## Mock Verification

### Mock Call Tracking

```javascript
const mockFn = jest.fn();

test('mock call tracking', () => {
  mockFn('arg1', 'arg2');
  mockFn('arg3');
  
  expect(mockFn).toHaveBeenCalled();
  expect(mockFn).toHaveBeenCalledTimes(2);
  expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
  expect(mockFn).toHaveBeenLastCalledWith('arg3');
  expect(mockFn).toHaveBeenNthCalledWith(1, 'arg1', 'arg2');
});
```

### Mock State Inspection

```javascript
const mockFn = jest.fn();

test('mock state inspection', () => {
  mockFn.mockReturnValue('test');
  
  expect(mockFn.getMockName()).toBe('jest.fn()');
  expect(mockFn.mock.results).toEqual([
    { type: 'return', value: 'test' }
  ]);
  expect(mockFn.mock.calls).toEqual([[]]);
});
```

## Mock Cleanup

### Clearing Mocks

```javascript
const mockFn = jest.fn();

test('clear mocks', () => {
  mockFn();
  expect(mockFn).toHaveBeenCalledTimes(1);
  
  mockFn.mockClear(); // Clear call history
  expect(mockFn).toHaveBeenCalledTimes(0);
  
  mockFn.mockReset(); // Clear call history and return values
  expect(mockFn()).toBeUndefined();
  
  mockFn.mockRestore(); // Restore original implementation
});
```

### Global Mock Cleanup

```javascript
// In setupTests.js or individual test files
beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.restoreAllMocks();
});
```

## Advanced Mocking Patterns

### Mocking Classes

```javascript
// UserService.js
export class UserService {
  constructor(api) {
    this.api = api;
  }
  
  async getUser(id) {
    return this.api.get(`/users/${id}`);
  }
}

// UserService.test.js
import { UserService } from './UserService';

test('mock class dependency', async () => {
  const mockApi = {
    get: jest.fn().mockResolvedValue({ id: 1, name: 'John' }),
  };
  
  const userService = new UserService(mockApi);
  const user = await userService.getUser(1);
  
  expect(mockApi.get).toHaveBeenCalledWith('/users/1');
  expect(user).toEqual({ id: 1, name: 'John' });
});
```

### Mocking Default Exports

```javascript
// logger.js
const logger = {
  info: console.log,
  error: console.error,
};

export default logger;

// logger.test.js
import logger from './logger';

jest.mock('./logger', () => ({
  __esModule: true,
  default: {
    info: jest.fn(),
    error: jest.fn(),
  },
}));

test('mock default export', () => {
  logger.info('test message');
  expect(logger.info).toHaveBeenCalledWith('test message');
});
```

### Conditional Mocking

```javascript
// config.js
export const isProduction = process.env.NODE_ENV === 'production';

// config.test.js
import { isProduction } from './config';

jest.mock('./config', () => ({
  isProduction: false,
}));

test('conditional mock', () => {
  expect(isProduction).toBe(false);
});
```

## Best Practices

### 1. Mock at the Right Level

```javascript
// Good - mock at dependency boundary
jest.mock('./api');

// Bad - mock internal implementation
jest.mock('./utils', () => ({
  ...jest.requireActual('./utils'),
  internalHelper: jest.fn(),
}));
```

### 2. Use Descriptive Mock Names

```javascript
// Good
const mockFetchUser = jest.fn().mockResolvedValue({ id: 1, name: 'John' });

// Bad
const mock = jest.fn();
```

### 3. Clean Up Mocks

```javascript
describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
  });
  
  // Tests...
});
```

### 4. Mock Only What You Need

```javascript
// Good - mock only the function you're testing
jest.mock('./api', () => ({
  fetchUser: jest.fn(),
}));

// Bad - mock everything
jest.mock('./api');
```

## Complete Example

```javascript
// userService.js
import { api } from './api';
import { logger } from './logger';

export class UserService {
  async getUser(id) {
    try {
      logger.info(`Fetching user ${id}`);
      const user = await api.getUser(id);
      logger.info(`User ${id} fetched successfully`);
      return user;
    } catch (error) {
      logger.error(`Error fetching user ${id}:`, error);
      throw error;
    }
  }
  
  async createUser(userData) {
    try {
      logger.info('Creating user:', userData);
      const user = await api.createUser(userData);
      logger.info(`User created with ID: ${user.id}`);
      return user;
    } catch (error) {
      logger.error('Error creating user:', error);
      throw error;
    }
  }
}

// userService.test.js
import { UserService } from './userService';
import { api } from './api';
import { logger } from './logger';

// Mock dependencies
jest.mock('./api');
jest.mock('./logger');

describe('UserService', () => {
  let userService;
  
  beforeEach(() => {
    userService = new UserService();
    jest.clearAllMocks();
  });
  
  describe('getUser', () => {
    test('should fetch user successfully', async () => {
      const mockUser = { id: 1, name: 'John Doe' };
      api.getUser.mockResolvedValue(mockUser);
      
      const result = await userService.getUser(1);
      
      expect(api.getUser).toHaveBeenCalledWith(1);
      expect(logger.info).toHaveBeenCalledWith('Fetching user 1');
      expect(logger.info).toHaveBeenCalledWith('User 1 fetched successfully');
      expect(result).toEqual(mockUser);
    });
    
    test('should handle API errors', async () => {
      const error = new Error('API Error');
      api.getUser.mockRejectedValue(error);
      
      await expect(userService.getUser(1)).rejects.toThrow('API Error');
      
      expect(logger.error).toHaveBeenCalledWith('Error fetching user 1:', error);
    });
  });
  
  describe('createUser', () => {
    test('should create user successfully', async () => {
      const userData = { name: 'Jane Doe', email: 'jane@example.com' };
      const createdUser = { id: 2, ...userData };
      api.createUser.mockResolvedValue(createdUser);
      
      const result = await userService.createUser(userData);
      
      expect(api.createUser).toHaveBeenCalledWith(userData);
      expect(logger.info).toHaveBeenCalledWith('Creating user:', userData);
      expect(logger.info).toHaveBeenCalledWith('User created with ID: 2');
      expect(result).toEqual(createdUser);
    });
  });
});
```
