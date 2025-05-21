# NaviCampus Integration Guide

## Map Integration

To add real map functionality to the prototype:

```powershell
# Install react-native-maps
npx expo install react-native-maps

# Add Google Maps API key to app.json (for Android)
```

Update your `app.json` with the following:

```json
{
  "expo": {
    // other configuration...
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "config": {
        "googleMaps": {
          "apiKey": "YOUR_API_KEY_HERE"  // Replace with actual API key
        }
      },
      "package": "com.yourcompany.navicampus",
      "permissions": [
        "ACCESS_COARSE_LOCATION",
        "ACCESS_FINE_LOCATION"
      ]
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.navicampus",
      "infoPlist": {
        "NSLocationWhenInUseUsageDescription": "This app uses your location to show your position on campus maps and provide indoor navigation assistance."
      }
    },
    "plugins": [
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow NaviCampus to use your location for finding your way around campus."
        }
      ]
    ]
  }
}
```

## Notifications Integration

For basic notification functionality:

```powershell
# Install notifications package
npx expo install expo-notifications
```

Add to `app.json`:

```json
{
  "expo": {
    // other configuration...
    "plugins": [
      [
        "expo-notifications",
        {
          "icon": "./assets/notification-icon.png",
          "color": "#4F46E5",
          "sounds": ["./assets/notification.wav"]
        }
      ]
    ]
  }
}
```

## Building for Demo

### Development Testing

```powershell
# Start development server
npx expo start

# Clear cache if needed
npx expo start --clear
```

### Building APK for Android Demo

```powershell
# Build APK
npx expo build:android -t apk
```

### Building IPA for iOS Demo (requires Mac)

```powershell
# Build IPA
npx expo build:ios -t archive
```
