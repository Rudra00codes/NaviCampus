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
import { Picker } from '@react-native-picker/picker';
import { useAppStore } from '../store/appStore';
import type { User } from '../store/appStore';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  language: 'en' | 'hi';
  darkMode: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin, language, darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    email: '',
    phone: '',
    course: 'B.Tech',
    branch: '',
    semester: 1,
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      title: 'Create Account',
      subtitle: 'Join NaviCampus community',
      name: 'Full Name',
      rollNumber: 'Roll Number',
      email: 'Email Address',
      phone: 'Phone Number',
      course: 'Course',
      branch: 'Branch/Department',
      semester: 'Current Semester',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      register: 'Create Account',
      haveAccount: 'Already have an account?',
      signIn: 'Sign In',
      fillAllFields: 'Please fill all required fields',
      passwordMismatch: 'Passwords do not match',
      invalidEmail: 'Please enter a valid email address',
      weakPassword: 'Password must be at least 6 characters',
      invalidRollNumber: 'Please enter a valid roll number',
      registrationSuccess: 'Account created successfully!',
    },
    hi: {
      title: 'खाता बनाएं',
      subtitle: 'नेविकैंपस समुदाय में शामिल हों',
      name: 'पूरा नाम',
      rollNumber: 'रोल नंबर',
      email: 'ईमेल पता',
      phone: 'फोन नंबर',
      course: 'कोर्स',
      branch: 'शाखा/विभाग',
      semester: 'वर्तमान सेमेस्टर',
      password: 'पासवर्ड',
      confirmPassword: 'पासवर्ड की पुष्टि करें',
      register: 'खाता बनाएं',
      haveAccount: 'पहले से एक खाता है?',
      signIn: 'साइन इन',
      fillAllFields: 'कृपया सभी आवश्यक फ़ील्ड भरें',
      passwordMismatch: 'पासवर्ड मेल नहीं खाते',
      invalidEmail: 'कृपया एक वैध ईमेल पता दर्ज करें',
      weakPassword: 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए',
      invalidRollNumber: 'कृपया एक वैध रोल नंबर दर्ज करें',
      registrationSuccess: 'खाता सफलतापूर्वक बनाया गया!',
    },
  };

  const t = texts[language];

  const courses = ['B.Tech', 'M.Tech', 'BBA', 'MBA', 'B.Sc', 'M.Sc', 'BA', 'MA'];
  const branches = [
    'Computer Science Engineering',
    'Information Technology',
    'Electronics & Communication',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Biotechnology',
    'Business Administration',
    'Commerce',
    'Arts',
    'Science',
  ];

  const validateForm = () => {
    const { name, rollNumber, email, phone, branch, password, confirmPassword } = formData;
    
    if (!name.trim() || !rollNumber.trim() || !email.trim() || !phone.trim() || !branch.trim() || !password.trim()) {
      Alert.alert('Error', t.fillAllFields);
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', t.invalidEmail);
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Error', t.weakPassword);
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', t.passwordMismatch);
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create new user
      const newUser: User = {
        id: `user_${Date.now()}`,
        name: formData.name.trim(),
        rollNumber: formData.rollNumber.toUpperCase().trim(),
        email: formData.email.toLowerCase().trim(),
        course: formData.course,
        branch: formData.branch,
        semester: formData.semester,
        year: Math.ceil(formData.semester / 2),
        phone: formData.phone.trim(),
        address: 'Amity University Punjab, Mohali',
        joinedAt: new Date(),
      };
      
      Alert.alert('Success', t.registrationSuccess, [
        {
          text: 'OK',
          onPress: () => login(newUser),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
          {/* Name */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.text }]}>{t.name}</Text>
            <View style={[styles.inputWrapper, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <Ionicons name="person-outline" size={20} color={theme.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: theme.text }]}
                value={formData.name}
                onChangeText={(value) => updateFormData('name', value)}
                placeholder="John Doe"
                placeholderTextColor={theme.textSecondary}
                autoCapitalize="words"
              />
            </View>
          </View>

          {/* Roll Number */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.text }]}>{t.rollNumber}</Text>
            <View style={[styles.inputWrapper, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <Ionicons name="id-card-outline" size={20} color={theme.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: theme.text }]}
                value={formData.rollNumber}
                onChangeText={(value) => updateFormData('rollNumber', value)}
                placeholder="AUP23CSE001"
                placeholderTextColor={theme.textSecondary}
                autoCapitalize="characters"
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.text }]}>{t.email}</Text>
            <View style={[styles.inputWrapper, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <Ionicons name="mail-outline" size={20} color={theme.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: theme.text }]}
                value={formData.email}
                onChangeText={(value) => updateFormData('email', value)}
                placeholder="john.doe@s.amity.edu"
                placeholderTextColor={theme.textSecondary}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Phone */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.text }]}>{t.phone}</Text>
            <View style={[styles.inputWrapper, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <Ionicons name="call-outline" size={20} color={theme.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: theme.text }]}
                value={formData.phone}
                onChangeText={(value) => updateFormData('phone', value)}
                placeholder="+91 9876543210"
                placeholderTextColor={theme.textSecondary}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Course */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.text }]}>{t.course}</Text>
            <View style={[styles.pickerWrapper, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <Picker
                selectedValue={formData.course}
                onValueChange={(value) => updateFormData('course', value)}
                style={[styles.picker, { color: theme.text }]}
              >
                {courses.map((course) => (
                  <Picker.Item key={course} label={course} value={course} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Branch */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.text }]}>{t.branch}</Text>
            <View style={[styles.pickerWrapper, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <Picker
                selectedValue={formData.branch}
                onValueChange={(value) => updateFormData('branch', value)}
                style={[styles.picker, { color: theme.text }]}
              >
                <Picker.Item label="Select Branch" value="" />
                {branches.map((branch) => (
                  <Picker.Item key={branch} label={branch} value={branch} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Semester */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.text }]}>{t.semester}</Text>
            <View style={[styles.pickerWrapper, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <Picker
                selectedValue={formData.semester}
                onValueChange={(value) => updateFormData('semester', value)}
                style={[styles.picker, { color: theme.text }]}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <Picker.Item key={sem} label={`${sem}`} value={sem} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.text }]}>{t.password}</Text>
            <View style={[styles.inputWrapper, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <Ionicons name="lock-closed-outline" size={20} color={theme.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: theme.text }]}
                value={formData.password}
                onChangeText={(value) => updateFormData('password', value)}
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

          {/* Confirm Password */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.text }]}>{t.confirmPassword}</Text>
            <View style={[styles.inputWrapper, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <Ionicons name="lock-closed-outline" size={20} color={theme.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: theme.text }]}
                value={formData.confirmPassword}
                onChangeText={(value) => updateFormData('confirmPassword', value)}
                placeholder="••••••••"
                placeholderTextColor={theme.textSecondary}
                secureTextEntry={!showConfirmPassword}
                autoCorrect={false}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons 
                  name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} 
                  size={20} 
                  color={theme.textSecondary} 
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.registerButton, { backgroundColor: theme.primary }]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.registerButtonText}>{t.register}</Text>
            )}
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={[styles.loginPrompt, { color: theme.textSecondary }]}>
              {t.haveAccount}
            </Text>
            <TouchableOpacity onPress={onSwitchToLogin}>
              <Text style={[styles.loginLink, { color: theme.primary }]}>
                {t.signIn}
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
  pickerWrapper: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  registerButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginPrompt: {
    fontSize: 14,
    marginRight: 4,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default RegisterForm;
