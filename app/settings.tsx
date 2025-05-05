import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Switch,
  Platform,
  Linking,
  Alert
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../src/store/appStore';

export default function SettingsScreen() {
  const { 
    language, 
    setLanguage, 
    darkMode, 
    toggleDarkMode,
    clearRecentSearches,
    clearNotifications
  } = useAppStore();

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
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
          {language === 'en' ? 'Settings' : 'सेटिंग्स'}
        </Text>
      </View>
      
      <ScrollView style={styles.settingsContainer}>
        {/* Language Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {language === 'en' ? 'Language' : 'भाषा'}
          </Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Ionicons name="language" size={24} color="#4F46E5" style={styles.settingIcon} />
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingLabel}>
                  {language === 'en' ? 'App Language' : 'ऐप भाषा'}
                </Text>
                <Text style={styles.settingValue}>
                  {language === 'en' ? 'English' : 'हिंदी'}
                </Text>
              </View>
            </View>
            
            <TouchableOpacity
              style={[
                styles.languageToggle, 
                language === 'hi' && styles.languageToggleActive
              ]}
              onPress={handleLanguageToggle}
              activeOpacity={0.7}
            >
              <View style={[
                styles.languageToggleThumb,
                language === 'hi' && styles.languageToggleThumbRight
              ]}>
                <Text style={styles.languageToggleText}>
                  {language === 'en' ? 'हिं' : 'EN'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Appearance Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {language === 'en' ? 'Appearance' : 'दिखावट'}
          </Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Ionicons name="moon" size={24} color="#4F46E5" style={styles.settingIcon} />
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingLabel}>
                  {language === 'en' ? 'Dark Mode' : 'डार्क मोड'}
                </Text>
                <Text style={styles.settingDescription}>
                  {language === 'en' 
                    ? 'Switch between light and dark theme' 
                    : 'लाइट और डार्क थीम के बीच स्विच करें'}
                </Text>
              </View>
            </View>
            
            <Switch
              value={darkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: '#D1D5DB', true: '#818CF8' }}
              thumbColor={darkMode ? '#4F46E5' : '#F9FAFB'}
              ios_backgroundColor="#D1D5DB"
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Ionicons name="text" size={24} color="#4F46E5" style={styles.settingIcon} />
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingLabel}>
                  {language === 'en' ? 'Text Size' : 'टेक्स्ट का आकार'}
                </Text>
                <Text style={styles.settingDescription}>
                  {language === 'en' 
                    ? 'Adjust text size for better readability' 
                    : 'बेहतर पठनीयता के लिए टेक्स्ट आकार समायोजित करें'}
                </Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.arrowButton}>
              <Ionicons name="chevron-forward" size={20} color="#A1A1AA" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Notifications Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {language === 'en' ? 'Notifications' : 'सूचनाएँ'}
          </Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Ionicons name="notifications" size={24} color="#4F46E5" style={styles.settingIcon} />
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingLabel}>
                  {language === 'en' ? 'Push Notifications' : 'पुश नोटिफिकेशन'}
                </Text>
                <Text style={styles.settingDescription}>
                  {language === 'en' 
                    ? 'Receive alerts for class reminders and events' 
                    : 'कक्षा अनुस्मारक और घटनाओं के लिए अलर्ट प्राप्त करें'}
                </Text>
              </View>
            </View>
            
            <Switch
              value={true}
              trackColor={{ false: '#D1D5DB', true: '#818CF8' }}
              thumbColor={true ? '#4F46E5' : '#F9FAFB'}
              ios_backgroundColor="#D1D5DB"
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Ionicons name="location" size={24} color="#4F46E5" style={styles.settingIcon} />
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingLabel}>
                  {language === 'en' ? 'Location Services' : 'स्थान सेवाएँ'}
                </Text>
                <Text style={styles.settingDescription}>
                  {language === 'en' 
                    ? 'Enable for location-based notifications' 
                    : 'स्थान-आधारित सूचनाओं के लिए सक्षम करें'}
                </Text>
              </View>
            </View>
            
            <Switch
              value={true}
              trackColor={{ false: '#D1D5DB', true: '#818CF8' }}
              thumbColor={true ? '#4F46E5' : '#F9FAFB'}
              ios_backgroundColor="#D1D5DB"
            />
          </View>
        </View>
        
        {/* Accessibility Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {language === 'en' ? 'Accessibility' : 'अभिगम्यता'}
          </Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Ionicons name="accessibility" size={24} color="#4F46E5" style={styles.settingIcon} />
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingLabel}>
                  {language === 'en' ? 'Screen Reader' : 'स्क्रीन रीडर'}
                </Text>
                <Text style={styles.settingDescription}>
                  {language === 'en' 
                    ? 'VoiceOver and TalkBack optimizations' 
                    : 'वॉइसओवर और टॉकबैक अनुकूलन'}
                </Text>
              </View>
            </View>
            
            <Switch
              value={false}
              trackColor={{ false: '#D1D5DB', true: '#818CF8' }}
              thumbColor={false ? '#4F46E5' : '#F9FAFB'}
              ios_backgroundColor="#D1D5DB"
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Ionicons name="contrast" size={24} color="#4F46E5" style={styles.settingIcon} />
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingLabel}>
                  {language === 'en' ? 'High Contrast' : 'उच्च कंट्रास्ट'}
                </Text>
                <Text style={styles.settingDescription}>
                  {language === 'en' 
                    ? 'Increase contrast for better visibility' 
                    : 'बेहतर दृश्यता के लिए कंट्रास्ट बढ़ाएं'}
                </Text>
              </View>
            </View>
            
            <Switch
              value={false}
              trackColor={{ false: '#D1D5DB', true: '#818CF8' }}
              thumbColor={false ? '#4F46E5' : '#F9FAFB'}
              ios_backgroundColor="#D1D5DB"
            />
          </View>
        </View>
        
        {/* Data Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {language === 'en' ? 'Data Management' : 'डेटा प्रबंधन'}
          </Text>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={clearRecentSearches}
          >
            <View style={styles.settingItemLeft}>
              <Ionicons name="time" size={24} color="#4F46E5" style={styles.settingIcon} />
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingLabel}>
                  {language === 'en' ? 'Clear Search History' : 'खोज इतिहास साफ़ करें'}
                </Text>
                <Text style={styles.settingDescription}>
                  {language === 'en' 
                    ? 'Remove all recent searches' 
                    : 'सभी हालिया खोजें हटाएं'}
                </Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.arrowButton}>
              <Ionicons name="chevron-forward" size={20} color="#A1A1AA" />
            </TouchableOpacity>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={clearNotifications}
          >
            <View style={styles.settingItemLeft}>
              <Ionicons name="trash" size={24} color="#4F46E5" style={styles.settingIcon} />
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingLabel}>
                  {language === 'en' ? 'Clear Notifications' : 'सूचनाएं साफ़ करें'}
                </Text>
                <Text style={styles.settingDescription}>
                  {language === 'en' 
                    ? 'Remove all notifications' 
                    : 'सभी सूचनाएं हटाएं'}
                </Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.arrowButton}>
              <Ionicons name="chevron-forward" size={20} color="#A1A1AA" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        
        {/* About & Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {language === 'en' ? 'About & Support' : 'जानकारी और समर्थन'}
          </Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Ionicons name="information-circle" size={24} color="#4F46E5" style={styles.settingIcon} />
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingLabel}>
                  {language === 'en' ? 'About NaviCampus' : 'नेविकैंपस के बारे में'}
                </Text>
                <Text style={styles.settingDescription}>
                  {language === 'en' 
                    ? 'Version 1.0.0' 
                    : 'संस्करण 1.0.0'}
                </Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.arrowButton}>
              <Ionicons name="chevron-forward" size={20} color="#A1A1AA" />
            </TouchableOpacity>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => Linking.openURL('mailto:support@navicampus.com')}
          >
            <View style={styles.settingItemLeft}>
              <Ionicons name="help-circle" size={24} color="#4F46E5" style={styles.settingIcon} />
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingLabel}>
                  {language === 'en' ? 'Help & Support' : 'सहायता और समर्थन'}
                </Text>
                <Text style={styles.settingDescription}>
                  {language === 'en' 
                    ? 'Contact us for assistance' 
                    : 'सहायता के लिए हमसे संपर्क करें'}
                </Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.arrowButton}>
              <Ionicons name="chevron-forward" size={20} color="#A1A1AA" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
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
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginLeft: 8,
  },
  settingsContainer: {
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginVertical: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: 16,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  settingValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4F46E5',
  },
  arrowButton: {
    padding: 8,
  },
  languageToggle: {
    width: 64,
    height: 32,
    backgroundColor: '#E0E7FF',
    borderRadius: 16,
    padding: 2,
    justifyContent: 'center',
  },
  languageToggleActive: {
    backgroundColor: '#C7D2FE',
  },
  languageToggleThumb: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageToggleThumbRight: {
    marginLeft: 'auto',
  },
  languageToggleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4F46E5',
  },
});