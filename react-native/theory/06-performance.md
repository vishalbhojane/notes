Performance optimization in React Native is crucial for creating smooth, responsive mobile applications.

## Core Performance Concepts

### Bridge Communication
```jsx
// Minimize bridge calls
// ❌ Bad - Multiple bridge calls
const [name, setName] = useState('');
const [age, setAge] = useState(0);
const [email, setEmail] = useState('');

// ✅ Good - Single bridge call
const [user, setUser] = useState({
  name: '',
  age: 0,
  email: ''
});
```

### Render Optimization
```jsx
import React, { memo, useCallback, useMemo } from 'react';

// Memoize expensive components
const ExpensiveComponent = memo(({ data, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{data.title}</Text>
    </TouchableOpacity>
  );
});

// Memoize expensive calculations
const MyComponent = ({ items }) => {
  const expensiveValue = useMemo(() => {
    return items.reduce((acc, item) => acc + item.value, 0);
  }, [items]);

  const handlePress = useCallback((id) => {
    console.log('Pressed:', id);
  }, []);

  return (
    <View>
      <Text>Total: {expensiveValue}</Text>
      {items.map(item => (
        <ExpensiveComponent 
          key={item.id} 
          data={item} 
          onPress={() => handlePress(item.id)} 
        />
      ))}
    </View>
  );
};
```

## List Performance

### FlatList Optimization
```jsx
import { FlatList } from 'react-native';

const OptimizedList = ({ data }) => {
  const renderItem = useCallback(({ item }) => (
    <ListItem item={item} />
  ), []);

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  const getItemLayout = useCallback((data, index) => ({
    length: 80, // Fixed height
    offset: 80 * index,
    index,
  }), []);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
      initialNumToRender={10}
      updateCellsBatchingPeriod={50}
    />
  );
};
```

### VirtualizedList Best Practices
```jsx
// Use SectionList for grouped data
const GroupedList = ({ sections }) => {
  const renderSectionHeader = useCallback(({ section }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
    </View>
  ), []);

  return (
    <SectionList
      sections={sections}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      keyExtractor={keyExtractor}
      stickySectionHeadersEnabled={false}
    />
  );
};
```

## Image Optimization

### Image Loading
```jsx
import { Image } from 'react-native';

const OptimizedImage = ({ uri, style }) => {
  return (
    <Image
      source={{ uri }}
      style={style}
      resizeMode="cover"
      fadeDuration={300}
      loadingIndicatorSource={{ uri: 'placeholder.png' }}
      onLoadStart={() => console.log('Loading started')}
      onLoad={() => console.log('Loading finished')}
      onError={(error) => console.log('Loading error:', error)}
    />
  );
};
```

### Image Caching
```jsx
import FastImage from 'react-native-fast-image';

const CachedImage = ({ uri, style }) => {
  return (
    <FastImage
      source={{ uri }}
      style={style}
      resizeMode={FastImage.resizeMode.cover}
      priority={FastImage.priority.normal}
    />
  );
};
```

## Memory Management

### Component Cleanup
```jsx
import { useEffect, useRef } from 'react';

const ComponentWithCleanup = () => {
  const timeoutRef = useRef(null);
  const subscriptionRef = useRef(null);

  useEffect(() => {
    // Setup
    timeoutRef.current = setTimeout(() => {
      console.log('Timeout executed');
    }, 5000);

    subscriptionRef.current = someAPI.subscribe((data) => {
      console.log('Data received:', data);
    });

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
    };
  }, []);
};
```

### Event Listener Management
```jsx
import { useEffect } from 'react';
import { AppState, Dimensions } from 'react-native';

const AppStateListener = () => {
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      console.log('App state changed to:', nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription?.remove();
    };
  }, []);
};
```

## Bundle Size Optimization

### Code Splitting
```jsx
import { lazy, Suspense } from 'react';

// Lazy load components
const LazyComponent = lazy(() => import('./LazyComponent'));

const App = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LazyComponent />
    </Suspense>
  );
};
```

### Tree Shaking
```jsx
// Import only what you need
// ❌ Bad
import * as ReactNative from 'react-native';

// ✅ Good
import { View, Text, TouchableOpacity } from 'react-native';
```

## Animation Performance

### Use Native Driver
```jsx
import { Animated } from 'react-native';

const AnimatedComponent = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <Text>Fade in animation</Text>
    </Animated.View>
  );
};
```

### Layout Animation
```jsx
import { LayoutAnimation, UIManager } from 'react-native';

// Enable layout animations on Android
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const LayoutAnimatedComponent = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={{ height: expanded ? 200 : 100 }}>
      <TouchableOpacity onPress={toggleExpanded}>
        <Text>Toggle</Text>
      </TouchableOpacity>
    </View>
  );
};
```

## Performance Monitoring

### FPS Monitoring
```jsx
import { PerformanceObserver } from 'react-native-performance';

const PerformanceMonitor = () => {
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        console.log('Performance entry:', entry);
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

## Best Practices

1. **Avoid inline styles and functions**
```jsx
// ❌ Bad
<View style={{ backgroundColor: 'red', padding: 10 }}>
  <TouchableOpacity onPress={() => handlePress(id)}>

// ✅ Good
<View style={styles.container}>
  <TouchableOpacity onPress={handlePress}>
```

2. **Use appropriate list components**
```jsx
// For small lists (< 10 items)
<ScrollView>
  {items.map(item => <Item key={item.id} />)}
</ScrollView>

// For large lists
<FlatList data={items} renderItem={renderItem} />
```

3. **Optimize re-renders**
```jsx
// Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  return <ComplexUI data={data} />;
});

// Use useCallback for event handlers
const handlePress = useCallback((id) => {
  // Handle press
}, []);
``` 