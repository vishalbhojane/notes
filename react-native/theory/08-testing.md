Testing React Native applications involves unit testing, integration testing, and end-to-end testing using various frameworks and tools.

## Testing Frameworks

### Jest (Unit Testing)
```jsx
// Component test example
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    const { getByText } = render(<MyComponent />);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('handles button press', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(<MyComponent onPress={mockOnPress} />);
    
    fireEvent.press(getByText('Press Me'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
```

### React Native Testing Library
```jsx
import { render, fireEvent, waitFor } from '@testing-library/react-native';

const AsyncComponent = () => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetchData().then(setData);
  }, []);
  
  return data ? <Text>{data.name}</Text> : <Text>Loading...</Text>;
};

describe('AsyncComponent', () => {
  it('shows loading initially', () => {
    const { getByText } = render(<AsyncComponent />);
    expect(getByText('Loading...')).toBeTruthy();
  });

  it('shows data after loading', async () => {
    const { getByText } = render(<AsyncComponent />);
    
    await waitFor(() => {
      expect(getByText('John Doe')).toBeTruthy();
    });
  });
});
```

## Component Testing

### Basic Component Test
```jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Counter from '../Counter';

describe('Counter', () => {
  it('increments count when button is pressed', () => {
    const { getByText, getByTestId } = render(<Counter />);
    
    const countText = getByTestId('count');
    const incrementButton = getByText('Increment');
    
    expect(countText.props.children).toBe(0);
    
    fireEvent.press(incrementButton);
    
    expect(countText.props.children).toBe(1);
  });

  it('decrements count when decrement button is pressed', () => {
    const { getByText, getByTestId } = render(<Counter />);
    
    const countText = getByTestId('count');
    const decrementButton = getByText('Decrement');
    
    fireEvent.press(decrementButton);
    
    expect(countText.props.children).toBe(-1);
  });
});
```

### Testing with Props
```jsx
const UserProfile = ({ user, onEdit }) => {
  return (
    <View>
      <Text testID="user-name">{user.name}</Text>
      <Text testID="user-email">{user.email}</Text>
      <TouchableOpacity testID="edit-button" onPress={onEdit}>
        <Text>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

describe('UserProfile', () => {
  const mockUser = {
    name: 'John Doe',
    email: 'john@example.com',
  };
  
  const mockOnEdit = jest.fn();

  it('displays user information', () => {
    const { getByTestId } = render(
      <UserProfile user={mockUser} onEdit={mockOnEdit} />
    );
    
    expect(getByTestId('user-name').props.children).toBe('John Doe');
    expect(getByTestId('user-email').props.children).toBe('john@example.com');
  });

  it('calls onEdit when edit button is pressed', () => {
    const { getByTestId } = render(
      <UserProfile user={mockUser} onEdit={mockOnEdit} />
    );
    
    fireEvent.press(getByTestId('edit-button'));
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });
});
```

## Hook Testing

### Custom Hook Test
```jsx
import { renderHook, act } from '@testing-library/react-hooks';
import { useCounter } from '../useCounter';

describe('useCounter', () => {
  it('initializes with default value', () => {
    const { result } = renderHook(() => useCounter());
    
    expect(result.current.count).toBe(0);
  });

  it('initializes with custom value', () => {
    const { result } = renderHook(() => useCounter(10));
    
    expect(result.current.count).toBe(10);
  });

  it('increments count', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });

  it('decrements count', () => {
    const { result } = renderHook(() => useCounter(5));
    
    act(() => {
      result.current.decrement();
    });
    
    expect(result.current.count).toBe(4);
  });
});
```

## API Testing

### Mock API Calls
```jsx
import { renderHook } from '@testing-library/react-hooks';
import { useUserData } from '../useUserData';

// Mock fetch
global.fetch = jest.fn();

describe('useUserData', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('fetches user data successfully', async () => {
    const mockUser = { id: 1, name: 'John Doe' };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    const { result, waitForNextUpdate } = renderHook(() => useUserData(1));

    await waitForNextUpdate();

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('handles API errors', async () => {
    fetch.mockRejectedValueOnce(new Error('API Error'));

    const { result, waitForNextUpdate } = renderHook(() => useUserData(1));

    await waitForNextUpdate();

    expect(result.current.user).toBe(null);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('API Error');
  });
});
```

## Navigation Testing

### Navigation Testing with React Navigation
```jsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { render, fireEvent } from '@testing-library/react-native';

const Stack = createStackNavigator();

const TestNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

describe('Navigation', () => {
  it('navigates to details screen', () => {
    const { getByText } = render(<TestNavigator />);
    
    fireEvent.press(getByText('Go to Details'));
    
    expect(getByText('Details Screen')).toBeTruthy();
  });
});
```

## E2E Testing

### Detox (End-to-End Testing)
```jsx
// e2e/example.e2e.js
describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show welcome screen', async () => {
    await expect(element(by.text('Welcome'))).toBeVisible();
  });

  it('should navigate to details screen', async () => {
    await element(by.text('Go to Details')).tap();
    await expect(element(by.text('Details Screen'))).toBeVisible();
  });

  it('should handle form input', async () => {
    await element(by.id('email-input')).typeText('test@example.com');
    await element(by.id('password-input')).typeText('password123');
    await element(by.text('Login')).tap();
    
    await expect(element(by.text('Welcome back!'))).toBeVisible();
  });
});
```

## Snapshot Testing

### Component Snapshot Test
```jsx
import React from 'react';
import renderer from 'react-test-renderer';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<MyComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with props correctly', () => {
    const tree = renderer
      .create(<MyComponent title="Test Title" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
```

## Test Configuration

### Jest Configuration (package.json)
```json
{
  "jest": {
    "preset": "react-native",
    "setupFilesAfterEnv": ["<rootDir>/jest.setup.js"],
    "transformIgnorePatterns": [
      "node_modules/(?!(react-native|@react-native|@react-navigation)/)"
    ],
    "moduleFileExtensions": ["ts", "tsx", "js", "jsx", "json", "node"],
    "testEnvironment": "node",
    "collectCoverageFrom": [
      "src/**/*.{js,jsx,ts,tsx}",
      "!src/**/*.d.ts"
    ]
  }
}
```

### Jest Setup (jest.setup.js)
```jsx
import 'react-native-gesture-handler/jestSetup';

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock react-native-vector-icons
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Global test utilities
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
```

## Testing Best Practices

### 1. Use Test IDs
```jsx
// Component
const MyComponent = () => (
  <View>
    <Text testID="title">Hello World</Text>
    <TouchableOpacity testID="button" onPress={handlePress}>
      <Text>Press Me</Text>
    </TouchableOpacity>
  </View>
);

// Test
it('renders title and button', () => {
  const { getByTestId } = render(<MyComponent />);
  expect(getByTestId('title')).toBeTruthy();
  expect(getByTestId('button')).toBeTruthy();
});
```

### 2. Test User Interactions
```jsx
it('handles user interactions', () => {
  const mockOnPress = jest.fn();
  const { getByTestId } = render(<MyComponent onPress={mockOnPress} />);
  
  fireEvent.press(getByTestId('button'));
  expect(mockOnPress).toHaveBeenCalled();
});
```

### 3. Test Async Operations
```jsx
it('handles async operations', async () => {
  const { getByText, findByText } = render(<AsyncComponent />);
  
  expect(getByText('Loading...')).toBeTruthy();
  
  const result = await findByText('Data loaded');
  expect(result).toBeTruthy();
});
```

### 4. Mock External Dependencies
```jsx
// Mock API calls
jest.mock('../api', () => ({
  fetchUser: jest.fn(),
  updateUser: jest.fn(),
}));

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  setOptions: jest.fn(),
};
```

### 5. Test Error States
```jsx
it('handles error states', async () => {
  fetch.mockRejectedValueOnce(new Error('Network error'));
  
  const { findByText } = render(<DataComponent />);
  
  const errorMessage = await findByText('Something went wrong');
  expect(errorMessage).toBeTruthy();
});
``` 