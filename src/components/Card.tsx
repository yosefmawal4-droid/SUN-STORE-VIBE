import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { Colors, Layout, Shadows, Spacing, Typography } from '../constants';

type CardVariant = 'default' | 'dark' | 'orange' | 'flat';

interface CardProps {
  title: string;
  body?: string;
  icon?: React.ReactNode;
  numberLabel?: string;   // "01", "02" … for process steps
  variant?: CardVariant;
  onPress?: () => void;
  style?: ViewStyle;
  children?: React.ReactNode;
  showAccentLine?: boolean;
}

export default function Card({
  title,
  body,
  icon,
  numberLabel,
  variant = 'default',
  onPress,
  style,
  children,
  showAccentLine = true,
}: CardProps) {
  const isDefault = variant === 'default' || variant === 'flat';
  const isDark    = variant === 'dark';
  const isOrange  = variant === 'orange';

  const container: ViewStyle[] = [
    styles.base,
    isDark   ? styles.dark   : {},
    isOrange ? styles.orange : {},
    variant === 'flat' ? styles.flat : {},
    style ?? {},
  ];

  const content = (
    <>
      {showAccentLine && !isOrange && (
        <View style={[styles.accentLine, isDark && styles.accentLineDark]} />
      )}

      {numberLabel && (
        <Text style={[styles.number, isDark && styles.numberDark]}>
          {numberLabel}
        </Text>
      )}

      {icon && <View style={styles.iconWrap}>{icon}</View>}

      <Text style={[styles.title, isDark && styles.titleDark, isOrange && styles.titleOrange]}>
        {title}
      </Text>

      {body ? (
        <Text style={[styles.body, isDark && styles.bodyDark]}>
          {body}
        </Text>
      ) : null}

      {children}
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={container}>
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={container}>{content}</View>;
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: Layout.borderRadius.md,
    padding: Layout.cardPadding,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  flat: {
    ...Shadows.sm,
    borderColor: Colors.outlineVariant,
  },
  dark: {
    backgroundColor: Colors.inverseSurface,
    borderColor: 'rgba(255,255,255,0.08)',
    ...Shadows.md,
  },
  orange: {
    backgroundColor: Colors.primaryContainer,
    borderColor: Colors.primaryContainer,
    ...Shadows.orange,
  },

  accentLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: Colors.primaryContainer,
  },
  accentLineDark: {
    backgroundColor: Colors.primaryContainer,
    opacity: 0.7,
  },

  number: {
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 36,
    color: Colors.primaryFixedDim,
    marginBottom: Spacing.xs,
    letterSpacing: -0.5,
  } as object,
  numberDark: {
    color: Colors.primaryContainer,
  },

  iconWrap: {
    marginBottom: Spacing.sm,
  },

  title: {
    ...(Typography.headlineSm as object),
    color: Colors.onSurface,
    marginBottom: Spacing.xs,
  } as object,
  titleDark:   { color: Colors.white },
  titleOrange: { color: Colors.onPrimaryContainer },

  body: {
    ...(Typography.bodyMd as object),
    color: Colors.onSurfaceVariant,
  } as object,
  bodyDark: { color: 'rgba(255,255,255,0.70)' },
});

// Re-export Spacing so screens can use it from one import
export { Spacing };
