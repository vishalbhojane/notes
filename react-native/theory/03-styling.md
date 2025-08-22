React Native uses JavaScript objects for styling instead of CSS, with a subset of CSS properties adapted for mobile platforms.

## StyleSheet API

```jsx
import { StyleSheet, View, Text } from 'react-native';

function StyledComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
```

## Flexbox Layout

React Native uses Flexbox for layout, with some differences from web CSS:

### Flex Direction
```jsx
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
});
```

### Flex Properties
```jsx
const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes all available space
  },
  item: {
    flex: 0.5, // Takes half the available space
  },
});
```

## Platform-Specific Styling

```jsx
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    shadowColor: Platform.OS === 'ios' ? '#000' : undefined,
    shadowOffset: Platform.OS === 'ios' ? { width: 0, height: 2 } : undefined,
    shadowOpacity: Platform.OS === 'ios' ? 0.25 : undefined,
    elevation: Platform.OS === 'android' ? 5 : undefined,
  },
});
```

## Best Practices

1. **Use StyleSheet.create() for performance**
2. **Organize styles logically**
3. **Use constants for repeated values** 