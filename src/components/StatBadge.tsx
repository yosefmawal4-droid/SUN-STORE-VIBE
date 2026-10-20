import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Layout, Shadows, Spacing, Typography } from '../constants';

interface StatBadgeProps {
  target: number;
  suffix?: string;
  label: string;
}

/** Animated count-up stat tile. Uses only React Native Animated-compatible
 *  requestAnimationFrame — works in Expo Go SDK 54 without any extra libs. */
export default function StatBadge({ target, suffix = '', label }: StatBadgeProps) {
  const [displayed, setDisplayed] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const duration  = target > 500 ? 1600 : 900;
    const startTime = Date.now();

    const tick = () => {
      const elapsed  = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplayed(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [target]);

  return (
    <View style={styles.container}>
      <View style={styles.accentTop} />
      <Text style={styles.value}>
        {displayed.toLocaleString()}
        <Text style={styles.suffix}>{suffix}</Text>
      </Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: Layout.borderRadius.md,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  accentTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: Colors.primaryContainer,
  },
  value: {
    fontSize: 30,
    fontWeight: '800',
    color: Colors.primaryContainer,
    lineHeight: 36,
    letterSpacing: -0.4,
  },
  suffix: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primaryContainer,
  },
  label: {
    ...(Typography.labelCaps as object),
    color: Colors.onSurfaceVariant,
    marginTop: Spacing.xs,
    textAlign: 'center',
  } as object,
});
