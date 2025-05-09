import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Platform,
  Image
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAppStore } from '../src/store/appStore';
import { getLocationById } from '../src/services/campusDataService';

export default function BookmarksScreen() {
  const { bookmarks, removeBookmark, language, darkMode } = useAppStore();
  
  // Get full location data for each bookmark
  const bookmarkedLocations = bookmarks.map(bookmark => {
    const location = getLocationById(bookmark.locationId);
    return {
      ...bookmark,
      location
    };
  }).filter(item => item.location !== undefined); // Filter out any invalid bookmarks
  
  const handleLocationPress = (locationId: string) => {
    router.push({
      pathname: '/location/[id]',
      params: { id: locationId }
    });
  };
  
  const handleRemoveBookmark = (bookmarkId: string) => {
    removeBookmark(bookmarkId);
  };
  
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="bookmark-outline" size={80} color="#E5E7EB" />
      <Text style={[styles.emptyTitle, darkMode && { color: '#FFF' }]}>
        {language === 'en' ? 'No saved locations yet' : 'अभी तक कोई सहेजे गए स्थान नहीं'}
      </Text>
      <Text style={styles.emptySubtitle}>
        {language === 'en' 
          ? 'Save your favorite places for quick access' 
          : 'त्वरित पहुंच के लिए अपने पसंदीदा स्थान सहेजें'}
      </Text>
      <TouchableOpacity 
        style={styles.exploreButton}
        onPress={() => router.push('/map')}
      >
        <Text style={styles.exploreButtonText}>
          {language === 'en' ? 'Explore Map' : 'मानचित्र का अन्वेषण करें'}
        </Text>
      </TouchableOpacity>
    </View>
  );
  
  interface BookmarkItem {
    id: string;
    locationId: string;
    location: {
      type: string;
      name: string;
      building?: string;
      floor?: string;
      roomNumber?: string;
    };
  }
  
  const renderBookmarkItem = ({ item }: { item: BookmarkItem }) => (
    <TouchableOpacity 
      style={[
        styles.bookmarkCard,
        darkMode && { backgroundColor: '#1E1E1E', borderColor: '#2C2C2C' }
      ]}
      onPress={() => handleLocationPress(item.locationId)}
    >
      <View style={styles.locationIconContainer}>
        <Ionicons 
          name={
            item.location.type === 'classroom' ? 'school' :
            item.location.type === 'lab' ? 'flask' :
            item.location.type === 'office' ? 'business' :
            item.location.type === 'library' ? 'library' :
            item.location.type === 'cafeteria' ? 'restaurant' : 'location'
          } 
          size={24} 
          color="#4F46E5" 
        />
      </View>
      
      <View style={styles.bookmarkInfo}>
        <Text style={[
          styles.locationName,
          darkMode && { color: '#FFF' }
        ]}>
          {item.location.name}
        </Text>
        <Text style={styles.locationDetails}>
          {item.location.building ? `${item.location.building}, ` : ''}
          {item.location.floor ? `Floor ${item.location.floor}, ` : ''}
          {item.location.roomNumber ? `Room ${item.location.roomNumber}` : ''}
        </Text>
      </View>
      
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => handleRemoveBookmark(item.id)}
      >
        <Ionicons name="close-circle" size={22} color="#6B7280" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
  
  return (
    <View style={[
      styles.container,
      darkMode && { backgroundColor: '#121212' }
    ]}>
      <StatusBar style={darkMode ? "light" : "dark"} />
      
      {/* Header */}
      <View style={[
        styles.header,
        darkMode && { backgroundColor: '#121212' }
      ]}>
        <Text style={[
          styles.headerTitle,
          darkMode && { color: '#FFF' }
        ]}>
          {language === 'en' ? 'Saved Locations' : 'सहेजे गए स्थान'}
        </Text>
        {bookmarks.length > 0 && (
          <Text style={styles.bookmarkCount}>
            {bookmarks.length} {language === 'en' ? 'items' : 'आइटम'}
          </Text>
        )}
      </View>
      
      {/* Bookmarks List */}
      <FlatList
        data={bookmarkedLocations}
        keyExtractor={(item) => item.id}
        renderItem={renderBookmarkItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  bookmarkCount: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 24,
    flexGrow: 1,
  },
  bookmarkCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  locationIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  bookmarkInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  locationDetails: {
    fontSize: 14,
    color: '#6B7280',
  },
  removeButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    minHeight: 400,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  exploreButton: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  exploreButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  }
});