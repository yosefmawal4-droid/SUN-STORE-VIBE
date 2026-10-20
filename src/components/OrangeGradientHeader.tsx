import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Layout, Spacing, Typography } from '../constants';

/**
 * Reusable dark gradient header bar used at the top of each screen.
 * Keeps the brand identity consistent across all screens.
 */
interface OrangeGradientHeaderProps {
  title: string;
  subtitle?: string;
  style?: ViewStyle;
}

export default function OrangeGradientHeader({
  title,
  subtitle,
  style,
}: OrangeGradientHeaderProps) {
  return (
    <LinearGradient
      colors={[Colors.inverseSurface, '#1a1008']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, style]}
    >
      {/* Orange accent strip */}
      <View style={styles.accentStrip} />

      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Layout.screenPaddingH,
    position: 'relative',
    overflow: 'hidden',
  },
  accentStrip: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: Colors.primaryContainer,
  },
  title: {
    ...Typography.headlineDisplay,
    color: Colors.white,
    marginTop: Spacing.xs,
  },
  subtitle: {
    ...Typography.bodyMd,
    color: Colors.tertiaryFixed,
    marginTop: Spacing.sm,
    lineHeight: 22,
  },
});
