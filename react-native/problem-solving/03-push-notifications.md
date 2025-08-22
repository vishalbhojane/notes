# Push Notifications Example

A React Native app that demonstrates push notification setup, handling, and management for both iOS and Android.

## Implementation

```jsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

const PushNotificationApp = () => {
  const [fcmToken, setFcmToken] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  // Configure push notifications
  useEffect(() => {
    configurePushNotifications();
    requestUserPermission();
    setupMessageHandlers();
  }, []);

  const configurePushNotifications = () => {
    // Configure notification channel for Android
    PushNotification.createChannel(
      {
        channelId: 'default-channel',
        channelName: 'Default Channel',
        channelDescription: 'Default notification channel',
        playSound: true,
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`Channel created: ${created}`)
    );

    // Configure notification actions
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        
        // Add notification to list
        const newNotification = {
          id: Date.now(),
          title: notification.title || 'Notification',
          message: notification.message || notification.body || '',
          timestamp: new Date().toLocaleString(),
          data: notification.data || {},
        };
        
        setNotifications(prev => [newNotification, ...prev]);
        
        // Required for iOS
        notification.finish(PushNotification.FetchResult.NoData);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });
  };

  const requestUserPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      setIsPermissionGranted(enabled);

      if (enabled) {
        console.log('Authorization status:', authStatus);
        getFCMToken();
      } else {
        Alert.alert('Permission denied', 'Push notifications are disabled');
      }
    } catch (error) {
      console.log('Permission request error:', error);
    }
  };

  const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      setFcmToken(token);
      console.log('FCM Token:', token);
    } catch (error) {
      console.log('Error getting FCM token:', error);
    }
  };

  const setupMessageHandlers = () => {
    // Handle background messages
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Background message received:', remoteMessage);
      
      // Show local notification for background messages
      PushNotification.localNotification({
        channelId: 'default-channel',
        title: remoteMessage.notification?.title || 'New Message',
        message: remoteMessage.notification?.body || 'You have a new message',
        data: remoteMessage.data,
      });
    });

    // Handle foreground messages
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('Foreground message received:', remoteMessage);
      
      // Show local notification for foreground messages
      PushNotification.localNotification({
        channelId: 'default-channel',
        title: remoteMessage.notification?.title || 'New Message',
        message: remoteMessage.notification?.body || 'You have a new message',
        data: remoteMessage.data,
      });
    });

    return unsubscribe;
  };

  // Send local notification
  const sendLocalNotification = () => {
    PushNotification.localNotification({
      channelId: 'default-channel',
      title: 'Local Notification',
      message: 'This is a local notification sent from the app',
      playSound: true,
      soundName: 'default',
      importance: 'high',
      priority: 'high',
      vibrate: true,
      vibration: 300,
      data: { type: 'local', timestamp: Date.now() },
    });
  };

  // Send scheduled notification
  const sendScheduledNotification = () => {
    PushNotification.localNotificationSchedule({
      channelId: 'default-channel',
      title: 'Scheduled Notification',
      message: 'This notification was scheduled 5 seconds ago',
      date: new Date(Date.now() + 5 * 1000), // 5 seconds from now
      allowWhileIdle: true,
      repeatType: 'day',
      data: { type: 'scheduled', timestamp: Date.now() },
    });
    
    Alert.alert('Scheduled', 'Notification scheduled for 5 seconds from now');
  };

  // Cancel all notifications
  const cancelAllNotifications = () => {
    PushNotification.cancelAllLocalNotifications();
    Alert.alert('Cancelled', 'All notifications have been cancelled');
  };

  // Clear notification list
  const clearNotifications = () => {
    setNotifications([]);
  };

  // Get notification count
  const getNotificationCount = () => {
    PushNotification.getScheduledLocalNotifications((notifications) => {
      console.log('Scheduled notifications:', notifications);
      Alert.alert('Scheduled Count', `${notifications.length} notifications scheduled`);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Push Notifications</Text>
      
      {/* Permission Status */}
      <View style={styles.statusContainer}>
        <Text style={styles.sectionTitle}>Permission Status</Text>
        <Text style={styles.statusText}>
          Permission: {isPermissionGranted ? 'Granted' : 'Denied'}
        </Text>
        {fcmToken && (
          <Text style={styles.tokenText} numberOfLines={3}>
            FCM Token: {fcmToken}
          </Text>
        )}
      </View>

      {/* Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={sendLocalNotification}
        >
          <Text style={styles.buttonText}>Send Local Notification</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={sendScheduledNotification}
        >
          <Text style={styles.buttonText}>Schedule Notification (5s)</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={getNotificationCount}
        >
          <Text style={styles.buttonText}>Get Scheduled Count</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.clearButton]} 
          onPress={cancelAllNotifications}
        >
          <Text style={styles.buttonText}>Cancel All Notifications</Text>
        </TouchableOpacity>
      </View>

      {/* Notification History */}
      <View style={styles.historyContainer}>
        <View style={styles.historyHeader}>
          <Text style={styles.sectionTitle}>Notification History</Text>
          <TouchableOpacity onPress={clearNotifications}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.historyScroll}>
          {notifications.length === 0 ? (
            <Text style={styles.emptyText}>No notifications yet</Text>
          ) : (
            notifications.map((notification) => (
              <View key={notification.id} style={styles.notificationItem}>
                <Text style={styles.notificationTitle}>
                  {notification.title}
                </Text>
                <Text style={styles.notificationMessage}>
                  {notification.message}
                </Text>
                <Text style={styles.notificationTime}>
                  {notification.timestamp}
                </Text>
              </View>
            ))
          )}
        </ScrollView>
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
    marginBottom: 20,
    color: '#333',
  },
  statusContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  statusText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  tokenText: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'monospace',
  },
  controlsContainer: {
    gap: 10,
    marginBottom: 20,
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
  historyContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  clearText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  historyScroll: {
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 20,
  },
  notificationItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
});

export default PushNotificationApp;
```

## Setup Requirements

### Install Dependencies
```bash
npm install react-native-push-notification
npm install @react-native-firebase/app
npm install @react-native-firebase/messaging
npm install @react-native-async-storage/async-storage
```

### iOS Setup

#### Podfile (ios/Podfile)
```ruby
target 'YourApp' do
  # ... other pods
  pod 'RNCPushNotificationIOS', :path => '../node_modules/react-native-push-notification'
end
```

#### AppDelegate.m (ios/YourApp/AppDelegate.m)
```objc
#import <UserNotifications/UserNotifications.h>
#import <RNCPushNotificationIOS.h>

// Add to didFinishLaunchingWithOptions
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // ... existing code
  
  // Define UNUserNotificationCenter
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = self;
  
  return YES;
}

// Required for the register event.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

// Required for the notification event. You must call the completion handler after handling the remote notification.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}

// Required for the registrationError event.
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
  [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
}

// Required for localNotification event
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void (^)(void))completionHandler
{
  [RNCPushNotificationIOS didReceiveNotificationResponse:response];
}

//Called when a notification is delivered to a foreground app.
-(void)userNotificationCenter:(UNUserNotificationCenter *)center
      willPresentNotification:(UNNotification *)notification
        withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
  completionHandler(UNNotificationPresentationOptionSound | UNNotificationPresentationOptionBadge | UNNotificationPresentationOptionAlert);
}
```

### Android Setup

#### AndroidManifest.xml (android/app/src/main/AndroidManifest.xml)
```xml
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED"/>
<uses-permission android:name="android.permission.WAKE_LOCK" />

<application>
  <!-- ... other components -->
  
  <meta-data
    android:name="com.dieam.reactnativepushnotification.notification_channel_name"
    android:value="Default Channel"/>
  <meta-data
    android:name="com.dieam.reactnativepushnotification.notification_channel_description"
    android:value="Default notification channel"/>
  <meta-data
    android:name="com.dieam.reactnativepushnotification.notification_color"
    android:resource="@color/white"/>
</application>
```

#### MainApplication.java (android/app/src/main/java/com/yourapp/MainApplication.java)
```java
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;

// Add to packages list
@Override
protected List<ReactPackage> getPackages() {
  return Arrays.<ReactPackage>asList(
    new MainReactPackage(),
    new ReactNativePushNotificationPackage() // Add this line
  );
}
```

## Key Features

1. **Local Notifications**: Send immediate notifications from the app
2. **Scheduled Notifications**: Schedule notifications for future delivery
3. **Firebase Cloud Messaging**: Handle remote push notifications
4. **Notification History**: Track and display received notifications
5. **Permission Management**: Handle notification permissions properly
6. **Background Handling**: Process notifications when app is in background
7. **Notification Actions**: Cancel and manage scheduled notifications

## Best Practices

1. **Permission Handling**: Always request notification permissions
2. **Channel Management**: Create appropriate notification channels for Android
3. **Background Processing**: Handle background messages efficiently
4. **User Experience**: Provide clear feedback for notification actions
5. **Error Handling**: Handle notification errors gracefully
6. **Memory Management**: Limit notification history to prevent memory issues 