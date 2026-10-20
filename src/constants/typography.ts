import { TextStyle } from 'react-native';

// Sun Power type scale — mirrors Stitch / DESIGN.md spec
export const Typography: Record<string, TextStyle> = {
  // Hero / display headline
  headlineDisplay: {
    fontSize: 38,
    fontWeight: '900',
    lineHeight: 44,
    letterSpacing: -0.8,
  },
  // Large section headings
  headlineLg: {
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 32,
    letterSpacing: -0.3,
  },
  // Card / sub-section headings
  headlineMd: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
    letterSpacing: -0.1,
  },
  // Small headings inside cards
  headlineSm: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 21,
  },
  // Body large (lead text)
  bodyLg: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  // Body default
  bodyMd: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
  },
  // Body small
  bodySm: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  // Overline / caps label
  labelCaps: {
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 15,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  // Standard label
  labelMd: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
  },
};
