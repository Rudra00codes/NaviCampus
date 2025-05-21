# NaviCampus

<div align="center">
  <img src="./assets/icon.png" alt="NaviCampus Logo" width="150"/>
  <h3>Campus Navigation System for Educational Institutions</h3>
</div>

## 📝 Overview

NaviCampus is a comprehensive cross-platform mobile application designed to simplify navigation within Indian university and college campuses. The application provides indoor and outdoor navigation services, helping students, faculty, and visitors find their way around campus facilities efficiently.

By combining Google Maps integration for outdoor navigation with Wi-Fi triangulation for precise indoor positioning, NaviCampus offers a seamless navigation experience across the entire campus. The application also integrates with academic schedules to provide real-time information about room availability and bookings.

## 🏆 Key Features

- **🔍 Real-Time Room Search**: Intuitive search functionality for classrooms, labs, offices, and other campus facilities with detailed information about each location.
- **🧭 Indoor/Outdoor Navigation**: Seamless transition between outdoor navigation using Google Maps API and indoor positioning using Wi-Fi triangulation.
- **📅 Integrated Class Scheduling**: Integration with university academic schedules to provide real-time room availability and booking information.
- **🌐 Multilingual Support**: Full support for English and Hindi interfaces to cater to India's diverse student population.
- **📲 Location-Based Notifications**: Context-aware notifications for class reminders, campus events, and emergency alerts based on user location.
- **♿ Accessibility Features**: Adherence to accessibility standards including screen reader support, high contrast mode, and customizable text sizes.

## 🛠️ Software Architecture

<details>
<summary>Click to view architecture details</summary>

### Architecture Diagram

```mermaid
flowchart TD
    subgraph Presentation["Presentation Layer"]
        UI["🖌️ UI Components"]
        Nav["🧭 Navigation\n(Expo Router)"]
        Screens["📱 Screens"]
        Local["🌐 Localization\n(EN/HI)"]
    end

    subgraph StateManagement["State Management"]
        Store["📦 Zustand Store\n- User preferences\n- Location data\n- Schedule data\n- Bookmarks\n- Notification settings"]
    end

    subgraph Storage["Persistent Storage"]
        Async["💾 AsyncStorage\n- User preferences\n- Bookmarks\n- Recent searches\n- Offline data"]
    end

    subgraph DataServices["Data Services"]
        LocationSvc["📍 Campus Location\nService"]
        ScheduleSvc["📆 Schedule Service"]
    end

    subgraph ExternalSvc["External Services"]
        Maps["🗺️ Google Maps API"]
        WiFi["📡 Wi-Fi\nTriangulation"]
    end

    Presentation --> StateManagement
    StateManagement --> Storage
    StateManagement <--> DataServices
    DataServices <--> ExternalSvc
```

### Design Patterns

NaviCampus follows these core architectural principles:

1. **🧩 Component-Based Architecture**: Reusable UI components for consistent design
2. **📦 State Management with Zustand**: Centralized application state with persistence
3. **🧭 Expo Router for Navigation**: File-based routing with dynamic route parameters
4. **🔧 Service Layer Pattern**: Separation of data access and business logic
5. **📚 Repository Pattern**: Abstract data sources for easier testing and maintenance

</details>

## 💻 Tech Stack

<details>
<summary>Click to see our comprehensive tech stack</summary>

NaviCampus leverages modern technologies to ensure a smooth and responsive user experience:

### Frontend
- **⚛️ React Native**: Cross-platform mobile application framework
- **📱 Expo**: Development framework and platform for React Native
- **📘 TypeScript**: Type-safe JavaScript for better code quality
- **🧭 Expo Router**: File-based navigation system
- **📦 Zustand**: Lightweight state management
- **💾 AsyncStorage**: Persistent client-side storage

### UI/UX
- **🧩 React Native Components**: Native UI components
- **🎨 Ionicons**: Icon library for consistent design language
- **🌓 Custom Theme System**: Support for light/dark modes and accessibility

### Backend & Services (Future Implementation)
- **🔥 Firebase**: Authentication, real-time database (planned)
- **🗺️ Google Maps API**: For outdoor navigation
- **📡 Indoor Positioning System**: Wi-Fi triangulation for indoor navigation

</details>

## 📱 Project Structure

<details>
<summary>Click to view project structure</summary>

```
app/               # Expo Router for file-based routing
  _layout.tsx      # Root layout component
  index.tsx        # Home screen
  map.tsx          # Campus map screen
  schedule.tsx     # Class schedule screen
  settings.tsx     # User settings screen
  location/        # Location screens
    _layout.tsx    # Location layout
    [id].tsx       # Dynamic location detail route

src/
  assets/          # Images, icons, etc.
  components/      # Reusable UI components
  hooks/           # Custom React hooks
  screens/         # Screen components
    LocationDetailScreen.tsx
    SearchScreen.tsx
  services/        # API and data services
    campusDataService.ts
  store/           # State management
    appStore.ts
  types/           # TypeScript types
  utils/           # Utility functions
```

</details>


## 🚀 Getting Started

<details>
<summary>Click for installation and setup instructions</summary>

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (v9 or higher)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/client) app on your iOS or Android device (for testing)

### Installation

1. Clone the repository
```bash
git clone https://github.com/Rudra00codes/NaviCampus.git
cd NaviCampus
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npx expo start
```

4. Run on your device
   - Scan the QR code with Expo Go (Android) or the Camera app (iOS)
   - Or run on simulator/emulator: `npm run android` or `npm run ios`

</details>

## 📘 User Guide

<details>
<summary>Click to expand user guide</summary>

### Navigation

#### 🏠 Home Screen
The home screen provides quick access to all primary features:
- Search bar for finding locations
- Quick access buttons for Maps, Schedule, Bookmarks, and Notifications
- Features section with detailed information about app capabilities

#### 🗺️ Campus Map
The map screen allows for seamless navigation around campus:
- Toggle between indoor and outdoor navigation modes
- Search for specific locations
- View nearby locations and their distances
- Enable Wi-Fi for precise indoor positioning

#### 📅 Class Schedule
The schedule screen helps track academic commitments:
- View daily and weekly class schedules
- Navigate to classroom locations directly
- Get real-time availability information

#### ⚙️ Settings
The settings screen offers customization options:
- Switch between English and Hindi languages
- Toggle dark mode
- Adjust text size for better readability
- Manage notification preferences
- Enable accessibility features

### Search Functionality
- Use the search bar to find buildings, rooms, or facilities
- Results show detailed information including building, floor, and room number
- View recent searches for quick access to frequently visited locations

### Bookmarking
- Save frequently visited locations for quick access
- Manage bookmarks through the Bookmarks screen

</details>

## 🎯 Development Roadmap

| Phase | Features | Status |
|-------|----------|--------|
| MVP | Basic navigation, location search, campus map | ✅ Completed |
| Phase 1 | Schedule integration, bookmarking, basic settings | ✅ Completed |
| Phase 2 | Indoor navigation, multilingual support, accessibility | 🔄 In Progress |
| Phase 3 | Location-based notifications, real-time updates | 📅 Planned |
| Phase 4 | User profiles, social features, event integration | 📅 Planned |

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 📞 Contact

For questions or feedback about NaviCampus, please contact:
- Project Lead: [Your Email or Contact Information]
- GitHub Issues: Submit issues through the [GitHub repository](https://github.com/Rudra00codes/NaviCampus/issues)