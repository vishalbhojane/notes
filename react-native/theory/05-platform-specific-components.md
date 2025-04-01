## Platform module

The Platform module detects the platform the app is running on.

Usage:

```jsx
import {Platform} from 'react-native';

if (Platform.OS === 'ios') {
  // iOS specific code
} else if (Platform.OS === 'android') {
  // Android specific code
}

// Platform.select method
const componentStyles = Platform.select({
  ios: {backgroundColor: 'red'},
  android: {backgroundColor: 'blue'},
});
```

## Platform-specific file extensions

React Native can use platform-specific file extensions to load different files based on the platform.

Example:

- MyComponent.ios.js
- MyComponent.android.js

React Native will automatically pick the correct file based on the platform.

## StatusBar

The StatusBar component controls the app status bar.

Usage:

```jsx
import {StatusBar} from 'react-native';

<StatusBar barStyle="light-content" backgroundColor="#6a51ae" />;
```

Key props:

- barStyle: 'default', 'light-content', 'dark-content'
- backgroundColor (Android only)
- hidden: true/false

## Modal

The Modal component is a way to present content above an enclosing view.

Usage:

```jsx
import {Modal} from 'react-native';

<Modal
  visible={this.state.modalVisible}
  animationType="slide"
  onRequestClose={() => {
    this.setModalVisible(!this.state.modalVisible);
  }}>
  {/* Modal content */}
</Modal>;
```

Key props:

- visible: controls the visibility of the modal
- animationType: 'none', 'slide', 'fade'
- onRequestClose: called when the user taps the hardware back button on Android
