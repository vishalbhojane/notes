# Camera App Example

A React Native app that demonstrates camera integration, image capture, and gallery access.

## Implementation

```jsx
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const CameraApp = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(false);

  // Request camera permission for Android
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera access to take photos',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setCameraPermission(true);
          return true;
        } else {
          Alert.alert('Permission denied', 'Camera permission is required');
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // iOS handles permissions differently
  };

  // Take photo with camera
  const takePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    const options = {
      mediaType: 'photo',
      quality: 0.8,
      saveToPhotos: true,
      includeBase64: false,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera error:', response.error);
        Alert.alert('Error', 'Failed to take photo');
      } else if (response.assets && response.assets[0]) {
        setSelectedImage(response.assets[0]);
      }
    });
  };

  // Pick image from gallery
  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      selectionLimit: 1,
      includeBase64: false,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled gallery');
      } else if (response.error) {
        console.log('Gallery error:', response.error);
        Alert.alert('Error', 'Failed to pick image');
      } else if (response.assets && response.assets[0]) {
        setSelectedImage(response.assets[0]);
      }
    });
  };

  // Clear selected image
  const clearImage = () => {
    setSelectedImage(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Camera App</Text>
      
      {selectedImage ? (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: selectedImage.uri }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.imageInfo}>
            <Text style={styles.imageText}>
              File: {selectedImage.fileName || 'Unknown'}
            </Text>
            <Text style={styles.imageText}>
              Size: {Math.round(selectedImage.fileSize / 1024)} KB
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>No image selected</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick from Gallery</Text>
        </TouchableOpacity>
        
        {selectedImage && (
          <TouchableOpacity 
            style={[styles.button, styles.clearButton]} 
            onPress={clearImage}
          >
            <Text style={styles.buttonText}>Clear Image</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  imageContainer: {
    flex: 1,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  imageInfo: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  imageText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
  },
  buttonContainer: {
    gap: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CameraApp;
```

## Setup Requirements

### Install Dependencies
```bash
npm install react-native-image-picker
npm install react-native-permissions
```

### iOS Setup (ios/Podfile)
```ruby
target 'YourApp' do
  # ... other pods
  pod 'RNImagePicker', :path => '../node_modules/react-native-image-picker'
end
```

### Android Setup (android/app/src/main/AndroidManifest.xml)
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

## Key Features

1. **Camera Integration**: Uses `react-native-image-picker` for camera access
2. **Permission Handling**: Properly requests camera permissions on Android
3. **Gallery Access**: Allows picking images from device gallery
4. **Image Display**: Shows selected image with file information
5. **Error Handling**: Handles permission denials and camera errors
6. **Platform Compatibility**: Works on both iOS and Android

## Best Practices

1. **Permission Management**: Always check and request permissions before accessing camera
2. **Error Handling**: Provide user feedback for errors and permission denials
3. **Image Optimization**: Use appropriate quality settings for different use cases
4. **Memory Management**: Clear images when not needed to free up memory
5. **User Experience**: Provide clear feedback and intuitive UI controls 