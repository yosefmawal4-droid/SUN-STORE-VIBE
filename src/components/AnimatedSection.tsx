import React, { useRef, useEffect, ReactNode } from 'react';
import { Animated, ViewStyle } from 'react-native';

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;       // ms before animation starts
  duration?: number;    // ms for the animation
  fromY?: number;       // starting Y offset (px)
  style?: ViewStyle;
}

/**
 * Fades in and slides up when mounted.
 * Uses only React Native's built-in Animated API —
 * fully compatible with Expo Go SDK 54.
 */
export default function AnimatedSection({
  children,
  delay = 0,
  duration = 500,
  fromY = 24,
  style,
}: AnimatedSectionProps) {
  const opacity   = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(fromY)).current;

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ]);
    animation.start();
    return () => animation.stop();
  }, [delay, duration, opacity, translateY]);

  return (
    <Animated.View
      style={[
        { opacity, transform: [{ translateY }] },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
}
