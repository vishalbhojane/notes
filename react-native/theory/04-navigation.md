React Native navigation is handled through libraries like React Navigation, which provides a complete navigation solution for mobile apps.

## React Navigation Setup

### Installation
```bash
npm install @react-navigation/native
npm install @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
```

### Basic Stack Navigator
```jsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

## Navigation Types

### Stack Navigator
```jsx
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Welcome' }}
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
```

### Tab Navigator
```jsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
```

### Drawer Navigator
```jsx
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}
```

## Navigation Actions

### Navigate to Screen
```jsx
function HomeScreen({ navigation }) {
  return (
    <View>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', { id: 123 })}
      />
    </View>
  );
}
```

### Pass Parameters
```jsx
// Sending parameters
navigation.navigate('Details', { 
  userId: 123, 
  userName: 'John' 
});

// Receiving parameters
function DetailsScreen({ route }) {
  const { userId, userName } = route.params;
  return <Text>User: {userName}</Text>;
}
```

### Go Back
```jsx
function DetailsScreen({ navigation }) {
  return (
    <View>
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}
```

## Navigation Options

### Screen Options
```jsx
<Stack.Screen
  name="Home"
  component={HomeScreen}
  options={{
    title: 'My App',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }}
/>
```

### Dynamic Options
```jsx
function HomeScreen({ navigation, route }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Info" onPress={() => alert('Info!')} />
      ),
    });
  }, [navigation]);
}
```

## Navigation Lifecycle

### Focus Events
```jsx
import { useFocusEffect } from '@react-navigation/native';

function ProfileScreen() {
  useFocusEffect(
    React.useCallback(() => {
      // Screen is focused
      console.log('Screen focused');
      
      return () => {
        // Screen is unfocused
        console.log('Screen unfocused');
      };
    }, [])
  );
}
```

### Navigation State
```jsx
function MyScreen({ navigation }) {
  const isFocused = navigation.isFocused();
  const canGoBack = navigation.canGoBack();
  
  return (
    <View>
      <Text>Focused: {isFocused ? 'Yes' : 'No'}</Text>
      <Text>Can go back: {canGoBack ? 'Yes' : 'No'}</Text>
    </View>
  );
}
```

## Best Practices

1. **Use TypeScript for type safety**
```jsx
type RootStackParamList = {
  Home: undefined;
  Details: { id: number; title: string };
};

const Stack = createStackNavigator<RootStackParamList>();
```

2. **Organize navigation structure**
```jsx
// Separate navigators for different app sections
function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Main" component={MainNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

3. **Handle deep linking**
```jsx
const linking = {
  prefixes: ['myapp://', 'https://myapp.com'],
  config: {
    screens: {
      Home: 'home',
      Details: 'details/:id',
    },
  },
};

<NavigationContainer linking={linking}>
  {/* ... */}
</NavigationContainer>
``` 