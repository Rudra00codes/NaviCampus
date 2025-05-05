import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { searchLocations } from '../services/campusDataService';
import { Location } from '../store/appStore';
import { useAppStore } from '../store/appStore';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Location[]>([]);
  const { addRecentSearch, recentSearches } = useAppStore();

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim().length > 2) {
      const results = searchLocations(text);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim().length > 0) {
      addRecentSearch(searchQuery);
      const results = searchLocations(searchQuery);
      setSearchResults(results);
    }
  };

  const handleLocationPress = (location: Location) => {
    // Navigate to location details
    router.push({
      pathname: `/location/${location.id}`,
      params: { id: location.id }
    });
  };

  const LocationItem = ({ item }: { item: Location }) => (
    <TouchableOpacity 
      style={styles.locationItem}
      onPress={() => handleLocationPress(item)}
    >
      <View style={styles.locationIcon}>
        {item.type === 'classroom' && <Ionicons name="school" size={24} color="#4F46E5" />}
        {item.type === 'lab' && <Ionicons name="flask" size={24} color="#4F46E5" />}
        {item.type === 'office' && <Ionicons name="business" size={24} color="#4F46E5" />}
        {item.type === 'library' && <Ionicons name="library" size={24} color="#4F46E5" />}
        {item.type === 'cafeteria' && <Ionicons name="restaurant" size={24} color="#4F46E5" />}
        {item.type === 'other' && <Ionicons name="location" size={24} color="#4F46E5" />}
      </View>
      <View style={styles.locationInfo}>
        <Text style={styles.locationName}>{item.name}</Text>
        <Text style={styles.locationDetails}>
          {item.building ? `${item.building}, ` : ''}
          {item.floor ? `Floor ${item.floor}, ` : ''}
          {item.roomNumber ? `Room ${item.roomNumber}` : ''}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#A1A1AA" />
    </TouchableOpacity>
  );

  const renderRecentSearches = () => (
    <View style={styles.recentContainer}>
      <Text style={styles.sectionTitle}>Recent Searches</Text>
      {recentSearches.length === 0 ? (
        <Text style={styles.emptyText}>No recent searches</Text>
      ) : (
        recentSearches.map((search, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.recentItem}
            onPress={() => handleSearch(search)}
          >
            <Ionicons name="time-outline" size={18} color="#A1A1AA" />
            <Text style={styles.recentText}>{search}</Text>
          </TouchableOpacity>
        ))
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Find Locations</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#A1A1AA" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for buildings, rooms, etc."
          value={searchQuery}
          onChangeText={handleSearch}
          onSubmitEditing={handleSearchSubmit}
          returnKeyType="search"
          autoFocus
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

      {searchQuery.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={({ item }) => <LocationItem item={item} />}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="search" size={48} color="#E4E4E7" />
              <Text style={styles.emptyText}>No results found</Text>
            </View>
          }
          contentContainerStyle={styles.resultsList}
        />
      ) : (
        renderRecentSearches()
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E4E4E7',
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
  resultsList: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  locationInfo: {
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  emptyText: {
    fontSize: 16,
    color: '#A1A1AA',
    marginTop: 12,
  },
  recentContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E7',
  },
  recentText: {
    fontSize: 16,
    color: '#4B5563',
    marginLeft: 12,
  },
});