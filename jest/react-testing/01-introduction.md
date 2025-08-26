# React Testing with Jest

Testing React components requires understanding component behavior, user interactions, and rendering patterns.

## What is React Testing?

- Testing React components in isolation
- Verifying component behavior and user interactions
- Testing component rendering and state changes
- Ensuring components work correctly with props and events

## Testing Libraries

### React Testing Library

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

### Enzyme (Legacy)

```bash
npm install --save-dev enzyme enzyme-adapter-react-16
```

## Setup

### Basic Setup

```javascript
// src/setupTests.js
import '@testing-library/jest-dom';

// Global test setup
beforeEach(() => {
  // Setup code
});

afterEach(() => {
  // Cleanup code
});
```

### Jest Configuration

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
```

## Basic Component Testing

### Simple Component Test

```jsx
// Button.jsx
import React from 'react';

function Button({ onClick, children, disabled = false }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;

// Button.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  test('renders button with text', () => {
    render(<Button>Click me</Button>);
    
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

## React Testing Library Queries

### Query Types

```jsx
import { render, screen } from '@testing-library/react';

// getBy* - throws error if not found
const button = screen.getByRole('button');
const input = screen.getByLabelText('Username');
const heading = screen.getByText('Welcome');

// queryBy* - returns null if not found
const missingButton = screen.queryByRole('button');

// findBy* - async, waits for element
const asyncElement = await screen.findByText('Loaded content');
```

### Common Queries

```jsx
// By role (recommended)
screen.getByRole('button');
screen.getByRole('textbox');
screen.getByRole('heading');

// By text
screen.getByText('Submit');
screen.getByText(/submit/i); // case insensitive

// By label
screen.getByLabelText('Username');
screen.getByLabelText(/username/i);

// By placeholder
screen.getByPlaceholderText('Enter your name');

// By test ID (use sparingly)
screen.getByTestId('submit-button');
```

## User Interactions

### Fire Events

```jsx
import { render, screen, fireEvent } from '@testing-library/react';

test('user interactions', () => {
  render(<MyComponent />);
  
  // Click
  fireEvent.click(screen.getByRole('button'));
  
  // Type
  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: 'new value' },
  });
  
  // Submit form
  fireEvent.submit(screen.getByRole('form'));
  
  // Focus/Blur
  fireEvent.focus(screen.getByRole('textbox'));
  fireEvent.blur(screen.getByRole('textbox'));
});
```

### User Event (Recommended)

```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('user interactions with user-event', async () => {
  const user = userEvent.setup();
  render(<MyComponent />);
  
  // Click
  await user.click(screen.getByRole('button'));
  
  // Type
  await user.type(screen.getByRole('textbox'), 'new value');
  
  // Clear and type
  await user.clear(screen.getByRole('textbox'));
  await user.type(screen.getByRole('textbox'), 'cleared value');
  
  // Tab navigation
  await user.tab();
});
```

## Testing Component State

### State Changes

```jsx
// Counter.jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <span data-testid="count">{count}</span>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

// Counter.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

describe('Counter', () => {
  test('increments count when increment button is clicked', () => {
    render(<Counter />);
    
    const countElement = screen.getByTestId('count');
    const incrementButton = screen.getByText('Increment');
    
    expect(countElement).toHaveTextContent('0');
    
    fireEvent.click(incrementButton);
    expect(countElement).toHaveTextContent('1');
    
    fireEvent.click(incrementButton);
    expect(countElement).toHaveTextContent('2');
  });

  test('decrements count when decrement button is clicked', () => {
    render(<Counter />);
    
    const countElement = screen.getByTestId('count');
    const decrementButton = screen.getByText('Decrement');
    
    expect(countElement).toHaveTextContent('0');
    
    fireEvent.click(decrementButton);
    expect(countElement).toHaveTextContent('-1');
  });
});
```

## Testing Props

### Props Testing

```jsx
// UserCard.jsx
import React from 'react';

function UserCard({ user, onEdit, onDelete }) {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={() => onEdit(user.id)}>Edit</button>
      <button onClick={() => onDelete(user.id)}>Delete</button>
    </div>
  );
}

// UserCard.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserCard from './UserCard';

describe('UserCard', () => {
  const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
  };

  test('renders user information', () => {
    render(<UserCard user={mockUser} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  test('calls onEdit when edit button is clicked', () => {
    const onEdit = jest.fn();
    render(<UserCard user={mockUser} onEdit={onEdit} />);
    
    fireEvent.click(screen.getByText('Edit'));
    
    expect(onEdit).toHaveBeenCalledWith(1);
  });

  test('calls onDelete when delete button is clicked', () => {
    const onDelete = jest.fn();
    render(<UserCard user={mockUser} onDelete={onDelete} />);
    
    fireEvent.click(screen.getByText('Delete'));
    
    expect(onDelete).toHaveBeenCalledWith(1);
  });
});
```

## Testing Forms

### Form Testing

```jsx
// LoginForm.jsx
import React, { useState } from 'react';

function LoginForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

// LoginForm.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  test('submits form with user data', () => {
    const onSubmit = jest.fn();
    render(<LoginForm onSubmit={onSubmit} />);
    
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const submitButton = screen.getByRole('button', { name: 'Login' });
    
    fireEvent.change(emailInput, {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(passwordInput, {
      target: { value: 'password123' },
    });
    fireEvent.click(submitButton);
    
    expect(onSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  test('validates required fields', () => {
    const onSubmit = jest.fn();
    render(<LoginForm onSubmit={onSubmit} />);
    
    const submitButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(submitButton);
    
    // Form should not submit without required fields
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
```

## Testing Async Operations

### Async Component Testing

```jsx
// UserList.jsx
import React, { useState, useEffect } from 'react';

function UserList({ fetchUsers }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [fetchUsers]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// UserList.test.jsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UserList from './UserList';

describe('UserList', () => {
  test('renders loading state initially', () => {
    const fetchUsers = jest.fn().mockResolvedValue([]);
    render(<UserList fetchUsers={fetchUsers} />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders users when data is loaded', async () => {
    const mockUsers = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
    ];
    const fetchUsers = jest.fn().mockResolvedValue(mockUsers);
    
    render(<UserList fetchUsers={fetchUsers} />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  test('renders error when fetch fails', async () => {
    const fetchUsers = jest.fn().mockRejectedValue(new Error('Failed to fetch'));
    render(<UserList fetchUsers={fetchUsers} />);
    
    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
    });
  });
});
```

## Testing Custom Hooks

### Hook Testing

```jsx
// useCounter.js
import { useState } from 'react';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}

// useCounter.test.js
import { renderHook, act } from '@testing-library/react';
import useCounter from './useCounter';

describe('useCounter', () => {
  test('should initialize with default value', () => {
    const { result } = renderHook(() => useCounter());
    
    expect(result.current.count).toBe(0);
  });

  test('should initialize with custom value', () => {
    const { result } = renderHook(() => useCounter(10));
    
    expect(result.current.count).toBe(10);
  });

  test('should increment count', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });

  test('should decrement count', () => {
    const { result } = renderHook(() => useCounter(5));
    
    act(() => {
      result.current.decrement();
    });
    
    expect(result.current.count).toBe(4);
  });

  test('should reset count', () => {
    const { result } = renderHook(() => useCounter(10));
    
    act(() => {
      result.current.increment();
      result.current.increment();
    });
    
    expect(result.current.count).toBe(12);
    
    act(() => {
      result.current.reset();
    });
    
    expect(result.current.count).toBe(10);
  });
});
```

## Testing Context

### Context Testing

```jsx
// ThemeContext.jsx
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

// ThemeToggle.jsx
import React from 'react';
import { useTheme } from './ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}

// ThemeToggle.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from './ThemeContext';
import ThemeToggle from './ThemeToggle';

describe('ThemeToggle', () => {
  test('renders current theme', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    
    expect(screen.getByText('Current theme: light')).toBeInTheDocument();
  });

  test('toggles theme when clicked', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    expect(screen.getByText('Current theme: dark')).toBeInTheDocument();
    
    fireEvent.click(button);
    expect(screen.getByText('Current theme: light')).toBeInTheDocument();
  });
});
```

## Best Practices

### 1. Test User Behavior, Not Implementation

```jsx
// Good - test what user sees and does
test('shows error message when form is invalid', () => {
  render(<LoginForm />);
  fireEvent.click(screen.getByText('Login'));
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
});

// Bad - test implementation details
test('sets error state to true', () => {
  // Implementation details
});
```

### 2. Use Semantic Queries

```jsx
// Good - use semantic queries
screen.getByRole('button', { name: 'Submit' });
screen.getByLabelText('Email address');

// Bad - use test IDs for everything
screen.getByTestId('submit-button');
screen.getByTestId('email-input');
```

### 3. Test Accessibility

```jsx
test('has proper accessibility attributes', () => {
  render(<Button aria-label="Submit form">Submit</Button>);
  
  const button = screen.getByRole('button', { name: 'Submit form' });
  expect(button).toBeInTheDocument();
});
```

### 4. Clean Up After Tests

```jsx
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});
```

## Complete Example

```jsx
// TodoApp.jsx
import React, { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo App</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// TodoApp.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoApp from './TodoApp';

describe('TodoApp', () => {
  test('adds a new todo', () => {
    render(<TodoApp />);
    
    const input = screen.getByPlaceholderText('Add a new todo');
    const addButton = screen.getByRole('button', { name: 'Add' });
    
    fireEvent.change(input, { target: { value: 'Buy groceries' } });
    fireEvent.click(addButton);
    
    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  test('toggles todo completion', () => {
    render(<TodoApp />);
    
    // Add a todo first
    const input = screen.getByPlaceholderText('Add a new todo');
    const addButton = screen.getByRole('button', { name: 'Add' });
    
    fireEvent.change(input, { target: { value: 'Buy groceries' } });
    fireEvent.click(addButton);
    
    // Toggle completion
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(checkbox).toBeChecked();
  });

  test('deletes a todo', () => {
    render(<TodoApp />);
    
    // Add a todo first
    const input = screen.getByPlaceholderText('Add a new todo');
    const addButton = screen.getByRole('button', { name: 'Add' });
    
    fireEvent.change(input, { target: { value: 'Buy groceries' } });
    fireEvent.click(addButton);
    
    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    
    // Delete the todo
    const deleteButton = screen.getByRole('button', { name: 'Delete' });
    fireEvent.click(deleteButton);
    
    expect(screen.queryByText('Buy groceries')).not.toBeInTheDocument();
  });

  test('does not add empty todos', () => {
    render(<TodoApp />);
    
    const addButton = screen.getByRole('button', { name: 'Add' });
    fireEvent.click(addButton);
    
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});
```
