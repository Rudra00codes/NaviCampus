import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Image,
  Linking
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getLocationById, getRoomAvailability } from '../services/campusDataService';
import { Location } from '../store/appStore';
import { useAppStore } from '../store/appStore';

export default function LocationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [location, setLocation] = useState<Location | null>(null);
  const [availability, setAvailability] = useState<{ available: boolean; nextAvailableTime?: string } | null>(null);
  const { bookmarks, addBookmark, removeBookmark } = useAppStore();
  
  const isBookmarked = bookmarks.some(bookmark => bookmark.locationId === id);

  useEffect(() => {
    if (id) {
      const locationData = getLocationById(id);
      if (locationData) {
        setLocation(locationData);
        // Get room availability
        const availabilityData = getRoomAvailability(id, new Date());
        setAvailability(availabilityData);
      }
    }
  }, [id]);

  const handleBookmark = () => {
    if (isBookmarked) {
      const bookmark = bookmarks.find(b => b.locationId === id);
      if (bookmark) {
        removeBookmark(bookmark.id);
      }
    } else {
      addBookmark(id);
    }
  };

  const openMapsApp = () => {
    if (location) {
      const { coordinates } = location;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.latitude},${coordinates.longitude}`;
      Linking.openURL(url);
    }
  };

  if (!location) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.bookmarkButton}
          onPress={handleBookmark}
        >
          <Ionicons 
            name={isBookmarked ? "bookmark" : "bookmark-outline"} 
            size={24} 
            color="#FFFFFF" 
          />
        </TouchableOpacity>
      </View>
      
      {/* Location Image/Map Placeholder */}
      <View style={styles.imagePlaceholder}>
        <Ionicons 
          name={
            location.type === 'classroom' ? 'school' :
            location.type === 'lab' ? 'flask' :
            location.type === 'office' ? 'business' :
            location.type === 'library' ? 'library' :
            location.type === 'cafeteria' ? 'restaurant' : 'location'
          } 
          size={64} 
          color="#FFFFFF" 
        />
      </View>
      
      <View style={styles.detailsContainer}>
        <View style={styles.basicInfo}>
          <Text style={styles.locationName}>{location.name}</Text>
          <View style={styles.locationDetails}>
            <Ionicons name="location" size={16} color="#4F46E5" />
            <Text style={styles.locationText}>
              {location.building ? `${location.building}, ` : ''}
              {location.floor ? `Floor ${location.floor}, ` : ''}
              {location.roomNumber ? `Room ${location.roomNumber}` : ''}
            </Text>
          </View>
        </View>
        
        {location.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{location.description}</Text>
          </View>
        )}
        
        {/* Availability Section */}
        {(['classroom', 'lab'].includes(location.type) && availability) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Current Availability</Text>
            <View style={[
              styles.availabilityBadge,
              { backgroundColor: availability.available ? '#DCFCE7' : '#FEE2E2' }
            ]}>
              <Ionicons 
                name={availability.available ? "checkmark-circle" : "time"} 
                size={18} 
                color={availability.available ? '#166534' : '#B91C1C'} 
              />
              <Text style={[
                styles.availabilityText,
                { color: availability.available ? '#166534' : '#B91C1C' }
              ]}>
                {availability.available 
                  ? 'Currently Available' 
                  : `Busy until ${availability.nextAvailableTime}`}
              </Text>
            </View>
          </View>
        )}
        
        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.primaryButton]}
            onPress={openMapsApp}
          >
            <Ionicons name="navigate" size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Directions</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
            <Ionicons name="share-social" size={20} color="#4F46E5" />
            <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>Share</Text>
          </TouchableOpacity>
        </View>
        
        {/* Additional Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Facilities</Text>
          <View style={styles.facilitiesContainer}>
            {location.type === 'classroom' && (
              <>
                <View style={styles.facilityItem}>
                  <Ionicons name="desktop" size={20} color="#4F46E5" />
                  <Text style={styles.facilityText}>Projector</Text>
                </View>
                <View style={styles.facilityItem}>
                  <Ionicons name="wifi" size={20} color="#4F46E5" />
                  <Text style={styles.facilityText}>Wi-Fi</Text>
                </View>
              </>
            )}
            {location.type === 'lab' && (
              <>
                <View style={styles.facilityItem}>
                  <Ionicons name="desktop" size={20} color="#4F46E5" />
                  <Text style={styles.facilityText}>Computers</Text>
                </View>
                <View style={styles.facilityItem}>
                  <Ionicons name="wifi" size={20} color="#4F46E5" />
                  <Text style={styles.facilityText}>Wi-Fi</Text>
                </View>
              </>
            )}
            {location.type === 'library' && (
              <>
                <View style={styles.facilityItem}>
                  <Ionicons name="wifi" size={20} color="#4F46E5" />
                  <Text style={styles.facilityText}>Wi-Fi</Text>
                </View>
                <View style={styles.facilityItem}>
                  <Ionicons name="print" size={20} color="#4F46E5" />
                  <Text style={styles.facilityText}>Printing</Text>
                </View>
              </>
            )}
            {location.type === 'cafeteria' && (
              <>
                <View style={styles.facilityItem}>
                  <Ionicons name="wifi" size={20} color="#4F46E5" />
                  <Text style={styles.facilityText}>Wi-Fi</Text>
                </View>
                <View style={styles.facilityItem}>
                  <Ionicons name="card" size={20} color="#4F46E5" />
                  <Text style={styles.facilityText}>Card Payment</Text>
                </View>
              </>
            )}
            <View style={styles.facilityItem}>
              <Ionicons name="accessibility" size={20} color="#4F46E5" />
              <Text style={styles.facilityText}>Wheelchair Access</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmarkButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    height: 250,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    padding: 24,
    paddingBottom: 40,
  },
  basicInfo: {
    marginBottom: 24,
  },
  locationName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  locationDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
  availabilityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  availabilityText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginRight: 12,
  },
  primaryButton: {
    backgroundColor: '#4F46E5',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#4F46E5',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  secondaryButtonText: {
    color: '#4F46E5',
  },
  facilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  facilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  facilityText: {
    fontSize: 14,
    color: '#4F46E5',
    fontWeight: '500',
    marginLeft: 6,
  },
});