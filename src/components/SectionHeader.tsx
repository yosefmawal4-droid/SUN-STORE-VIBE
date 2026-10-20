import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '../constants';

interface SectionHeaderProps {
  eyebrow?: string;
  headingId?: string;  // kept for backwards-compat, unused in RN
  heading: string;
  sub?: string;
  light?: boolean;
  noRule?: boolean;
  align?: 'center' | 'left';
}

export default function SectionHeader({
  eyebrow,
  heading,
  sub,
  light = false,
  align = 'center',
}: SectionHeaderProps) {
  const isLeft = align === 'left';

  return (
    <View style={[styles.container, isLeft && styles.containerLeft]}>
      {eyebrow && (
        <Text style={[styles.eyebrow, light && styles.eyebrowLight, isLeft && styles.textLeft]}>
          {eyebrow}
        </Text>
      )}
      <Text style={[styles.heading, light && styles.headingLight, isLeft && styles.textLeft]}>
        {heading}
      </Text>
      {sub && (
        <Text style={[styles.sub, light && styles.subLight, isLeft && styles.textLeft]}>
          {sub}
        </Text>
      )}
      <View style={[styles.rule, isLeft && styles.ruleLeft]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:     { alignItems: 'center', marginBottom: Spacing.xl },
  containerLeft: { alignItems: 'flex-start' },
  textLeft:      { textAlign: 'left' },

  eyebrow: {
    fontSize: 11,
    fontWeight: '700' as const,
    letterSpacing: 1.5,
    textTransform: 'uppercase' as const,
    color: Colors.primaryContainer,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  eyebrowLight: { color: Colors.primaryFixedDim },

  heading: {
    ...(Typography.headlineLg as object),
    color: Colors.onSurface,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  headingLight: { color: Colors.white },

  sub: {
    ...(Typography.bodyMd as object),
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    maxWidth: 320,
  },
  subLight: { color: 'rgba(255,255,255,0.75)' },

  rule:      { width: 40, height: 3, backgroundColor: Colors.primaryContainer, borderRadius: 99, marginTop: Spacing.sm },
  ruleLeft:  { alignSelf: 'flex-start' },
});
