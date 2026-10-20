import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from 'react-native';
import { Colors, Layout, Shadows, Typography } from '../constants';

type Variant = 'primary' | 'outline' | 'ghost' | 'dark';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  iconRight?: React.ReactNode;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

export default function Button({
  label,
  onPress,
  variant = 'primary',
  fullWidth = false,
  loading = false,
  disabled = false,
  iconRight,
  style,
  labelStyle,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.base,
        styles[variant],
        fullWidth && styles.fullWidth,
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? Colors.onPrimaryContainer : Colors.primaryContainer}
          size="small"
        />
      ) : (
        <View style={styles.inner}>
          <Text style={[styles.label, styles[`${variant}Label` as keyof typeof styles] as TextStyle, labelStyle]}>
            {label}
          </Text>
          {iconRight && <View style={styles.iconWrap}>{iconRight}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: Layout.borderRadius.xs,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.transparent,
    minHeight: 50,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconWrap: {
    marginLeft: 2,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.45,
  },

  // ── Variants ──
  primary: {
    backgroundColor: Colors.primaryContainer,
    borderColor: Colors.primaryContainer,
    ...Shadows.orange,
  },
  outline: {
    backgroundColor: Colors.transparent,
    borderColor: Colors.secondaryContainer,
  },
  ghost: {
    backgroundColor: Colors.transparent,
    borderColor: Colors.transparent,
  },
  dark: {
    backgroundColor: Colors.inverseSurface,
    borderColor: Colors.inverseSurface,
    ...Shadows.md,
  },

  // ── Label text ──
  label: {
    ...(Typography.labelCaps as object),
    letterSpacing: 0.9,
  } as TextStyle,
  primaryLabel: { color: Colors.onPrimaryContainer } as TextStyle,
  outlineLabel:  { color: Colors.onSurface }         as TextStyle,
  ghostLabel:    { color: Colors.primaryContainer }  as TextStyle,
  darkLabel:     { color: Colors.inverseOnSurface }  as TextStyle,
});
