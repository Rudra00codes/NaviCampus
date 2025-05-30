import * as Location from 'expo-location';

// Location permission status types
export type LocationPermissionStatus = 
  | 'granted' 
  | 'denied' 
  | 'undetermined';

// User location data type
export interface UserLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
  heading?: number; // Direction user is moving (degrees)
  speed?: number; // Speed in m/s
  timestamp?: number;
}

// Default coordinates for Amity University Punjab campus
// These will be used as fallback or initial values
export const DEFAULT_CAMPUS_LOCATION = {
  latitude: 30.6631, // Amity University Punjab, Sector 82 A, IT City Rd
  longitude: 76.7278, // Sahibzada Ajit Singh Nagar, Punjab 140306
  latitudeDelta: 0.005,
  longitudeDelta: 0.005,
};

/**
 * Request location permissions from the user
 */
export const requestLocationPermissions = async (): Promise<LocationPermissionStatus> => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status as LocationPermissionStatus;
  } catch (error) {
    console.error('Error requesting location permissions:', error);
    return 'denied';
  }
};

/**
 * Check the current location permission status
 */
export const getLocationPermissionStatus = async (): Promise<LocationPermissionStatus> => {
  try {
    const { status } = await Location.getForegroundPermissionsAsync();
    return status as LocationPermissionStatus;
  } catch (error) {
    console.error('Error checking location permissions:', error);
    return 'undetermined';
  }
};

/**
 * Get the current user location
 * Returns null if location services are disabled or permission is denied
 */
export const getCurrentLocation = async (): Promise<UserLocation | null> => {
  try {
    const status = await getLocationPermissionStatus();
    
    if (status !== 'granted') {
      return null;
    }
    
    // Get current location with high accuracy
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      accuracy: location.coords.accuracy,
      heading: location.coords.heading,
      speed: location.coords.speed,
      timestamp: location.timestamp,
    };
  } catch (error) {
    console.error('Error getting current location:', error);
    return null;
  }
};

/**
 * Start watching the user's location with live updates
 * @param callback Function to call with updated location data
 * @returns A function to stop watching location
 */
export const watchUserLocation = (
  callback: (location: UserLocation) => void,
  errorCallback?: (error: any) => void
): (() => void) => {
  let watchSubscription: Location.LocationSubscription | null = null;
  
  const startWatching = async () => {
    try {
      const status = await getLocationPermissionStatus();
      
      if (status !== 'granted') {
        if (errorCallback) {
          errorCallback(new Error('Location permission not granted'));
        }
        return;
      }
      
      // Subscribe to location updates
      watchSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000, // Update every 1 second
          distanceInterval: 1, // Update every 1 meter
        },
        (location) => {
          callback({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            accuracy: location.coords.accuracy,
            heading: location.coords.heading,
            speed: location.coords.speed,
            timestamp: location.timestamp,
          });
        }
      );
    } catch (error) {
      console.error('Error watching location:', error);
      if (errorCallback) {
        errorCallback(error);
      }
    }
  };
  
  // Start watching immediately
  startWatching();
  
  // Return a function to stop watching
  return () => {
    if (watchSubscription) {
      watchSubscription.remove();
    }
  };
};

/**
 * Calculate distance between two coordinates in meters
 */
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  // Earth radius in meters
  const R = 6371e3;
  
  // Convert degrees to radians
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;
  
  // Haversine formula
  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  // Distance in meters
  return R * c;
};
