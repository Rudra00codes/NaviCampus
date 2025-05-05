# NaviCampus

## Campus Navigation App for Educational Institutions

NaviCampus is a cross-platform mobile application (Android and iOS) offering comprehensive indoor and outdoor navigation services within Indian university and college campuses.

### Key Features

- **Real-Time Room Search**: Intuitive search functionality for classrooms, labs, offices, and other campus facilities.
- **Indoor Navigation**: Precise indoor navigation using a combination of Google Maps API for outdoor areas and Wi-Fi triangulation for indoor positioning.
- **Integrated Scheduling**: Integration with university academic schedules to provide real-time room availability and booking information.
- **Multilingual Support**: Support for English and Hindi to cater to India's diverse student population.
- **Location-Based Notifications**: Context-aware notifications for class reminders, campus events, and emergency alerts.
- **Accessibility Features**: Adherence to accessibility standards to ensure usability for students with disabilities.

### Target Users

- Students
- Faculty
- Administrative staff
- Visitors
- Prospective students on Indian educational campuses

### Tech Stack

NaviCampus is built using modern technologies to ensure a smooth and responsive user experience:

- React Native & Expo
- TypeScript
- Expo Router for Navigation
- Zustand for State Management
- AsyncStorage for Persistence

### Project Structure

```
app/               # Expo Router for file-based routing
  _layout.tsx      # Root layout component
  index.tsx        # Home screen
  location/        # Location screens
    _layout.tsx    # Location layout
    [id].tsx       # Dynamic location detail route
src/
  assets/          # Images, icons, etc.
  components/      # Reusable UI components
  hooks/           # Custom React hooks
  screens/         # Screen components
  services/        # API and data services
  store/           # State management
  types/           # TypeScript types
  utils/           # Utility functions
```

### Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/NaviCampus.git
cd NaviCampus
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Run on Android or iOS
```bash
npm run android
# or
npm run ios
```

### Objectives and Goals

- Develop a user-friendly navigation system for locating campus facilities
- Reduce the average time students spend searching for rooms by 30% within the first year of implementation
- Seamlessly integrate with existing academic scheduling systems to display real-time room availability

### Contributors

- Your Name

### License

This project is licensed under the MIT License - see the LICENSE file for details.