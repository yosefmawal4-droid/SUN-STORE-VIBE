import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './context/AuthContext';
import RootNavigator from './navigation/index';

export default function AppNative() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthProvider>
          <StatusBar style="light" />
          <RootNavigator />
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
