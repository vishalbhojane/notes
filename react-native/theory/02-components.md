React Native components are the building blocks of mobile applications, providing native UI elements that map to platform-specific components.

## Core Components

### Basic UI Components

```jsx
import { View, Text, Image, ScrollView } from 'react-native';

function BasicComponents() {
  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <Text>Hello React Native!</Text>
        <Image 
          source={{ uri: 'https://example.com/image.jpg' }}
          style={{ width: 200, height: 200 }}
        />
      </View>
    </ScrollView>
  );
}
```

### Platform-Specific Components

```jsx
import { Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native';

function PlatformButton({ onPress, children }) {
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback onPress={onPress}>
        <View style={{ backgroundColor: 'blue', padding: 10 }}>
          <Text style={{ color: 'white' }}>{children}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
  
  return (
    <TouchableOpacity onPress={onPress} style={{ backgroundColor: 'blue', padding: 10 }}>
      <Text style={{ color: 'white' }}>{children}</Text>
    </TouchableOpacity>
  );
}
```

## Key Differences from Web Components

| Web Component | React Native Component | Purpose |
|---------------|----------------------|---------|
| `<div>` | `<View>` | Container element |
| `<p>`, `<span>` | `<Text>` | Text display |
| `<img>` | `<Image>` | Image display |
| `<button>` | `<TouchableOpacity>` | Touch interactions |
| `<input>` | `<TextInput>` | Text input |
| `<ul>`, `<li>` | `<FlatList>` | Lists |

## Component Categories

### Layout Components
- `View`: Container component (like div)
- `ScrollView`: Scrollable container
- `SafeAreaView`: Respects device safe areas

### Text Components
- `Text`: Display text (required for all text)
- `TextInput`: User input field

### Interactive Components
- `TouchableOpacity`: Touchable with opacity feedback
- `TouchableHighlight`: Touchable with highlight feedback
- `TouchableWithoutFeedback`: Touchable without visual feedback
- `Pressable`: Modern touchable component (React Native 0.63+)

### List Components
- `FlatList`: Optimized list for large datasets
- `SectionList`: List with sections and headers

### Image Components
- `Image`: Display images from network or local assets
- `ImageBackground`: Image with content overlay

## Best Practices

1. **Always wrap text in Text components**
```jsx
// ❌ Wrong
<View>Hello World</View>

// ✅ Correct
<View><Text>Hello World</Text></View>
```

2. **Use appropriate touchable components**
```jsx
// For buttons
<TouchableOpacity onPress={handlePress}>
  <Text>Press Me</Text>
</TouchableOpacity>

// For list items
<Pressable onPress={handlePress}>
  <Text>List Item</Text>
</Pressable>
```

3. **Handle platform differences**
```jsx
import { Platform } from 'react-native';

const styles = {
  container: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: Platform.OS === 'ios' ? '#f0f0f0' : '#ffffff'
  }
};
``` 