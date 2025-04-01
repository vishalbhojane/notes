React Navigation is the most popular library for handling navigation in React Native applications.

## React Navigation Library

Installation:

```text
npm install @react-navigation/native
```

Additional dependencies:

```text
npm install react-native-screens react-native-safe-area-context
```

## Stack Navigator

Used for basic navigation between screens.

Installation:

```text
npm install @react-navigation/stack
```

```jsx
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}
```

## Tab Navigator

Used for navigation between tabs.

Installation:

```text
npm install @react-navigation/bottom-tabs
```

Basic usage:

```jsx
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
```

## Drawer Navigator

Used for side menu navigation.

Installation:

```text
npm install @react-navigation/drawer
```

Basic usage:

```jsx
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}
```

Key points:

- Wrap your app with NavigationContainer
- Use navigation prop to navigate between screens
- Can be nested for complex navigation structures
- Supports customization of headers, transitions, and more
