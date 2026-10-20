// 8-pt base grid spacing system
export const Spacing = {
  xs:   4,
  sm:   8,
  md:   16,
  lg:   24,
  xl:   32,
  xxl:  48,
  xxxl: 64,
} as const;

export const Layout = {
  screenPaddingH:  20,
  screenPaddingV:  24,
  sectionPaddingV: 52,
  cardPadding:     18,
  borderRadius: {
    xs:   4,
    sm:   8,
    md:   12,
    lg:   16,
    xl:   24,
    full: 9999,
  },
} as const;

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.09,
    shadowRadius: 10,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 7,
  },
  orange: {
    shadowColor: '#ff6b00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.38,
    shadowRadius: 14,
    elevation: 6,
  },
} as const;
