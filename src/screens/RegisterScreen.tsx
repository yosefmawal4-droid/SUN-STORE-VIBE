import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
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
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Register'>;
};

export default function RegisterScreen({ navigation }: Props) {
  const { register } = useAuth();

  const [fullName,  setFullName]  = useState('');
  const [email,     setEmail]     = useState('');
  const [password,  setPassword]  = useState('');
  const [success,   setSuccess]   = useState(false);
  const [error,     setError]     = useState('');
  const [loading,   setLoading]   = useState(false);

  const handleRegister = async () => {
    setError('');
    setSuccess(false);

    if (!fullName.trim() || !email.trim() || !password) {
      setError('يرجى ملء جميع الحقول.');
      return;
    }

    setLoading(true);
    try {
      await register({
        fullName: fullName.trim(),
        email:    email.trim().toLowerCase(),
        password,
      });
      setSuccess(true);
      // Auto-navigate to login after short delay
      setTimeout(() => navigation.navigate('Login'), 1500);
    } catch (e) {
      if (e instanceof ApiException) {
        setError(e.message);
      } else {
        setError('تعذّر الاتصال. تحقق من الاتصال بالإنترنت.');
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
          <Text style={styles.headerSub}>إنشاء حساب جديد</Text>
        </LinearGradient>

        {/* Form */}
        <View style={styles.form}>

          <Text style={styles.label}>الاسم الكامل</Text>
          <TextInput
            style={styles.input}
            placeholder="محمد أحمد"
            placeholderTextColor={Colors.onSurfaceVariant}
            autoCapitalize="words"
            value={fullName}
            onChangeText={setFullName}
            editable={!loading}
          />

          <Text style={[styles.label, { marginTop: Spacing.md }]}>البريد الإلكتروني</Text>
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
            placeholder="8 أحرف على الأقل، كبير وصغير ورقم ورمز"
            placeholderTextColor={Colors.onSurfaceVariant}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!loading}
          />
          <Text style={styles.hint}>
            يجب أن تحتوي على: حرف كبير، حرف صغير، رقم، ورمز خاص.
          </Text>

          {/* Error */}
          {error !== '' && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {/* Success */}
          {success && (
            <View style={styles.successBox}>
              <Text style={styles.successText}>
                ✅ تم إنشاء الحساب بنجاح! جارٍ التحويل...
              </Text>
            </View>
          )}

          <View style={{ height: Spacing.lg }} />

          <Button
            label="إنشاء الحساب"
            variant="primary"
            fullWidth
            loading={loading}
            onPress={handleRegister}
          />

          {/* Switch to Login */}
          <TouchableOpacity
            style={styles.switchRow}
            onPress={() => navigation.navigate('Login')}
            disabled={loading}
          >
            <Text style={styles.switchText}>
              لديك حساب بالفعل؟{' '}
              <Text style={styles.switchLink}>تسجيل الدخول</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex:    { flex: 1 },
  screen:  { flex: 1, backgroundColor: Colors.background },
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

  hint: {
    ...(Typography.bodySm as object),
    color: Colors.onSurfaceVariant,
    marginTop: 4,
  } as object,

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

  successBox: {
    marginTop: Spacing.md,
    backgroundColor: '#d4edda',
    borderRadius: Layout.borderRadius.sm,
    padding: Spacing.sm,
  },
  successText: {
    ...(Typography.bodySm as object),
    color: '#155724',
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
