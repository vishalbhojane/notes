# Location Tracker Example

A React Native app that demonstrates GPS location tracking, geolocation services, and location-based features.

## Implementation

```jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  PermissionsAndroid,
  Platform,
  ScrollView,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const LocationTracker = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationHistory, setLocationHistory] = useState([]);
  const [isTracking, setIsTracking] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);
  const watchIdRef = useRef(null);

  // Request location permission for Android
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'App needs location access to track your position',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setLocationPermission(true);
          return true;
        } else {
          Alert.alert('Permission denied', 'Location permission is required');
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // iOS handles permissions differently
  };

  // Get current location once
  const getCurrentLocation = () => {
    const hasPermission = requestLocationPermission();
    if (!hasPermission) return;

    Geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date(position.timestamp).toLocaleString(),
          speed: position.coords.speed,
          altitude: position.coords.altitude,
        };
        
        setCurrentLocation(location);
        setLocationHistory(prev => [location, ...prev.slice(0, 9)]); // Keep last 10 locations
      },
      (error) => {
        console.log('Location error:', error);
        Alert.alert('Error', 'Failed to get location');
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  };

  // Start location tracking
  const startTracking = () => {
    const hasPermission = requestLocationPermission();
    if (!hasPermission) return;

    setIsTracking(true);
    
    watchIdRef.current = Geolocation.watchPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date(position.timestamp).toLocaleString(),
          speed: position.coords.speed,
          altitude: position.coords.altitude,
        };
        
        setCurrentLocation(location);
        setLocationHistory(prev => [location, ...prev.slice(0, 19)]); // Keep last 20 locations
      },
      (error) => {
        console.log('Watch position error:', error);
        Alert.alert('Error', 'Failed to track location');
        stopTracking();
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10, // Update every 10 meters
        interval: 5000, // Update every 5 seconds
        fastestInterval: 2000, // Fastest update every 2 seconds
      }
    );
  };

  // Stop location tracking
  const stopTracking = () => {
    if (watchIdRef.current) {
      Geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsTracking(false);
  };

  // Clear location history
  const clearHistory = () => {
    setLocationHistory([]);
  };

  // Calculate distance between two points
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
  };

  // Calculate total distance traveled
  const getTotalDistance = () => {
    if (locationHistory.length < 2) return 0;
    
    let totalDistance = 0;
    for (let i = 1; i < locationHistory.length; i++) {
      const prev = locationHistory[i];
      const curr = locationHistory[i - 1];
      totalDistance += calculateDistance(
        prev.latitude, prev.longitude,
        curr.latitude, curr.longitude
      );
    }
    return totalDistance.toFixed(2);
  };

  useEffect(() => {
    // Request permission on component mount
    requestLocationPermission();
    
    // Cleanup on unmount
    return () => {
      if (watchIdRef.current) {
        Geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location Tracker</Text>
      
      {/* Current Location Display */}
      {currentLocation && (
        <View style={styles.currentLocationContainer}>
          <Text style={styles.sectionTitle}>Current Location</Text>
          <Text style={styles.locationText}>
            Latitude: {currentLocation.latitude.toFixed(6)}
          </Text>
          <Text style={styles.locationText}>
            Longitude: {currentLocation.longitude.toFixed(6)}
          </Text>
          <Text style={styles.locationText}>
            Accuracy: {currentLocation.accuracy?.toFixed(1)}m
          </Text>
          <Text style={styles.locationText}>
            Speed: {currentLocation.speed ? `${(currentLocation.speed * 3.6).toFixed(1)} km/h` : 'N/A'}
          </Text>
          <Text style={styles.locationText}>
            Time: {currentLocation.timestamp}
          </Text>
        </View>
      )}

      {/* Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={getCurrentLocation}
        >
          <Text style={styles.buttonText}>Get Current Location</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, isTracking ? styles.stopButton : styles.startButton]} 
          onPress={isTracking ? stopTracking : startTracking}
        >
          <Text style={styles.buttonText}>
            {isTracking ? 'Stop Tracking' : 'Start Tracking'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.clearButton]} 
          onPress={clearHistory}
        >
          <Text style={styles.buttonText}>Clear History</Text>
        </TouchableOpacity>
      </View>

      {/* Statistics */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Statistics</Text>
        <Text style={styles.statsText}>
          Total Distance: {getTotalDistance()} km
        </Text>
        <Text style={styles.statsText}>
          Location Points: {locationHistory.length}
        </Text>
      </View>

      {/* Location History */}
      {locationHistory.length > 0 && (
        <View style={styles.historyContainer}>
          <Text style={styles.sectionTitle}>Location History</Text>
          <ScrollView style={styles.historyScroll}>
            {locationHistory.map((location, index) => (
              <View key={index} style={styles.historyItem}>
                <Text style={styles.historyText}>
                  {index + 1}. {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                </Text>
                <Text style={styles.historySubtext}>
                  {location.timestamp} • Accuracy: {location.accuracy?.toFixed(1)}m
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
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
  currentLocationContainer: {
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
  locationText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#34C759',
  },
  stopButton: {
    backgroundColor: '#FF3B30',
  },
  clearButton: {
    backgroundColor: '#8E8E93',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  statsText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  historyContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
  },
  historyScroll: {
    flex: 1,
  },
  historyItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  historyText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  historySubtext: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
});

export default LocationTracker;
```

## Setup Requirements

### Install Dependencies
```bash
npm install @react-native-community/geolocation
```

### iOS Setup (ios/Podfile)
```ruby
target 'YourApp' do
  # ... other pods
  pod 'react-native-geolocation', :path => '../node_modules/@react-native-community/geolocation'
end
```

### Android Setup (android/app/src/main/AndroidManifest.xml)
```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

## Key Features

1. **Current Location**: Get one-time location with high accuracy
2. **Location Tracking**: Continuous location monitoring with configurable intervals
3. **Location History**: Store and display recent location points
4. **Distance Calculation**: Calculate total distance traveled
5. **Permission Handling**: Proper location permission management
6. **Error Handling**: Handle location errors and permission denials
7. **Statistics**: Display tracking statistics and metrics

## Best Practices

1. **Battery Optimization**: Use appropriate accuracy and update intervals
2. **Permission Management**: Always check and request location permissions
3. **Error Handling**: Provide user feedback for location errors
4. **Memory Management**: Limit location history to prevent memory issues
5. **Privacy**: Be transparent about location data usage
6. **Performance**: Use efficient distance calculation algorithms 