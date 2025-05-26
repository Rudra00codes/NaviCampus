import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../store/appStore';
import type { User } from '../store/appStore';

interface LoginFormProps {
  onSwitchToRegister: () => void;
  language: 'en' | 'hi';
  darkMode: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister, language, darkMode }) => {
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAppStore();

  const theme = {
    background: darkMode ? '#121212' : '#FFFFFF',
    surface: darkMode ? '#1E1E1E' : '#F9FAFB',
    primary: '#4F46E5',
    text: darkMode ? '#FFFFFF' : '#111827',
    textSecondary: darkMode ? '#A1A1AA' : '#6B7280',
    border: darkMode ? '#374151' : '#D1D5DB',
    error: '#EF4444',
  };

  const texts = {
    en: {
      title: 'Welcome Back',
      subtitle: 'Sign in to your NaviCampus account',
      rollNumber: 'Roll Number',
      password: 'Password',
      login: 'Sign In',
      noAccount: "Don't have an account?",
      register: 'Register',
      forgotPassword: 'Forgot Password?',
      invalidCredentials: 'Invalid roll number or password',
      fillAllFields: 'Please fill all required fields',
    },
    hi: {
      title: 'वापस स्वागत है',
      subtitle: 'अपने नेविकैंपस खाते में साइन इन करें',
      rollNumber: 'रोल नंबर',
      password: 'पासवर्ड',
      login: 'साइन इन',
      noAccount: 'कोई खाता नहीं है?',
      register: 'पंजीकरण करें',
      forgotPassword: 'पासवर्ड भूल गए?',
      invalidCredentials: 'अमान्य रोल नंबर या पासवर्ड',
      fillAllFields: 'कृपया सभी आवश्यक फ़ील्ड भरें',
    },
  };

  const t = texts[language];

  // Demo login function - in real app, this would connect to backend
  const handleLogin = async () => {
    if (!rollNumber.trim() || !password.trim()) {
      Alert.alert('Error', t.fillAllFields);
      return;
    }

    setLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Demo user data - in real app, this would come from server
      if (rollNumber.toLowerCase() === 'demo' || rollNumber === '12345') {
        const demoUser: User = {
          id: 'user_123',
          name: 'Arjun Sharma',
          rollNumber: rollNumber.toUpperCase() === 'DEMO' ? 'AUP23CSE001' : rollNumber,
          email: 'arjun.sharma@s.amity.edu',
          course: 'B.Tech',
          branch: 'Computer Science Engineering',
          semester: 6,
          year: 3,
          phone: '+91 9876543210',
          address: 'Amity University Punjab, Mohali',
          emergencyContact: {
            name: 'Rajesh Sharma',
            phone: '+91 9876543211',
            relationship: 'Father',
          },
          joinedAt: new Date('2021-08-15'),
        };
        
        login(demoUser);
      } else {
        Alert.alert('Error', t.invalidCredentials);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>{t.title}</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>{t.subtitle}</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.text }]}>{t.rollNumber}</Text>
            <View style={[styles.inputWrapper, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <Ionicons name="person-outline" size={20} color={theme.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: theme.text }]}
                value={rollNumber}
                onChangeText={setRollNumber}
                placeholder="AUP23CSE001 or 'demo'"
                placeholderTextColor={theme.textSecondary}
                autoCapitalize="characters"
                autoCorrect={false}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.text }]}>{t.password}</Text>
            <View style={[styles.inputWrapper, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <Ionicons name="lock-closed-outline" size={20} color={theme.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: theme.text }]}
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor={theme.textSecondary}
                secureTextEntry={!showPassword}
                autoCorrect={false}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons 
                  name={showPassword ? "eye-outline" : "eye-off-outline"} 
                  size={20} 
                  color={theme.textSecondary} 
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={[styles.forgotPasswordText, { color: theme.primary }]}>
              {t.forgotPassword}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginButton, { backgroundColor: theme.primary }]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.loginButtonText}>{t.login}</Text>
            )}
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={[styles.registerPrompt, { color: theme.textSecondary }]}>
              {t.noAccount}
            </Text>
            <TouchableOpacity onPress={onSwitchToRegister}>
              <Text style={[styles.registerLink, { color: theme.primary }]}>
                {t.register}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 4,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerPrompt: {
    fontSize: 14,
    marginRight: 4,
  },
  registerLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default LoginForm;
