import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';

// Define types for our application state
type Location = {
  id: string;
  name: string;
  description?: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  building?: string;
  floor?: number;
  roomNumber?: string;
  type: 'classroom' | 'lab' | 'office' | 'library' | 'cafeteria' | 'other';
};

type Bookmark = {
  id: string;
  locationId: string;
  createdAt: Date;
};

type ClassSchedule = {
  id: string;
  name: string;
  room: string;
  building: string;
  startTime: string;
  endTime: string;
  dayOfWeek: number; // 0-6, where 0 is Sunday
  instructor?: string;
};

type Notification = {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: 'class' | 'event' | 'alert' | 'general';
  locationId?: string;
};

type AppState = {
  // User preferences
  language: 'en' | 'hi';
  darkMode: boolean;
  
  // Data
  bookmarks: Bookmark[];
  classSchedule: ClassSchedule[];
  notifications: Notification[];
  
  // Search history
  recentSearches: string[];
  
  // Actions
  setLanguage: (language: 'en' | 'hi') => void;
  toggleDarkMode: () => void;
  addBookmark: (locationId: string) => void;
  removeBookmark: (id: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
};

// Create the store with persistence
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      language: 'en',
      darkMode: false,
      bookmarks: [],
      classSchedule: [],
      notifications: [],
      recentSearches: [],
      
      // Actions
      setLanguage: (language) => set({ language }),
      
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      
      addBookmark: (locationId) => set((state) => ({
        bookmarks: [
          ...state.bookmarks,
          {
            id: Date.now().toString(),
            locationId,
            createdAt: new Date(),
          },
        ],
      })),
      
      removeBookmark: (id) => set((state) => ({
        bookmarks: state.bookmarks.filter((bookmark) => bookmark.id !== id),
      })),
      
      addNotification: (notification) => set((state) => ({
        notifications: [
          {
            ...notification,
            id: Date.now().toString(),
            timestamp: new Date(),
            read: false,
          },
          ...state.notifications,
        ],
      })),
      
      markNotificationAsRead: (id) => set((state) => ({
        notifications: state.notifications.map((notification) =>
          notification.id === id
            ? { ...notification, read: true }
            : notification
        ),
      })),
      
      clearNotifications: () => set({ notifications: [] }),
      
      addRecentSearch: (query) => set((state) => ({
        recentSearches: [
          query,
          ...state.recentSearches.filter((item) => item !== query).slice(0, 9),
        ],
      })),
      
      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: 'navicampus-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Export types for use in components
export type { Location, Bookmark, ClassSchedule, Notification };