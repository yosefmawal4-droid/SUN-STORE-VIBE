import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../constants';

export default function Divider({ light = false, style }: { light?: boolean; style?: ViewStyle }) {
  return (
    <View style={[styles.base, light ? styles.light : styles.dark, style]} />
  );
}

const styles = StyleSheet.create({
  base:  { height: 1, width: '100%' },
  dark:  { backgroundColor: Colors.outlineVariant },
  light: { backgroundColor: 'rgba(255,255,255,0.10)' },
});
