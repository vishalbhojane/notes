# Jest Testing Strategies

Comprehensive testing strategies and patterns for different types of applications and scenarios.

## Testing Pyramid

The testing pyramid represents the ideal distribution of tests:

```
    /\
   /  \     E2E Tests (Few)
  /____\    
 /      \   Integration Tests (Some)
/________\  Unit Tests (Many)
```

### Unit Tests (70-80%)

- Test individual functions and components
- Fast and focused
- High coverage
- Easy to maintain

### Integration Tests (15-20%)

- Test interactions between components
- Test API integrations
- Moderate speed and complexity

### End-to-End Tests (5-10%)

- Test complete user workflows
- Slow but comprehensive
- Catch real-world issues

## Unit Testing Strategies

### Function Testing

```javascript
// utils.js
export function formatCurrency(amount, currency = 'USD') {
  if (typeof amount !== 'number') {
    throw new Error('Amount must be a number');
  }
  
  if (amount < 0) {
    throw new Error('Amount cannot be negative');
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function calculateDiscount(price, discountPercent) {
  if (discountPercent < 0 || discountPercent > 100) {
    throw new Error('Discount must be between 0 and 100');
  }
  
  return price * (1 - discountPercent / 100);
}

// utils.test.js
import { formatCurrency, calculateDiscount } from './utils';

describe('formatCurrency', () => {
  test('formats positive numbers correctly', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
    expect(formatCurrency(0)).toBe('$0.00');
    expect(formatCurrency(999999.99)).toBe('$999,999.99');
  });

  test('handles different currencies', () => {
    expect(formatCurrency(100, 'EUR')).toBe('€100.00');
    expect(formatCurrency(100, 'GBP')).toBe('£100.00');
  });

  test('throws error for invalid input', () => {
    expect(() => formatCurrency('invalid')).toThrow('Amount must be a number');
    expect(() => formatCurrency(-100)).toThrow('Amount cannot be negative');
  });
});

describe('calculateDiscount', () => {
  test('calculates discount correctly', () => {
    expect(calculateDiscount(100, 10)).toBe(90);
    expect(calculateDiscount(200, 25)).toBe(150);
    expect(calculateDiscount(100, 0)).toBe(100);
    expect(calculateDiscount(100, 100)).toBe(0);
  });

  test('throws error for invalid discount', () => {
    expect(() => calculateDiscount(100, -10)).toThrow('Discount must be between 0 and 100');
    expect(() => calculateDiscount(100, 150)).toThrow('Discount must be between 0 and 100');
  });
});
```

### Class Testing

```javascript
// Calculator.js
export class Calculator {
  constructor() {
    this.history = [];
  }

  add(a, b) {
    const result = a + b;
    this.history.push({ operation: 'add', a, b, result });
    return result;
  }

  subtract(a, b) {
    const result = a - b;
    this.history.push({ operation: 'subtract', a, b, result });
    return result;
  }

  multiply(a, b) {
    const result = a * b;
    this.history.push({ operation: 'multiply', a, b, result });
    return result;
  }

  divide(a, b) {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    const result = a / b;
    this.history.push({ operation: 'divide', a, b, result });
    return result;
  }

  getHistory() {
    return [...this.history];
  }

  clearHistory() {
    this.history = [];
  }
}

// Calculator.test.js
import { Calculator } from './Calculator';

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('basic operations', () => {
    test('adds two numbers', () => {
      expect(calculator.add(2, 3)).toBe(5);
    });

    test('subtracts two numbers', () => {
      expect(calculator.subtract(5, 3)).toBe(2);
    });

    test('multiplies two numbers', () => {
      expect(calculator.multiply(4, 3)).toBe(12);
    });

    test('divides two numbers', () => {
      expect(calculator.divide(10, 2)).toBe(5);
    });
  });

  describe('error handling', () => {
    test('throws error for division by zero', () => {
      expect(() => calculator.divide(10, 0)).toThrow('Division by zero');
    });
  });

  describe('history tracking', () => {
    test('tracks operation history', () => {
      calculator.add(2, 3);
      calculator.subtract(5, 1);

      const history = calculator.getHistory();
      expect(history).toHaveLength(2);
      expect(history[0]).toEqual({ operation: 'add', a: 2, b: 3, result: 5 });
      expect(history[1]).toEqual({ operation: 'subtract', a: 5, b: 1, result: 4 });
    });

    test('clears history', () => {
      calculator.add(2, 3);
      calculator.clearHistory();
      expect(calculator.getHistory()).toHaveLength(0);
    });
  });
});
```

## Integration Testing Strategies

### API Integration Testing

```javascript
// userService.js
import { api } from './api';

export class UserService {
  async getUsers() {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  }

  async createUser(userData) {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async updateUser(id, userData) {
    try {
      const response = await api.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  async deleteUser(id) {
    try {
      await api.delete(`/users/${id}`);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  }
}

// userService.integration.test.js
import { UserService } from './userService';
import { api } from './api';

// Mock the API module
jest.mock('./api');

describe('UserService Integration', () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
    jest.clearAllMocks();
  });

  describe('getUsers', () => {
    test('fetches users successfully', async () => {
      const mockUsers = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
      ];

      api.get.mockResolvedValue({ data: mockUsers });

      const result = await userService.getUsers();

      expect(api.get).toHaveBeenCalledWith('/users');
      expect(result).toEqual(mockUsers);
    });

    test('handles API errors', async () => {
      const error = new Error('Network error');
      api.get.mockRejectedValue(error);

      await expect(userService.getUsers()).rejects.toThrow('Failed to fetch users: Network error');
    });
  });

  describe('createUser', () => {
    test('creates user successfully', async () => {
      const userData = { name: 'New User', email: 'new@example.com' };
      const createdUser = { id: 3, ...userData };

      api.post.mockResolvedValue({ data: createdUser });

      const result = await userService.createUser(userData);

      expect(api.post).toHaveBeenCalledWith('/users', userData);
      expect(result).toEqual(createdUser);
    });
  });

  describe('updateUser', () => {
    test('updates user successfully', async () => {
      const userId = 1;
      const updateData = { name: 'Updated Name' };
      const updatedUser = { id: userId, ...updateData };

      api.put.mockResolvedValue({ data: updatedUser });

      const result = await userService.updateUser(userId, updateData);

      expect(api.put).toHaveBeenCalledWith(`/users/${userId}`, updateData);
      expect(result).toEqual(updatedUser);
    });
  });

  describe('deleteUser', () => {
    test('deletes user successfully', async () => {
      const userId = 1;
      api.delete.mockResolvedValue({});

      const result = await userService.deleteUser(userId);

      expect(api.delete).toHaveBeenCalledWith(`/users/${userId}`);
      expect(result).toBe(true);
    });
  });
});
```

### Component Integration Testing

```javascript
// UserList.jsx
import React, { useState, useEffect } from 'react';
import { UserService } from './userService';
import UserCard from './UserCard';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const userService = new UserService();
      const data = await userService.getUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const userService = new UserService();
      await userService.deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Users</h2>
      {users.map(user => (
        <UserCard
          key={user.id}
          user={user}
          onDelete={handleDeleteUser}
        />
      ))}
    </div>
  );
}

// UserList.integration.test.jsx
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import UserList from './UserList';
import { UserService } from './userService';

// Mock the UserService
jest.mock('./userService');

describe('UserList Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('loads and displays users', async () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ];

    // Mock the UserService constructor and methods
    const mockGetUsers = jest.fn().mockResolvedValue(mockUsers);
    const mockDeleteUser = jest.fn().mockResolvedValue(true);

    UserService.mockImplementation(() => ({
      getUsers: mockGetUsers,
      deleteUser: mockDeleteUser,
    }));

    render(<UserList />);

    // Check loading state
    expect(screen.getByText('Loading users...')).toBeInTheDocument();

    // Wait for users to load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    expect(mockGetUsers).toHaveBeenCalledTimes(1);
  });

  test('handles loading error', async () => {
    const mockGetUsers = jest.fn().mockRejectedValue(new Error('Failed to fetch'));
    
    UserService.mockImplementation(() => ({
      getUsers: mockGetUsers,
    }));

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
    });
  });

  test('deletes user successfully', async () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
    ];

    const mockGetUsers = jest.fn().mockResolvedValue(mockUsers);
    const mockDeleteUser = jest.fn().mockResolvedValue(true);

    UserService.mockImplementation(() => ({
      getUsers: mockGetUsers,
      deleteUser: mockDeleteUser,
    }));

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockDeleteUser).toHaveBeenCalledWith(1);
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });
  });
});
```

## End-to-End Testing Strategies

### User Workflow Testing

```javascript
// e2e/userWorkflow.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

// Mock external dependencies
jest.mock('../services/api');
jest.mock('../services/auth');

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('User Workflow E2E', () => {
  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
  });

  test('complete user registration and login flow', async () => {
    // Mock API responses
    const { api } = require('../services/api');
    const { auth } = require('../services/auth');

    api.register.mockResolvedValue({ success: true, userId: 123 });
    api.login.mockResolvedValue({ success: true, token: 'mock-token' });
    auth.setToken.mockImplementation(() => {});

    renderWithRouter(<App />);

    // Navigate to registration
    fireEvent.click(screen.getByText(/sign up/i));

    // Fill registration form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'password123' },
    });

    // Submit registration
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    // Wait for registration to complete
    await waitFor(() => {
      expect(api.register).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });

    // Should redirect to login
    await waitFor(() => {
      expect(screen.getByText(/login/i)).toBeInTheDocument();
    });

    // Fill login form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    // Submit login
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Wait for login to complete
    await waitFor(() => {
      expect(api.login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });

    // Should be logged in and see dashboard
    await waitFor(() => {
      expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
      expect(auth.setToken).toHaveBeenCalledWith('mock-token');
    });
  });

  test('user can create and manage todos', async () => {
    const { api } = require('../services/api');
    const { auth } = require('../services/auth');

    // Mock authentication
    auth.isAuthenticated.mockReturnValue(true);
    auth.getToken.mockReturnValue('mock-token');

    // Mock API responses
    api.getTodos.mockResolvedValue([]);
    api.createTodo.mockResolvedValue({ id: 1, text: 'New Todo', completed: false });
    api.updateTodo.mockResolvedValue({ id: 1, text: 'New Todo', completed: true });
    api.deleteTodo.mockResolvedValue({ success: true });

    renderWithRouter(<App />);

    // Should see empty todo list
    await waitFor(() => {
      expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
    });

    // Add new todo
    const input = screen.getByPlaceholderText(/add a new todo/i);
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    // Should create todo
    await waitFor(() => {
      expect(api.createTodo).toHaveBeenCalledWith({ text: 'New Todo' });
    });

    // Should display new todo
    await waitFor(() => {
      expect(screen.getByText('New Todo')).toBeInTheDocument();
    });

    // Toggle todo completion
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(api.updateTodo).toHaveBeenCalledWith(1, { completed: true });
    });

    // Delete todo
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(api.deleteTodo).toHaveBeenCalledWith(1);
    });

    // Should remove todo from list
    await waitFor(() => {
      expect(screen.queryByText('New Todo')).not.toBeInTheDocument();
    });
  });
});
```

## Performance Testing Strategies

### Component Performance Testing

```javascript
// performance/ComponentPerformance.test.js
import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import ExpensiveComponent from '../ExpensiveComponent';

describe('Component Performance', () => {
  test('renders within acceptable time', () => {
    const startTime = performance.now();
    
    act(() => {
      render(<ExpensiveComponent data={largeDataset} />);
    });
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    // Should render within 100ms
    expect(renderTime).toBeLessThan(100);
  });

  test('handles large datasets efficiently', () => {
    const largeDataset = Array.from({ length: 10000 }, (_, i) => ({
      id: i,
      name: `Item ${i}`,
    }));

    const startTime = performance.now();
    
    act(() => {
      render(<ExpensiveComponent data={largeDataset} />);
    });
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    // Should handle 10k items within 500ms
    expect(renderTime).toBeLessThan(500);
  });
});
```

## Testing Best Practices

### 1. Test Organization

```javascript
// Organize tests by feature/component
describe('User Management', () => {
  describe('UserService', () => {
    // Unit tests for UserService
  });

  describe('UserList Component', () => {
    // Component tests for UserList
  });

  describe('User Workflows', () => {
    // Integration tests for user workflows
  });
});
```

### 2. Test Data Management

```javascript
// testData.js
export const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

export const createMockUser = (overrides = {}) => ({
  id: Math.random(),
  name: 'Test User',
  email: 'test@example.com',
  ...overrides,
});

// userService.test.js
import { mockUsers, createMockUser } from './testData';

describe('UserService', () => {
  test('creates user with custom data', () => {
    const customUser = createMockUser({ name: 'Custom User' });
    // Test implementation
  });
});
```

### 3. Test Isolation

```javascript
describe('UserService', () => {
  let userService;
  let mockApi;

  beforeEach(() => {
    // Fresh instance for each test
    mockApi = {
      get: jest.fn(),
      post: jest.fn(),
    };
    userService = new UserService(mockApi);
  });

  afterEach(() => {
    // Clean up after each test
    jest.clearAllMocks();
  });

  // Tests...
});
```

### 4. Error Testing

```javascript
describe('Error Handling', () => {
  test('handles network errors gracefully', async () => {
    const networkError = new Error('Network error');
    mockApi.get.mockRejectedValue(networkError);

    await expect(userService.getUsers()).rejects.toThrow('Network error');
  });

  test('handles validation errors', () => {
    expect(() => userService.createUser({})).toThrow('Name is required');
  });

  test('handles server errors', async () => {
    const serverError = { status: 500, message: 'Internal server error' };
    mockApi.post.mockRejectedValue(serverError);

    await expect(userService.createUser({ name: 'Test' }))
      .rejects.toThrow('Internal server error');
  });
});
```

## Coverage Strategies

### Coverage Configuration

```javascript
// jest.config.js
module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.js',
    '!src/setupTests.js',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coverageReporters: ['text', 'lcov', 'html'],
};
```

### Coverage Analysis

```javascript
// Analyze coverage gaps
describe('Edge Cases', () => {
  test('handles empty input', () => {
    expect(processInput('')).toBe('');
  });

  test('handles null input', () => {
    expect(processInput(null)).toBe('');
  });

  test('handles undefined input', () => {
    expect(processInput(undefined)).toBe('');
  });

  test('handles very large input', () => {
    const largeInput = 'a'.repeat(10000);
    expect(processInput(largeInput)).toHaveLength(10000);
  });
});
```

## Continuous Integration Testing

### CI Configuration

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test -- --coverage --watchAll=false
      
    - name: Upload coverage
      uses: codecov/codecov-action@v1
```

This comprehensive testing strategy ensures:

1. **High Coverage**: Unit tests cover individual functions and components
2. **Integration Testing**: Tests interactions between components and services
3. **End-to-End Testing**: Tests complete user workflows
4. **Performance Testing**: Ensures components meet performance requirements
5. **Error Handling**: Comprehensive error scenario testing
6. **Continuous Integration**: Automated testing in CI/CD pipeline
