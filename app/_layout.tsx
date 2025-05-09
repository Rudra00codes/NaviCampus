import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAppStore } from '../src/store/appStore';

export default function RootLayout() {
  const { darkMode } = useAppStore();
  
  // Colors based on theme
  const theme = {
    background: darkMode ? '#121212' : '#FFFFFF',
    tabBar: darkMode ? '#1E1E1E' : '#FFFFFF',
    tabBarBorder: darkMode ? '#2C2C2C' : '#E5E7EB',
    primary: '#4F46E5', // Indigo - brand color
    textPrimary: darkMode ? '#FFFFFF' : '#111827',
    textSecondary: darkMode ? '#A1A1AA' : '#6B7280',
  };

  return (
    <SafeAreaProvider style={{ backgroundColor: theme.background }}>
      <StatusBar style={darkMode ? "light" : "dark"} />
      <Tabs 
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: Platform.OS === 'ios' ? 88 : 64, // Taller for iOS with notch
            backgroundColor: theme.tabBar,
            borderTopWidth: 1,
            borderTopColor: theme.tabBarBorder,
            paddingBottom: Platform.OS === 'ios' ? 28 : 8,
            paddingTop: 8,
            elevation: 0, // Remove shadow on Android
            shadowOpacity: 0, // Remove shadow on iOS
          },
          tabBarShowLabel: true,
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.textSecondary,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
        }}
      >
        <Tabs.Screen
          name="index" // Home screen
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="map" // Map screen
          options={{
            title: 'Map',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="map" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="schedule" // Schedule screen
          options={{
            title: 'Schedule',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="bookmarks" // New bookmarks screen (to be created)
          options={{
            title: 'Saved',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bookmark" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="settings" // Settings/Account screen
          options={{
            title: 'Account',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}