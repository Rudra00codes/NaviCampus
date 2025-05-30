
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../src/store/appStore';
import { useState } from 'react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { language } = useAppStore();
  const navigateToSchedule = () => {
    router.push('/schedule' as any);
  };

  const navigateToMap = () => {
    router.push('/map' as any);
  };

  const navigateToBookmarks = () => {
    router.push('/bookmarks' as any);
  };

  const navigateToNotifications = () => {
    // This route might not exist yet, but TypeScript won't complain with type assertion
    router.push('/notifications' as any);
  };

  const navigateToSettings = () => {
    router.push('/settings' as any);
  };
  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Using type assertion to bypass TypeScript route constraints
      router.push({
        pathname: '/search' as any,
        params: { query: searchQuery }
      });
    } else {
      // Since we removed navigateToSearch, we'll use the same approach here
      router.push({ pathname: '/search' as any });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>NaviCampus</Text>
          <Text style={styles.subtitle}>
            {language === 'en' 
              ? 'Campus Navigation App' 
              : 'कैंपस नेविगेशन ऐप'}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={navigateToSettings}
        >
          <Ionicons name="settings-outline" size={24} color="#3B82F6" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#6B7280" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={language === 'en' ? "Search for buildings, rooms..." : "भवन, कमरे खोजें..."}
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
      </View>      <View style={styles.universityLogoContainer}>
        <Text style={styles.sectionTitle}>
          {language === 'en' ? 'Official Campus Partner' : 'आधिकारिक परिसर भागीदार'}
        </Text>
        <View style={styles.logoWrapper}>
          <Image 
            source={require('../assets/AMITY UNIVERSITY PUNJAB.png')} 
            style={styles.universityLogo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.universityName}>
          {language === 'en' ? 'Amity University Punjab' : 'एमिटी यूनिवर्सिटी पंजाब'}
        </Text>
      </View>
      
      <View style={styles.featureContainer}>
        <Text style={styles.sectionTitle}>
          {language === 'en' ? 'Features' : 'विशेषताएं'}
        </Text>
        
        <TouchableOpacity 
          style={styles.featureButton}
          onPress={navigateToMap}
        >
          <Ionicons name="map" size={24} color="#4F46E5" style={styles.featureIcon} />
          <View style={styles.featureTextContainer}>
            <Text style={styles.featureText}>
              {language === 'en' ? '🗺️ Interactive Campus Map' : '🗺️ इंटरैक्टिव कैंपस मैप'}
            </Text>
            <Text style={styles.featureDescription}>
              {language === 'en' 
                ? 'Navigate through buildings effortlessly'
                : 'भवनों के बीच आसानी से नेविगेट करें'}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#A1A1AA" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.featureButton}
          onPress={navigateToSchedule}
        >
          <Ionicons name="calendar" size={24} color="#4F46E5" style={styles.featureIcon} />
          <View style={styles.featureTextContainer}>
            <Text style={styles.featureText}>
              {language === 'en' ? '📅 Class Schedule' : '📅 कक्षा कार्यक्रम'}
            </Text>
            <Text style={styles.featureDescription}>
              {language === 'en'
                ? 'Keep track of your classes and events'
                : 'अपनी कक्षाओं और कार्यक्रमों पर नज़र रखें'}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#A1A1AA" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.featureButton}
          onPress={navigateToBookmarks}
        >
          <Ionicons name="bookmark" size={24} color="#4F46E5" style={styles.featureIcon} />
          <View style={styles.featureTextContainer}>
            <Text style={styles.featureText}>
              {language === 'en' ? '📍 Location Bookmarking' : '📍 स्थान बुकमार्किंग'}
            </Text>
            <Text style={styles.featureDescription}>
              {language === 'en'
                ? 'Save your frequently visited places'
                : 'अपने अक्सर जाने वाले स्थानों को सहेजें'}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#A1A1AA" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.featureButton}
          onPress={navigateToNotifications}
        >
          <Ionicons name="notifications" size={24} color="#4F46E5" style={styles.featureIcon} />
          <View style={styles.featureTextContainer}>
            <Text style={styles.featureText}>
              {language === 'en' ? '🔔 Real-time Notifications' : '🔔 रीयल-टाइम सूचनाएं'}
            </Text>
            <Text style={styles.featureDescription}>
              {language === 'en'
                ? 'Get alerts about changes and events'
                : 'परिवर्तनों और कार्यक्रमों के बारे में अलर्ट प्राप्त करें'}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#A1A1AA" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.supportContainer}
          onPress={navigateToSettings}
        >
          <Ionicons name="language" size={20} color="#4F46E5" />
          <Text style={styles.supportText}>
            {language === 'en' ? 'English / हिंदी' : 'अंग्रेज़ी / हिंदी'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#64748B',
  },
  settingsButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E4E4E7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  clearButton: {
    padding: 4,
  },
  quickAccessContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#334155',
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAccessItem: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickAccessText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
  },
  featureContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  featureButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    marginRight: 16,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
  },
  featureDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  supportContainer: {
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },  supportText: {
    color: '#4F46E5',
    fontSize: 14,
    marginLeft: 8,
  },
  universityLogoContainer: {
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  universityLogo: {
    width: '85%',
    height: 120,
  },
  universityName: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
    marginTop: 8,
  }
});