import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>NaviCampus</Text>
      <Text style={styles.subtitle}>Campus Navigation App</Text>
      
      <View style={styles.featureContainer}>
        <Text style={styles.sectionTitle}>Features</Text>
        
        <TouchableOpacity style={styles.featureButton}>
          <Text style={styles.featureText}>🗺️ Interactive Campus Map</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.featureButton}>
          <Text style={styles.featureText}>📅 Class Schedule</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.featureButton}>
          <Text style={styles.featureText}>📍 Location Bookmarking</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.featureButton}>
          <Text style={styles.featureText}>🔔 Real-time Notifications</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.supportContainer}>
        <Text style={styles.supportText}>Supports English & Hindi</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#64748B',
    marginBottom: 40,
  },
  featureContainer: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#334155',
  },
  featureButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureText: {
    fontSize: 16,
    color: '#334155',
  },
  supportContainer: {
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  supportText: {
    color: '#4F46E5',
    fontSize: 14,
  },
});