import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions,
  ScrollView,
  TextInput,
  Platform
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../src/store/appStore';
import { campusLocations } from '../src/services/campusDataService';

// Mock components for map view - in a real app, you would use react-native-maps
// and other navigation libraries
const MapPlaceholder = () => {
  const [selectedFloor, setSelectedFloor] = useState(1);
  
  return (
    <View style={styles.mapContainer}>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapPlaceholderText}>Campus Map</Text>
        <Ionicons name="map" size={64} color="#A1A1AA" />
        <Text style={styles.mapPlaceholderSubtext}>
          Map data would be displayed here using Google Maps API
        </Text>
      </View>
      
      {/* Floor selector for indoor navigation */}
      <View style={styles.floorSelector}>
        <TouchableOpacity 
          style={[
            styles.floorButton, 
            selectedFloor === 3 && styles.floorButtonActive
          ]}
          onPress={() => setSelectedFloor(3)}
        >
          <Text style={[
            styles.floorButtonText,
            selectedFloor === 3 && styles.floorButtonTextActive
          ]}>3F</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.floorButton, 
            selectedFloor === 2 && styles.floorButtonActive
          ]}
          onPress={() => setSelectedFloor(2)}
        >
          <Text style={[
            styles.floorButtonText,
            selectedFloor === 2 && styles.floorButtonTextActive
          ]}>2F</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.floorButton, 
            selectedFloor === 1 && styles.floorButtonActive
          ]}
          onPress={() => setSelectedFloor(1)}
        >
          <Text style={[
            styles.floorButtonText,
            selectedFloor === 1 && styles.floorButtonTextActive
          ]}>1F</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.floorButton, 
            selectedFloor === 0 && styles.floorButtonActive
          ]}
          onPress={() => setSelectedFloor(0)}
        >
          <Text style={[
            styles.floorButtonText,
            selectedFloor === 0 && styles.floorButtonTextActive
          ]}>G</Text>
        </TouchableOpacity>
      </View>
      
      {/* Map controls */}
      <View style={styles.mapControls}>
        <TouchableOpacity style={styles.mapControlButton}>
          <Ionicons name="locate" size={24} color="#3B82F6" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.mapControlButton}>
          <Ionicons name="compass" size={24} color="#3B82F6" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.mapControlButton}>
          <Ionicons name="add" size={24} color="#3B82F6" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.mapControlButton}>
          <Ionicons name="remove" size={24} color="#3B82F6" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function MapScreen() {
  const { language } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const [mode, setMode] = useState<'outdoor' | 'indoor'>('outdoor');
  
  const toggleMode = () => {
    setMode(mode === 'outdoor' ? 'indoor' : 'outdoor');
  };
  
  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push({
        pathname: '/search',
        params: { query: searchQuery }
      });
    }
  };
  
  const navigateToLocation = (id: string) => {
    router.push({
      pathname: `/location/${id}`,
      params: { id }
    });
  };
  
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {language === 'en' ? 'Campus Map' : 'कैंपस का नक्शा'}
        </Text>
        <TouchableOpacity style={styles.modeToggleButton} onPress={toggleMode}>
          <Ionicons 
            name={mode === 'outdoor' ? "business" : "earth"} 
            size={24} 
            color="#3B82F6" 
          />
        </TouchableOpacity>
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#6B7280" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={language === 'en' ? "Search locations..." : "स्थान खोजें..."}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={() => setSearchQuery('')}
          >
            <Ionicons name="close-circle" size={20} color="#A1A1AA" />
          </TouchableOpacity>
        )}
      </View>
      
      {/* Map View */}
      <MapPlaceholder />
      
      {/* Bottom Information Panel */}
      {showInfoPanel && (
        <View style={styles.infoPanel}>
          <View style={styles.infoPanelHeader}>
            <Text style={styles.infoPanelTitle}>
              {language === 'en' ? 'Nearby Locations' : 'आस-पास के स्थान'}
            </Text>
            <TouchableOpacity onPress={() => setShowInfoPanel(false)}>
              <Ionicons name="chevron-down" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.nearbyLocationsScroll}
            contentContainerStyle={styles.nearbyLocationsContent}
          >
            {campusLocations.slice(0, 5).map((location) => (
              <TouchableOpacity 
                key={location.id}
                style={styles.locationCard}
                onPress={() => navigateToLocation(location.id)}
              >
                <View style={styles.locationIconContainer}>
                  <Ionicons 
                    name={
                      location.type === 'classroom' ? 'school' :
                      location.type === 'lab' ? 'flask' :
                      location.type === 'office' ? 'business' :
                      location.type === 'library' ? 'library' :
                      location.type === 'cafeteria' ? 'restaurant' : 'location'
                    } 
                    size={24} 
                    color="#4F46E5" 
                  />
                </View>
                <Text style={styles.locationName} numberOfLines={1}>
                  {location.name}
                </Text>
                <Text style={styles.locationDistance} numberOfLines={1}>
                  {/* This would be actual distance in a real app */}
                  {Math.floor(Math.random() * 200) + 10}m
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          <View style={styles.navigationInfo}>
            <View style={styles.navigationInfoIcon}>
              <Ionicons name="navigate" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.navigationInfoTextContainer}>
              <Text style={styles.navigationInfoTitle}>
                {language === 'en' ? 'Wi-Fi Based Indoor Navigation' : 'वाईफाई आधारित इनडोर नेविगेशन'}
              </Text>
              <Text style={styles.navigationInfoDescription}>
                {language === 'en' 
                  ? 'Enable Wi-Fi for precise indoor navigation' 
                  : 'सटीक इनडोर नेविगेशन के लिए वाईफाई सक्षम करें'}
              </Text>
            </View>
            <TouchableOpacity style={styles.navigationInfoButton}>
              <Text style={styles.navigationInfoButtonText}>
                {language === 'en' ? 'Enable' : 'सक्षम करें'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      {/* Button to expand panel when collapsed */}
      {!showInfoPanel && (
        <TouchableOpacity 
          style={styles.expandButton}
          onPress={() => setShowInfoPanel(true)}
        >
          <Ionicons name="chevron-up" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
  },
  modeToggleButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginTop: 8,
    borderRadius: 8,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: '#111827',
  },
  clearButton: {
    padding: 4,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6B7280',
    marginBottom: 12,
  },
  mapPlaceholderSubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 40,
    marginTop: 12,
  },
  floorSelector: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  floorButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  floorButtonActive: {
    backgroundColor: '#3B82F6',
  },
  floorButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
  },
  floorButtonTextActive: {
    color: '#FFFFFF',
  },
  mapControls: {
    position: 'absolute',
    bottom: 150,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  mapControlButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  infoPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
    maxHeight: height * 0.4,
  },
  infoPanelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  infoPanelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  nearbyLocationsScroll: {
    marginBottom: 16,
  },
  nearbyLocationsContent: {
    paddingHorizontal: 12,
  },
  locationCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
    width: 100,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  locationIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
    marginBottom: 4,
    textAlign: 'center',
  },
  locationDistance: {
    fontSize: 12,
    color: '#6B7280',
  },
  navigationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 12,
  },
  navigationInfoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  navigationInfoTextContainer: {
    flex: 1,
  },
  navigationInfoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  navigationInfoDescription: {
    fontSize: 12,
    color: '#6B7280',
  },
  navigationInfoButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  navigationInfoButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  expandButton: {
    position: 'absolute',
    bottom: 20,
    left: width / 2 - 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});