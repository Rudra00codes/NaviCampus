# NaviCampus Prototype Preparation Checklist
Last Updated: May 21, 2025

## 🔴 Critical Path (Must Complete)

### 1. Dependency Fixes
- [ ] Run dependency installation script:
      ```powershell
      .\prepare-prototype.ps1
      ```
- [ ] Install map components:
      ```powershell
      npx expo install react-native-maps
      ```
- [ ] Test basic navigation flow between all screens

### 2. Map Integration
- [ ] Add map markers for key campus locations
- [ ] Implement basic "directions to" functionality
- [ ] Test indoor/outdoor mode toggle

### 3. Schedule Enhancements
- [ ] Add sample course schedules for demonstration
- [ ] Link schedule items to map locations
- [ ] Verify day/week view transitions

## 🟠 Important Features (Should Complete)

### 1. UI Polish
- [ ] Add splash screen and app icon
- [ ] Add loading indicators where appropriate
- [ ] Implement smooth transitions between screens

### 2. Data Management
- [ ] Ensure bookmarks are saved and restored
- [ ] Add option to clear search history
- [ ] Test language switching

### 3. Basic Offline Support
- [ ] Cache campus location data
- [ ] Save user preferences
- [ ] Ensure app works with no network

## 🟢 Nice-to-Have Features (If Time Permits)

### 1. Notifications
- [ ] Add mock class reminders
- [ ] Implement location-based notifications UI
- [ ] Add settings to control notification types

### 2. User Profile
- [ ] Add basic profile screen
- [ ] Allow customized schedule view
- [ ] Support multiple themes

## 📋 Prototype Demo Preparation

### Demo Path 1: New Student Experience
1. Start at home screen
2. Search for "Computer Science Building"
3. View building details and bookmark
4. Navigate to schedule view
5. Show class location on map

### Demo Path 2: Daily Campus Navigation
1. Start at home screen
2. View today's schedule
3. Locate next class on map
4. Toggle to indoor navigation
5. Show floor selection

### Demo Path 3: Accessibility Features
1. Show language switching (English to Hindi)
2. Demonstrate dark mode
3. Show text size adjustment
4. Demonstrate screen reader compatibility

## 📝 Known Limitations to Communicate
- Maps use sample data, not real-time location
- Indoor navigation is simulated (Wi-Fi positioning not implemented)
- No backend integration (using mock data)
- Limited device testing (specify which devices were tested)
