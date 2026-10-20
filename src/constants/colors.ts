// Sun Power — Brand Color Tokens (mirrors the web design system exactly)
export const Colors = {
  // ── Primary / Orange brand ──
  primary:              '#a04100',
  primaryContainer:     '#ff6b00',
  onPrimary:            '#ffffff',
  onPrimaryContainer:   '#572000',
  primaryFixed:         '#ffdbcc',
  primaryFixedDim:      '#ffb693',
  surfaceTint:          '#a04100',

  // ── Secondary ──
  secondary:            '#5f5e5e',
  onSecondary:          '#ffffff',
  secondaryContainer:   '#e2dfde',
  onSecondaryContainer: '#636262',
  secondaryFixedDim:    '#c8c6c5',

  // ── Tertiary ──
  tertiary:             '#5d5f5f',
  onTertiary:           '#ffffff',
  tertiaryContainer:    '#989999',
  tertiaryFixed:        '#e2e2e2',
  tertiaryFixedDim:     '#c6c6c7',

  // ── Surface scale (warm off-white) ──
  background:              '#fbf9f8',
  surface:                 '#fbf9f8',
  onBackground:            '#1b1c1c',
  onSurface:               '#1b1c1c',
  surfaceVariant:          '#e4e2e2',
  onSurfaceVariant:        '#5a4136',
  surfaceDim:              '#dbdad9',
  surfaceContainerLowest:  '#ffffff',
  surfaceContainerLow:     '#f5f3f3',
  surfaceContainer:        '#efeded',
  surfaceContainerHigh:    '#e9e8e7',
  surfaceContainerHighest: '#e4e2e2',

  // ── Inverse (dark sections) ──
  inverseSurface:    '#303031',
  inverseOnSurface:  '#f2f0f0',
  inversePrimary:    '#ffb693',

  // ── Outline ──
  outline:        '#8e7164',
  outlineVariant: '#e2bfb0',

  // ── Error ──
  error:          '#ba1a1a',
  errorContainer: '#ffdad6',
  onError:        '#ffffff',

  // ── Semantic helpers ──
  white:       '#ffffff',
  black:       '#000000',
  transparent: 'transparent',

  // Glow colours for shadows
  orangeGlow:   'rgba(255,107,0,0.28)',
  orangeGlowMd: 'rgba(255,107,0,0.42)',
} as const;

export type ColorKey = keyof typeof Colors;
