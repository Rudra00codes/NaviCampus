import { Stack } from 'expo-router';
import LocationDetailScreen from '../../src/screens/LocationDetailScreen';

export default function LocationDetailsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="[id]">{() => <LocationDetailScreen />}</Stack.Screen>
    </Stack>
  );
}