Debugging React Native applications requires understanding both JavaScript and native platform debugging tools.

## Development Tools

### React Native Debugger
```bash
# Install React Native Debugger
npm install -g react-native-debugger

# Launch debugger
react-native-debugger
```

### Flipper (Facebook's Debugging Platform)
```bash
# Install Flipper
# Download from https://fbflipper.com/

# Enable Flipper in your app
# Add to android/app/src/main/java/com/yourapp/MainApplication.java
```

## Console Debugging

### Basic Logging
```jsx
import { Alert } from 'react-native';

// Console logging
console.log('Debug message');
console.warn('Warning message');
console.error('Error message');

// Alert for quick debugging
Alert.alert('Debug', 'This is a debug message');

// Debug with objects
const debugObject = { name: 'John', age: 30 };
console.log('User object:', JSON.stringify(debugObject, null, 2));
```

### Conditional Logging
```jsx
// Only log in development
if (__DEV__) {
  console.log('This only appears in development');
}

// Debug with environment check
const DEBUG = __DEV__;
DEBUG && console.log('Conditional debug message');
```

## Network Debugging

### Network Inspector
```jsx
// Enable network debugging
import { LogBox } from 'react-native';

// Ignore specific warnings
LogBox.ignoreLogs(['Warning: ...']);

// Monitor network requests
const debugFetch = async (url, options) => {
  console.log('Request:', { url, options });
  
  try {
    const response = await fetch(url, options);
    console.log('Response:', response);
    return response;
  } catch (error) {
    console.error('Network error:', error);
    throw error;
  }
};
```

### API Debugging
```jsx
// Debug API calls
const apiCall = async (endpoint, data) => {
  const startTime = Date.now();
  
  console.log(`API Call: ${endpoint}`, data);
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    const duration = Date.now() - startTime;
    
    console.log(`API Response (${duration}ms):`, result);
    return result;
  } catch (error) {
    console.error(`API Error (${Date.now() - startTime}ms):`, error);
    throw error;
  }
};
```

## Performance Debugging

### Performance Monitor
```jsx
import { PerformanceObserver } from 'react-native-performance';

const PerformanceDebugger = () => {
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        console.log('Performance:', entry);
      });
    });

    observer.observe({ entryTypes: ['measure'] });
    
    return () => observer.disconnect();
  }, []);
};
```

### Memory Usage
```jsx
import { Performance } from 'react-native-performance';

const checkMemoryUsage = () => {
  Performance.getMemoryInfo().then((memoryInfo) => {
    console.log('Memory usage:', memoryInfo);
  });
};
```

## Component Debugging

### Component State Debugging
```jsx
import { useDebugValue } from 'react';

const useDebugState = (state, label) => {
  useDebugValue(`${label}: ${JSON.stringify(state)}`);
  return state;
};

const MyComponent = () => {
  const [count, setCount] = useState(0);
  useDebugState(count, 'Count');
  
  return <Text>Count: {count}</Text>;
};
```

### Props Debugging
```jsx
const DebugComponent = React.memo(({ data, onPress }) => {
  console.log('DebugComponent rendered with:', { data, onPress });
  
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{JSON.stringify(data)}</Text>
    </TouchableOpacity>
  );
});
```

## Platform-Specific Debugging

### iOS Debugging
```jsx
// iOS specific debugging
import { Platform } from 'react-native';

if (Platform.OS === 'ios') {
  // iOS specific debug code
  console.log('Running on iOS');
  
  // Use Safari Web Inspector for iOS
  // 1. Open Safari
  // 2. Develop > Simulator > [Your App]
  // 3. Debug JavaScript
}
```

### Android Debugging
```jsx
// Android specific debugging
if (Platform.OS === 'android') {
  console.log('Running on Android');
  
  // Use Chrome DevTools for Android
  // 1. Open Chrome
  // 2. Navigate to chrome://inspect
  // 3. Find your app and click "inspect"
}
```

## Error Boundaries

### Custom Error Boundary
```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Log to crash reporting service
    // crashlytics().recordError(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorText}>
            {this.state.error?.toString()}
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}
```

## Debugging Tools

### React DevTools
```jsx
// Install React DevTools
npm install -g react-devtools

// Launch in separate terminal
react-devtools
```

### Flipper Plugins
```jsx
// Network plugin
import { NetworkPlugin } from 'flipper-plugin-network';

// Layout plugin
import { LayoutPlugin } from 'flipper-plugin-layout';

// Database plugin
import { DatabasePlugin } from 'flipper-plugin-database';
```

## Debugging Best Practices

### 1. Use Descriptive Log Messages
```jsx
// ❌ Bad
console.log('data', data);

// ✅ Good
console.log('User profile data received:', {
  userId: data.id,
  name: data.name,
  email: data.email
});
```

### 2. Debug Component Lifecycle
```jsx
const DebugComponent = ({ data }) => {
  console.log('DebugComponent: render', { data });
  
  useEffect(() => {
    console.log('DebugComponent: mounted');
    return () => console.log('DebugComponent: unmounted');
  }, []);
  
  useEffect(() => {
    console.log('DebugComponent: data changed', data);
  }, [data]);
  
  return <Text>{data}</Text>;
};
```

### 3. Debug Navigation
```jsx
const DebugNavigation = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('state', (e) => {
      console.log('Navigation state changed:', e.data);
    });

    return unsubscribe;
  }, [navigation]);
};
```

### 4. Debug Async Operations
```jsx
const debugAsyncOperation = async (operation, label) => {
  const startTime = Date.now();
  console.log(`${label}: Starting`);
  
  try {
    const result = await operation();
    const duration = Date.now() - startTime;
    console.log(`${label}: Completed (${duration}ms)`, result);
    return result;
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`${label}: Failed (${duration}ms)`, error);
    throw error;
  }
};
```

### 5. Environment-Specific Debugging
```jsx
const DEBUG_CONFIG = {
  development: {
    logLevel: 'verbose',
    showAlerts: true,
    enablePerformanceMonitoring: true,
  },
  production: {
    logLevel: 'error',
    showAlerts: false,
    enablePerformanceMonitoring: false,
  },
};

const debug = (level, message, data) => {
  const config = DEBUG_CONFIG[__DEV__ ? 'development' : 'production'];
  
  if (config.logLevel === 'verbose' || level === 'error') {
    console[level](message, data);
  }
};
``` 