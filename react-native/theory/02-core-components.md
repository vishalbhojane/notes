React Native provides a set of built-in core components that are essential for building mobile applications. These components are the building blocks of your app's user interface.

## 1. View

The `View` component is the most fundamental building block in React Native.
It's similar to a `<div>` in web development.

- Used as a container for other components
- Supports flexbox layout, style, some touch handling, and accessibility controls

```jsx
import {View} from 'react-native';

const MyComponent = () => <View>{/* Child components go here */}</View>;
```

## 2. Text

The `Text` component is used to display text. All text in a React Native app must be inside a `Text` component.

- Supports nesting, styling, and touch handling

```jsx
import {Text} from 'react-native';

const MyComponent = () => <Text>Hello, React Native!</Text>;
```

## 3. Image

The `Image` component is used to display images in your app.

- Supports network images, static resources, and images from local disk
- Provides various resizing modes

Example:

```jsx
import {Image} from 'react-native';

const MyComponent = () => (
  <Image source={{uri: 'https://example.com/image.jpg'}} />
);
```

## 4. TextInput

`TextInput` is a core component for inputting text into the app using a keyboard.

- Supports various keyboard types and return key types
- Can be customized with many props like `placeholder`, `secureTextEntry`, etc.

```jsx
import {useState} from 'react';
import {TextInput} from 'react-native';

const MyComponent = () => {
  const [text, setText] = useState('');

  return (
    <TextInput onChangeText={setText} value={text} placeholder="Type here..." />
  );
};
```

## 5. ScrollView

`ScrollView` is a generic scrolling container that can contain multiple components and views.

- Can scroll both vertically and horizontally
- Not optimized for long lists of items (use FlatList instead)

```jsx
import {ScrollView, Text} from 'react-native';

const MyComponent = () => (
  <ScrollView>
    <Text>
      This is a long text that will cause the ScrollView to be scrollable.
    </Text>
  </ScrollView>
);
```

## 6. FlatList

`FlatList` is a high-performance component for rendering long lists of data.

- Renders only the items currently visible on the screen
- Supports pull to refresh, header components, and more

```jsx
import {FlatList, Text} from 'react-native';

const DATA = [
  {id: '1', title: 'First Item'},
  {id: '2', title: 'Second Item'},
  {id: '3', title: 'Third Item'},
];

const MyComponent = () => (
  <FlatList
    data={DATA}
    renderItem={({item}) => <Text>{item.title}</Text>}
    keyExtractor={(item) => item.id}
  />
);
```

## 7. TouchableOpacity and other Touchable components

Touchable components are wrappers for making views respond properly to touches.

- `TouchableOpacity`: Fades the opacity when pressed
- Others include `TouchableHighlight`, `TouchableWithoutFeedback`, and `Pressable`

Example:

```jsx
import {TouchableOpacity, Text} from 'react-native';

const MyComponent = () => (
  <TouchableOpacity onPress={() => alert('Pressed!')}>
    <Text>Press Me</Text>
  </TouchableOpacity>
);
```

## 8. SafeAreaView

`SafeAreaView` is used to render content within the safe area boundaries of a device.

- Automatically adds padding to reflect the portion of the view that is not covered by navigation bars, tab bars, toolbars, and other ancestor views
- Particularly useful on iOS devices with notches

```jsx
import {SafeAreaView, View, Text} from 'react-native';

const MyComponent = () => (
  <SafeAreaView>
    <View>
      <Text>This content is safe to display.</Text>
    </View>
  </SafeAreaView>
);
```
