import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import { useAppStore } from '../store/appStore';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { language, darkMode } = useAppStore();

  const theme = {
    background: darkMode ? '#121212' : '#FFFFFF',
    statusBar: darkMode ? 'light' : 'dark' as 'light' | 'dark',
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={`${theme.statusBar}-content`}
        backgroundColor={theme.background}
        translucent={Platform.OS === 'android'}
      />
      
      {isLogin ? (
        <LoginForm
          onSwitchToRegister={() => setIsLogin(false)}
          language={language}
          darkMode={darkMode}
        />
      ) : (
        <RegisterForm
          onSwitchToLogin={() => setIsLogin(true)}
          language={language}
          darkMode={darkMode}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AuthScreen;