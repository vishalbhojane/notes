React Native provides access to native device capabilities through various APIs, allowing you to interact with device features like camera, location, storage, and more.

## Core Platform APIs

### Platform Detection
```jsx
import { Platform, Dimensions, StatusBar } from 'react-native';

// Platform detection
const isIOS = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';

// Platform-specific values
const platformValue = Platform.select({
  ios: 'iOS Value',
  android: 'Android Value',
  default: 'Default Value',
});

// Device dimensions
const { width, height } = Dimensions.get('window');
const screenHeight = Dimensions.get('screen').height;
```

### Status Bar
```jsx
import { StatusBar } from 'react-native';

function App() {
  return (
    <View>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#ffffff"
        hidden={false}
        animated={true}
      />
    </View>
  );
}
```

## Device Information

### Device Info
```jsx
import DeviceInfo from 'react-native-device-info';

// Device information
const deviceId = DeviceInfo.getDeviceId();
const brand = DeviceInfo.getBrand();
const model = DeviceInfo.getModel();
const systemVersion = DeviceInfo.getSystemVersion();
const appVersion = DeviceInfo.getVersion();
const buildNumber = DeviceInfo.getBuildNumber();
```

### Permissions
```jsx
import { PermissionsAndroid, Alert } from 'react-native';

// Request camera permission (Android)
const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'App needs camera access',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Camera permission granted');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};
```

## Storage APIs

### AsyncStorage
```jsx
import AsyncStorage from '@react-native-async-storage/async-storage';

// Store data
const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error storing data:', error);
  }
};

// Retrieve data
const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
};

// Remove data
const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing data:', error);
  }
};
```

### File System
```jsx
import RNFS from 'react-native-fs';

// Read file
const readFile = async (filePath) => {
  try {
    const content = await RNFS.readFile(filePath, 'utf8');
    return content;
  } catch (error) {
    console.error('Error reading file:', error);
  }
};

// Write file
const writeFile = async (filePath, content) => {
  try {
    await RNFS.writeFile(filePath, content, 'utf8');
  } catch (error) {
    console.error('Error writing file:', error);
  }
};

// Check if file exists
const fileExists = async (filePath) => {
  try {
    return await RNFS.exists(filePath);
  } catch (error) {
    console.error('Error checking file:', error);
    return false;
  }
};
```

## Network APIs

### Fetch API
```jsx
// Basic fetch
const fetchData = async () => {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Fetch with headers
const fetchWithAuth = async (url, token) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching with auth:', error);
  }
};
```

### Network State
```jsx
import NetInfo from '@react-native-community/netinfo';

// Check network state
const checkNetworkState = async () => {
  const state = await NetInfo.fetch();
  console.log('Connection type:', state.type);
  console.log('Is connected:', state.isConnected);
  console.log('Is internet reachable:', state.isInternetReachable);
};

// Listen to network changes
NetInfo.addEventListener(state => {
  console.log('Network state changed:', state);
});
```

## Device Features

### Camera
```jsx
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

// Take photo
const takePhoto = () => {
  const options = {
    mediaType: 'photo',
    quality: 0.8,
    saveToPhotos: true,
  };

  launchCamera(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled camera');
    } else if (response.error) {
      console.log('Camera error:', response.error);
    } else {
      console.log('Photo taken:', response.assets[0]);
    }
  });
};

// Pick from gallery
const pickImage = () => {
  const options = {
    mediaType: 'photo',
    quality: 0.8,
    selectionLimit: 1,
  };

  launchImageLibrary(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled gallery');
    } else if (response.error) {
      console.log('Gallery error:', response.error);
    } else {
      console.log('Image selected:', response.assets[0]);
    }
  });
};
```

### Location
```jsx
import Geolocation from '@react-native-community/geolocation';

// Get current position
const getCurrentPosition = () => {
  Geolocation.getCurrentPosition(
    (position) => {
      console.log('Current position:', position);
    },
    (error) => {
      console.log('Location error:', error);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
};

// Watch position
const watchPosition = () => {
  const watchId = Geolocation.watchPosition(
    (position) => {
      console.log('Position updated:', position);
    },
    (error) => {
      console.log('Watch position error:', error);
    },
    { enableHighAccuracy: true, distanceFilter: 10 }
  );

  // Stop watching
  return () => Geolocation.clearWatch(watchId);
};
```

## Best Practices

1. **Handle permissions properly**
```jsx
const checkAndRequestPermission = async (permission) => {
  const result = await PermissionsAndroid.request(permission);
  return result === PermissionsAndroid.RESULTS.GRANTED;
};
```

2. **Use platform-specific code**
```jsx
const getPlatformSpecificValue = () => {
  return Platform.select({
    ios: () => 'iOS specific logic',
    android: () => 'Android specific logic',
  })();
};
```

3. **Handle API errors gracefully**
```jsx
const safeApiCall = async (apiFunction) => {
  try {
    return await apiFunction();
  } catch (error) {
    console.error('API call failed:', error);
    // Handle error appropriately
    return null;
  }
};
``` 