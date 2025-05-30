import { Location } from '../store/appStore';
import { calculateDistance } from './locationService';

export interface LocationWithDistance extends Location {
  distance: number;
}

/**
 * Get nearby locations sorted by distance from user's location
 * @param locations Array of campus locations
 * @param userLat User's latitude
 * @param userLng User's longitude
 * @param limit Maximum number of locations to return
 * @returns Array of locations with distances, sorted from closest to farthest
 */
export const getNearbyLocations = (
  locations: Location[],
  userLat: number | null,
  userLng: number | null,
  limit: number = 5
): LocationWithDistance[] => {
  // If user location is not available, return first 'limit' locations unsorted
  if (userLat === null || userLng === null) {
    return locations.slice(0, limit).map(loc => ({ 
      ...loc, 
      distance: 0 
    }));
  }
  
  // Calculate distance for each location from user's position
  const locationsWithDistance: LocationWithDistance[] = locations.map(location => {
    const distance = calculateDistance(
      userLat,
      userLng,
      location.coordinates.latitude,
      location.coordinates.longitude
    );
    
    return {
      ...location,
      distance
    };
  });
  
  // Sort by distance (closest first) and take the specified limit
  return locationsWithDistance
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
};

/**
 * Format distance for display
 * @param distance Distance in meters
 * @returns Formatted distance string (e.g., "120m" or "1.2km")
 */
export const formatDistance = (distance: number): string => {
  if (distance < 1000) {
    return `${Math.round(distance)}m`;
  } else {
    return `${(distance / 1000).toFixed(1)}km`;
  }
};
