import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Switch,
  Platform,
  Image,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../src/store/appStore';
import AuthScreen from '../src/components/AuthScreen';

export default function AccountScreen() {
  const { 
    language, 
    setLanguage, 
    darkMode, 
    toggleDarkMode,
    clearRecentSearches,
    clearNotifications,
    isAuthenticated,
    user,
    logout,
    updateUser,
  } = useAppStore();

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editField, setEditField] = useState<string>('');
  const [editValue, setEditValue] = useState<string>('');

  const theme = {
    background: darkMode ? '#121212' : '#FFFFFF',
    surface: darkMode ? '#1E1E1E' : '#F9FAFB',
    primary: '#4F46E5',
    text: darkMode ? '#FFFFFF' : '#111827',
    textSecondary: darkMode ? '#A1A1AA' : '#6B7280',
    border: darkMode ? '#374151' : '#D1D5DB',
    card: darkMode ? '#1F2937' : '#FFFFFF',
  };

  const texts = {
    en: {
      account: 'Account',
      profile: 'Profile',
      settings: 'Settings',
      language: 'Language',
      appLanguage: 'App Language',
      appearance: 'Appearance',
      darkMode: 'Dark Mode',
      switchTheme: 'Switch between light and dark theme',
      notifications: 'Notifications',
      pushNotifications: 'Push Notifications',
      classReminders: 'Receive alerts for class reminders and events',
      locationServices: 'Location Services',
      locationAlerts: 'Enable for location-based notifications',
      dataManagement: 'Data Management',
      clearSearchHistory: 'Clear Search History',
      removeSearches: 'Remove all recent searches',
      clearNotifications: 'Clear Notifications',
      removeNotifications: 'Remove all notifications',
      aboutSupport: 'About & Support',
      aboutApp: 'About NaviCampus',
      version: 'Version 1.0.0',
      helpSupport: 'Help & Support',
      contactUs: 'Contact us for assistance',
      signOut: 'Sign Out',
      signOutConfirm: 'Are you sure you want to sign out?',
      cancel: 'Cancel',
      confirm: 'Sign Out',
      edit: 'Edit',
      save: 'Save',
      studentInfo: 'Student Information',
      contactInfo: 'Contact Information',
      emergencyContact: 'Emergency Contact',
      academicInfo: 'Academic Information',
    },
    hi: {
      account: 'खाता',
      profile: 'प्रोफ़ाइल',
      settings: 'सेटिंग्स',
      language: 'भाषा',
      appLanguage: 'ऐप भाषा',
      appearance: 'दिखावट',
      darkMode: 'डार्क मोड',
      switchTheme: 'लाइट और डार्क थीम के बीच स्विच करें',
      notifications: 'सूचनाएँ',
      pushNotifications: 'पुश नोटिफिकेशन',
      classReminders: 'कक्षा अनुस्मारक और घटनाओं के लिए अलर्ट प्राप्त करें',
      locationServices: 'स्थान सेवाएँ',
      locationAlerts: 'स्थान-आधारित सूचनाओं के लिए सक्षम करें',
      dataManagement: 'डेटा प्रबंधन',
      clearSearchHistory: 'खोज इतिहास साफ़ करें',
      removeSearches: 'सभी हालिया खोजें हटाएं',
      clearNotifications: 'सूचनाएं साफ़ करें',
      removeNotifications: 'सभी सूचनाएं हटाएं',
      aboutSupport: 'जानकारी और समर्थन',
      aboutApp: 'नेविकैंपस के बारे में',
      version: 'संस्करण 1.0.0',
      helpSupport: 'सहायता और समर्थन',
      contactUs: 'सहायता के लिए हमसे संपर्क करें',
      signOut: 'साइन आउट',
      signOutConfirm: 'क्या आप वाकई साइन आउट करना चाहते हैं?',
      cancel: 'रद्द करें',
      confirm: 'साइन आउट',
      edit: 'संपादित करें',
      save: 'सेव करें',
      studentInfo: 'छात्र जानकारी',
      contactInfo: 'संपर्क जानकारी',
      emergencyContact: 'आपातकालीन संपर्क',
      academicInfo: 'शैक्षणिक जानकारी',
    },
  };

  const t = texts[language];

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const handleSignOut = () => {
    Alert.alert(
      t.signOut,
      t.signOutConfirm,
      [
        { text: t.cancel, style: 'cancel' },
        { 
          text: t.confirm, 
          style: 'destructive',
          onPress: logout 
        },
      ]
    );
  };

  const openEditModal = (field: string, currentValue: string) => {
    setEditField(field);
    setEditValue(currentValue);
    setEditModalVisible(true);
  };

  const saveEdit = () => {
    if (user && editField && editValue.trim()) {
      updateUser({ [editField]: editValue.trim() });
      setEditModalVisible(false);
      setEditField('');
      setEditValue('');
    }
  };

  const ProfileHeader = () => (
    <View style={[styles.profileHeader, { backgroundColor: theme.card }]}>
      <View style={styles.profileImageContainer}>
        {user?.profilePhoto ? (
          <Image source={{ uri: user.profilePhoto }} style={styles.profileImage} />
        ) : (
          <View style={[styles.profileImagePlaceholder, { backgroundColor: theme.primary }]}>
            <Text style={styles.profileImageText}>
              {user?.name.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.profileInfo}>
        <Text style={[styles.profileName, { color: theme.text }]}>{user?.name}</Text>
        <Text style={[styles.profileRoll, { color: theme.textSecondary }]}>{user?.rollNumber}</Text>
        <Text style={[styles.profileCourse, { color: theme.textSecondary }]}>
          {user?.course} - {user?.branch}
        </Text>
        <Text style={[styles.profileSemester, { color: theme.primary }]}>
          Semester {user?.semester} • Year {user?.year}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={darkMode ? "light" : "dark"} />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          {t.account}
        </Text>
      </View>
      
      <ScrollView style={styles.content}>
        {/* Profile Header */}
        <ProfileHeader />

        {/* Student Information */}
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>{t.studentInfo}</Text>
          
          <TouchableOpacity 
            style={styles.infoItem}
            onPress={() => openEditModal('name', user?.name || '')}
          >
            <View style={styles.infoItemLeft}>
              <Ionicons name="person" size={20} color={theme.primary} style={styles.infoIcon} />
              <View style={styles.infoTextContainer}>
                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Full Name</Text>
                <Text style={[styles.infoValue, { color: theme.text }]}>{user?.name}</Text>
              </View>
            </View>
            <Ionicons name="pencil" size={16} color={theme.textSecondary} />
          </TouchableOpacity>

          <View style={styles.infoItem}>
            <View style={styles.infoItemLeft}>
              <Ionicons name="id-card" size={20} color={theme.primary} style={styles.infoIcon} />
              <View style={styles.infoTextContainer}>
                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Roll Number</Text>
                <Text style={[styles.infoValue, { color: theme.text }]}>{user?.rollNumber}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.infoItem}
            onPress={() => openEditModal('email', user?.email || '')}
          >
            <View style={styles.infoItemLeft}>
              <Ionicons name="mail" size={20} color={theme.primary} style={styles.infoIcon} />
              <View style={styles.infoTextContainer}>
                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Email</Text>
                <Text style={[styles.infoValue, { color: theme.text }]}>{user?.email}</Text>
              </View>
            </View>
            <Ionicons name="pencil" size={16} color={theme.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Academic Information */}
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>{t.academicInfo}</Text>
          
          <View style={styles.infoItem}>
            <View style={styles.infoItemLeft}>
              <Ionicons name="school" size={20} color={theme.primary} style={styles.infoIcon} />
              <View style={styles.infoTextContainer}>
                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Course</Text>
                <Text style={[styles.infoValue, { color: theme.text }]}>{user?.course}</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoItemLeft}>
              <Ionicons name="library" size={20} color={theme.primary} style={styles.infoIcon} />
              <View style={styles.infoTextContainer}>
                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Branch</Text>
                <Text style={[styles.infoValue, { color: theme.text }]}>{user?.branch}</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoItemLeft}>
              <Ionicons name="calendar" size={20} color={theme.primary} style={styles.infoIcon} />
              <View style={styles.infoTextContainer}>
                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Current Semester</Text>
                <Text style={[styles.infoValue, { color: theme.text }]}>Semester {user?.semester}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Contact Information */}
        {user?.phone && (
          <View style={[styles.section, { backgroundColor: theme.card }]}>
            <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>{t.contactInfo}</Text>
            
            <TouchableOpacity 
              style={styles.infoItem}
              onPress={() => openEditModal('phone', user?.phone || '')}
            >
              <View style={styles.infoItemLeft}>
                <Ionicons name="call" size={20} color={theme.primary} style={styles.infoIcon} />
                <View style={styles.infoTextContainer}>
                  <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Phone</Text>
                  <Text style={[styles.infoValue, { color: theme.text }]}>{user?.phone}</Text>
                </View>
              </View>
              <Ionicons name="pencil" size={16} color={theme.textSecondary} />
            </TouchableOpacity>

            {user?.address && (
              <TouchableOpacity 
                style={styles.infoItem}
                onPress={() => openEditModal('address', user?.address || '')}
              >
                <View style={styles.infoItemLeft}>
                  <Ionicons name="location" size={20} color={theme.primary} style={styles.infoIcon} />
                  <View style={styles.infoTextContainer}>
                    <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Address</Text>
                    <Text style={[styles.infoValue, { color: theme.text }]}>{user?.address}</Text>
                  </View>
                </View>
                <Ionicons name="pencil" size={16} color={theme.textSecondary} />
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* App Settings */}
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>{t.settings}</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Ionicons name="language" size={20} color={theme.primary} style={styles.settingIcon} />
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingLabel, { color: theme.text }]}>{t.appLanguage}</Text>
                <Text style={[styles.settingValue, { color: theme.primary }]}>
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
          
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Ionicons name="moon" size={20} color={theme.primary} style={styles.settingIcon} />
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingLabel, { color: theme.text }]}>{t.darkMode}</Text>
                <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>
                  {t.switchTheme}
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
        </View>

        {/* Data Management */}
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>{t.dataManagement}</Text>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={clearRecentSearches}
          >
            <View style={styles.settingItemLeft}>
              <Ionicons name="time" size={20} color={theme.primary} style={styles.settingIcon} />
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingLabel, { color: theme.text }]}>{t.clearSearchHistory}</Text>
                <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>
                  {t.removeSearches}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={clearNotifications}
          >
            <View style={styles.settingItemLeft}>
              <Ionicons name="notifications-off" size={20} color={theme.primary} style={styles.settingIcon} />
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingLabel, { color: theme.text }]}>{t.clearNotifications}</Text>
                <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>
                  {t.removeNotifications}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Sign Out */}
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <TouchableOpacity 
            style={styles.signOutItem}
            onPress={handleSignOut}
          >
            <Ionicons name="log-out" size={20} color="#EF4444" style={styles.settingIcon} />
            <Text style={[styles.signOutText, { color: '#EF4444' }]}>{t.signOut}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Edit Modal */}
      <Modal
        visible={editModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              {t.edit} {editField}
            </Text>
            
            <TextInput
              style={[styles.modalInput, { 
                backgroundColor: theme.surface, 
                borderColor: theme.border,
                color: theme.text 
              }]}
              value={editValue}
              onChangeText={setEditValue}
              placeholder={`Enter ${editField}`}
              placeholderTextColor={theme.textSecondary}
              multiline={editField === 'address'}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton, { borderColor: theme.border }]}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={[styles.cancelButtonText, { color: theme.textSecondary }]}>
                  {t.cancel}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton, { backgroundColor: theme.primary }]}
                onPress={saveEdit}
              >
                <Text style={styles.saveButtonText}>{t.save}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

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
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    padding: 20,
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileImageContainer: {
    marginRight: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileRoll: {
    fontSize: 14,
    marginBottom: 2,
  },
  profileCourse: {
    fontSize: 14,
    marginBottom: 4,
  },
  profileSemester: {
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  infoItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoIcon: {
    marginRight: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
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
    marginRight: 12,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
  },
  settingValue: {
    fontSize: 14,
    fontWeight: '500',
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
  signOutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 16,
    padding: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 24,
    minHeight: 48,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
  },
  saveButton: {
    // backgroundColor is set dynamically
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});