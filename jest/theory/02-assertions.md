# Jest Assertions and Matchers

Jest provides a rich set of assertion functions through the `expect()` function and various matchers.

## What are Assertions?

- Statements that verify the expected behavior of code
- Use `expect()` function to create assertions
- Matchers define how to compare values
- Provide clear error messages when tests fail

## Basic Assertions

### expect() Function

```javascript
test('basic assertion', () => {
  expect(2 + 2).toBe(4);
});
```

### Common Matchers

#### toBe() - Exact Equality

```javascript
test('toBe matcher', () => {
  expect(2 + 2).toBe(4);
  expect('hello').toBe('hello');
  expect(true).toBe(true);
  
  // For objects, use toEqual instead
  expect({ name: 'John' }).not.toBe({ name: 'John' });
});
```

#### toEqual() - Deep Equality

```javascript
test('toEqual matcher', () => {
  const user = { name: 'John', age: 30 };
  expect(user).toEqual({ name: 'John', age: 30 });
  
  const array = [1, 2, 3];
  expect(array).toEqual([1, 2, 3]);
});
```

#### toBeTruthy() and toBeFalsy()

```javascript
test('truthy and falsy values', () => {
  expect(true).toBeTruthy();
  expect(1).toBeTruthy();
  expect('hello').toBeTruthy();
  expect({}).toBeTruthy();
  
  expect(false).toBeFalsy();
  expect(0).toBeFalsy();
  expect('').toBeFalsy();
  expect(null).toBeFalsy();
  expect(undefined).toBeFalsy();
});
```

## String Matchers

### toMatch() - String Matching

```javascript
test('string matching', () => {
  expect('Hello World').toMatch(/World/);
  expect('Hello World').toMatch('World');
  expect('Hello World').not.toMatch(/Python/);
});
```

### toContain() - Array/String Contains

```javascript
test('contain matcher', () => {
  const shoppingList = ['milk', 'bread', 'eggs'];
  expect(shoppingList).toContain('milk');
  expect('Hello World').toContain('World');
  expect(shoppingList).not.toContain('beer');
});
```

### toHaveLength() - Length Checking

```javascript
test('length matcher', () => {
  expect([1, 2, 3]).toHaveLength(3);
  expect('hello').toHaveLength(5);
  expect('').toHaveLength(0);
});
```

## Number Matchers

### toBeGreaterThan() and toBeLessThan()

```javascript
test('number comparisons', () => {
  expect(10).toBeGreaterThan(5);
  expect(5).toBeLessThan(10);
  expect(10).toBeGreaterThanOrEqual(10);
  expect(5).toBeLessThanOrEqual(5);
});
```

### toBeCloseTo() - Floating Point

```javascript
test('floating point comparison', () => {
  expect(0.1 + 0.2).toBeCloseTo(0.3);
  expect(0.1 + 0.2).toBeCloseTo(0.3, 5); // 5 decimal places
});
```

## Array Matchers

### toContain() - Array Elements

```javascript
test('array contains', () => {
  const fruits = ['apple', 'banana', 'orange'];
  expect(fruits).toContain('banana');
  expect(fruits).not.toContain('grape');
});
```

### toHaveLength() - Array Length

```javascript
test('array length', () => {
  expect([1, 2, 3]).toHaveLength(3);
  expect([]).toHaveLength(0);
});
```

### toEqual() - Array Equality

```javascript
test('array equality', () => {
  expect([1, 2, 3]).toEqual([1, 2, 3]);
  expect([1, 2, 3]).not.toEqual([1, 2, 4]);
});
```

## Object Matchers

### toHaveProperty() - Object Properties

```javascript
test('object properties', () => {
  const user = { name: 'John', age: 30, email: 'john@example.com' };
  
  expect(user).toHaveProperty('name');
  expect(user).toHaveProperty('age', 30);
  expect(user).not.toHaveProperty('address');
});
```

### toMatchObject() - Partial Object Matching

```javascript
test('partial object matching', () => {
  const user = { 
    name: 'John', 
    age: 30, 
    email: 'john@example.com',
    address: { city: 'New York', country: 'USA' }
  };
  
  expect(user).toMatchObject({ name: 'John', age: 30 });
  expect(user).toMatchObject({ 
    address: { city: 'New York' } 
  });
});
```

### toEqual() - Object Equality

```javascript
test('object equality', () => {
  const user1 = { name: 'John', age: 30 };
  const user2 = { name: 'John', age: 30 };
  
  expect(user1).toEqual(user2);
  expect(user1).not.toBe(user2); // Different references
});
```

## Function Matchers

### toThrow() - Exception Testing

```javascript
test('function throws error', () => {
  function throwError() {
    throw new Error('Something went wrong');
  }
  
  expect(throwError).toThrow();
  expect(throwError).toThrow('Something went wrong');
  expect(throwError).toThrow(Error);
  expect(throwError).toThrow(/Something/);
});
```

### toReturn() - Return Value Testing

```javascript
test('function return value', () => {
  function add(a, b) {
    return a + b;
  }
  
  expect(add(2, 3)).toBe(5);
  expect(add(-1, 1)).toBe(0);
});
```

## Async Matchers

### Testing Promises

```javascript
test('async function with promises', async () => {
  async function fetchData() {
    return Promise.resolve({ data: 'test' });
  }
  
  const result = await fetchData();
  expect(result).toEqual({ data: 'test' });
});
```

### Testing Async/Await

```javascript
test('async/await testing', async () => {
  async function getUser(id) {
    // Simulate API call
    return { id, name: 'John' };
  }
  
  const user = await getUser(1);
  expect(user).toHaveProperty('id', 1);
  expect(user).toHaveProperty('name', 'John');
});
```

### Testing Rejected Promises

```javascript
test('rejected promise', async () => {
  async function fetchData() {
    throw new Error('Network error');
  }
  
  await expect(fetchData()).rejects.toThrow('Network error');
});
```

## Custom Matchers

### Creating Custom Matchers

```javascript
// Custom matcher for checking if number is even
expect.extend({
  toBeEven(received) {
    const pass = received % 2 === 0;
    if (pass) {
      return {
        message: () => `expected ${received} not to be even`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be even`,
        pass: false,
      };
    }
  },
});

test('custom matcher', () => {
  expect(2).toBeEven();
  expect(4).toBeEven();
  expect(3).not.toBeEven();
});
```

## Negation with .not

### Using .not

```javascript
test('negation examples', () => {
  expect(2 + 2).not.toBe(5);
  expect('hello').not.toContain('world');
  expect([1, 2, 3]).not.toContain(4);
  expect({ name: 'John' }).not.toHaveProperty('age');
});
```

## Complex Assertions

### Multiple Assertions

```javascript
test('multiple assertions', () => {
  const user = { name: 'John', age: 30, email: 'john@example.com' };
  
  expect(user).toHaveProperty('name');
  expect(user.name).toBe('John');
  expect(user.age).toBeGreaterThan(18);
  expect(user.email).toMatch(/@/);
});
```

### Conditional Assertions

```javascript
test('conditional assertions', () => {
  const user = { name: 'John', age: 30, isAdmin: false };
  
  if (user.isAdmin) {
    expect(user).toHaveProperty('permissions');
  } else {
    expect(user).not.toHaveProperty('permissions');
  }
});
```

## Error Messages

### Custom Error Messages

```javascript
test('custom error messages', () => {
  const result = 2 + 2;
  expect(result).toBe(5, 'Expected 2 + 2 to equal 5');
});
```

### Descriptive Test Names

```javascript
test('should return sum of two positive numbers', () => {
  expect(add(2, 3)).toBe(5);
});

test('should handle negative numbers correctly', () => {
  expect(add(-1, -2)).toBe(-3);
});
```

## Best Practices

### 1. Use Descriptive Test Names

```javascript
// Good
test('should return user with correct properties when valid ID is provided', () => {
  // Test implementation
});

// Bad
test('user test', () => {
  // Test implementation
});
```

### 2. One Assertion Per Test (When Possible)

```javascript
// Good - focused tests
test('should return user name', () => {
  const user = getUser(1);
  expect(user.name).toBe('John');
});

test('should return user age', () => {
  const user = getUser(1);
  expect(user.age).toBe(30);
});

// Sometimes multiple assertions are needed
test('should return valid user object', () => {
  const user = getUser(1);
  expect(user).toHaveProperty('name');
  expect(user).toHaveProperty('age');
  expect(user.name).toBe('John');
});
```

### 3. Use Appropriate Matchers

```javascript
// Good - use specific matchers
expect(user).toHaveProperty('name', 'John');
expect(array).toContain('item');
expect(string).toMatch(/pattern/);

// Avoid - generic matchers
expect(user.name === 'John').toBe(true);
expect(array.includes('item')).toBe(true);
```

### 4. Test Edge Cases

```javascript
test('should handle empty input', () => {
  expect(processInput('')).toBe('');
});

test('should handle null input', () => {
  expect(processInput(null)).toBe('');
});

test('should handle undefined input', () => {
  expect(processInput(undefined)).toBe('');
});
```

## Complete Example

```javascript
// userService.js
export class UserService {
  constructor() {
    this.users = [
      { id: 1, name: 'John', age: 30, email: 'john@example.com' },
      { id: 2, name: 'Jane', age: 25, email: 'jane@example.com' },
    ];
  }

  getUser(id) {
    return this.users.find(user => user.id === id);
  }

  createUser(userData) {
    if (!userData.name || !userData.email) {
      throw new Error('Name and email are required');
    }
    
    const newUser = {
      id: this.users.length + 1,
      ...userData,
    };
    
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id, updates) {
    const user = this.getUser(id);
    if (!user) {
      throw new Error('User not found');
    }
    
    Object.assign(user, updates);
    return user;
  }

  deleteUser(id) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    
    this.users.splice(index, 1);
    return true;
  }
}

// userService.test.js
import { UserService } from './userService';

describe('UserService', () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
  });

  describe('getUser', () => {
    test('should return user when valid ID is provided', () => {
      const user = userService.getUser(1);
      
      expect(user).toBeDefined();
      expect(user).toHaveProperty('id', 1);
      expect(user).toHaveProperty('name', 'John');
      expect(user).toHaveProperty('email', 'john@example.com');
    });

    test('should return undefined when user not found', () => {
      const user = userService.getUser(999);
      expect(user).toBeUndefined();
    });
  });

  describe('createUser', () => {
    test('should create user with valid data', () => {
      const userData = { name: 'Bob', email: 'bob@example.com' };
      const newUser = userService.createUser(userData);
      
      expect(newUser).toHaveProperty('id');
      expect(newUser).toHaveProperty('name', 'Bob');
      expect(newUser).toHaveProperty('email', 'bob@example.com');
      expect(newUser.id).toBeGreaterThan(0);
    });

    test('should throw error when name is missing', () => {
      const userData = { email: 'bob@example.com' };
      
      expect(() => userService.createUser(userData)).toThrow('Name and email are required');
    });

    test('should throw error when email is missing', () => {
      const userData = { name: 'Bob' };
      
      expect(() => userService.createUser(userData)).toThrow('Name and email are required');
    });
  });

  describe('updateUser', () => {
    test('should update user with valid data', () => {
      const updates = { name: 'John Updated', age: 31 };
      const updatedUser = userService.updateUser(1, updates);
      
      expect(updatedUser).toHaveProperty('name', 'John Updated');
      expect(updatedUser).toHaveProperty('age', 31);
      expect(updatedUser).toHaveProperty('email', 'john@example.com'); // unchanged
    });

    test('should throw error when user not found', () => {
      const updates = { name: 'Updated' };
      
      expect(() => userService.updateUser(999, updates)).toThrow('User not found');
    });
  });

  describe('deleteUser', () => {
    test('should delete user when valid ID is provided', () => {
      const result = userService.deleteUser(1);
      
      expect(result).toBe(true);
      expect(userService.getUser(1)).toBeUndefined();
    });

    test('should throw error when user not found', () => {
      expect(() => userService.deleteUser(999)).toThrow('User not found');
    });
  });
});
```
