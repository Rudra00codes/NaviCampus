import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { ExpoRoot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';
import { useEffect } from 'react';

// Keep the splash screen visible while we fetch resources
preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    // Hide the splash screen after the app is ready
    hideAsync();
  }, []);

  const ctx = require.context('./app');
  
  return (
    <SafeAreaProvider>
      <ExpoRoot context={ctx} />
    </SafeAreaProvider>
  );
}

// Keep the styles in case we need them elsewhere
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
