import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { ApiException } from '../services/apiClient';
import { Colors, Layout, Spacing, Typography } from '../constants';
import { Button } from '../components';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../navigation/AuthNavigator';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Login'>;
};

export default function LoginScreen({ navigation }: Props) {
  const { login } = useAuth();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleLogin = async () => {
    setError('');

    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    try {
      await login({ email: email.trim().toLowerCase(), password });
      // Navigation handled automatically by AuthContext state change in RootNavigator
    } catch (e) {
      if (e instanceof ApiException) {
        setError(e.message);
      } else {
        setError('Unable to connect. Check your internet connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <LinearGradient
          colors={[Colors.inverseSurface, '#1a1008']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.accentStrip} />
          <Text style={styles.appName}>Sun Power</Text>
          <Text style={styles.headerSub}>تسجيل الدخول إلى حسابك</Text>
        </LinearGradient>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.label}>البريد الإلكتروني</Text>
          <TextInput
            style={styles.input}
            placeholder="example@email.com"
            placeholderTextColor={Colors.onSurfaceVariant}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
            editable={!loading}
          />

          <Text style={[styles.label, { marginTop: Spacing.md }]}>كلمة المرور</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={Colors.onSurfaceVariant}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!loading}
          />

          {/* Error */}
          {error !== '' && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <View style={{ height: Spacing.lg }} />

          <Button
            label="تسجيل الدخول"
            variant="primary"
            fullWidth
            loading={loading}
            onPress={handleLogin}
          />

          {/* Switch to Register */}
          <TouchableOpacity
            style={styles.switchRow}
            onPress={() => navigation.navigate('Register')}
            disabled={loading}
          >
            <Text style={styles.switchText}>
              ليس لديك حساب؟{' '}
              <Text style={styles.switchLink}>إنشاء حساب</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex:   { flex: 1 },
  screen: { flex: 1, backgroundColor: Colors.background },
  content: { flexGrow: 1 },

  header: {
    paddingTop: Spacing.xxl + Spacing.lg,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Layout.screenPaddingH,
  },
  accentStrip: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: 3,
    backgroundColor: Colors.primaryContainer,
  },
  appName: {
    ...Typography.headlineDisplay,
    color: Colors.white,
  },
  headerSub: {
    ...Typography.bodyMd,
    color: Colors.tertiaryFixed,
    marginTop: Spacing.xs,
  },

  form: {
    padding: Layout.screenPaddingH,
    paddingTop: Spacing.xl,
  },

  label: {
    ...(Typography.labelMd as object),
    color: Colors.onSurface,
    marginBottom: Spacing.xs,
  } as object,

  input: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: Layout.borderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 4,
    fontSize: 15,
    color: Colors.onSurface,
  },

  errorBox: {
    marginTop: Spacing.md,
    backgroundColor: Colors.errorContainer,
    borderRadius: Layout.borderRadius.sm,
    padding: Spacing.sm,
  },
  errorText: {
    ...(Typography.bodySm as object),
    color: Colors.error,
    textAlign: 'center',
  } as object,

  switchRow: {
    marginTop: Spacing.lg,
    alignItems: 'center',
  },
  switchText: {
    ...(Typography.bodyMd as object),
    color: Colors.onSurfaceVariant,
  } as object,
  switchLink: {
    color: Colors.primaryContainer,
    fontWeight: '700',
  },
});
