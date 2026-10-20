---
name: Solar Engineering Standard
colors:
  surface: '#fbf9f8'
  surface-dim: '#dbdad9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#e9e8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#5a4136'
  inverse-surface: '#303031'
  inverse-on-surface: '#f2f0f0'
  outline: '#8e7164'
  outline-variant: '#e2bfb0'
  surface-tint: '#a04100'
  primary: '#a04100'
  on-primary: '#ffffff'
  primary-container: '#ff6b00'
  on-primary-container: '#572000'
  inverse-primary: '#ffb693'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfde'
  on-secondary-container: '#636262'
  tertiary: '#5d5f5f'
  on-tertiary: '#ffffff'
  tertiary-container: '#989999'
  on-tertiary-container: '#2f3132'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcc'
  primary-fixed-dim: '#ffb693'
  on-primary-fixed: '#351000'
  on-primary-fixed-variant: '#7a3000'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  headline-display:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 80px
  max-width: 1280px
---

## Brand & Style

The design system is built for a premium solar energy audience, prioritizing technical authority and engineering precision over consumer-level clichés. The aesthetic is **Corporate Modern** with a lean toward **Minimalism**, emphasizing heavy whitespace and high-contrast typography to reflect the efficiency of the hardware it represents.

The brand personality is established and rigorous. It avoids decorative elements that lack functional purpose, instead using technical line art and subtle grid patterns to reinforce a sense of accuracy and data-driven performance. The goal is to evoke the feeling of a high-end architectural or aerospace firm.

## Colors

The palette is anchored by **Vibrant Orange**, used strategically for tactical highlights and conversion points. **Dark Charcoal** provides the structural weight required for technical authority, while **Light Gray** creates subtle depth for container backgrounds.

- **Primary (#FF6B00):** Used for CTA buttons, active states, progress indicators, and key data highlights.
- **Secondary (#1A1A1A):** Reserved for primary headings, navigation bars, and "Dark Mode" section overrides to convey premium engineering quality.
- **Surface Low (#F5F5F5):** Subtle background fills for sections and card containers to differentiate from the pure white base.
- **Neutral (#666666):** Used for body copy and secondary metadata to ensure high legibility without distracting from headlines.

## Typography

The typography uses **Inter** exclusively to lean into a systematic, utilitarian aesthetic. It relies on a rigorous type scale where weight and scale communicate hierarchy.

Headlines should be set with tight letter-spacing to feel "engineered" and impactful. The `label-caps` style is used for overlines, technical specifications, and metadata categories. Paragraphs should maintain generous line heights to ensure readability in data-dense layouts.

## Layout & Spacing

The design system employs a **12-column fixed grid** for desktop environments, centered with wide 80px margins to allow the content to breathe. Spacing follows an 8px rhythmic scale.

- **Desktop (1024px+):** 12 columns, 24px gutters.
- **Tablet (768px - 1023px):** 8 columns, 24px gutters, 40px margins.
- **Mobile (Up to 767px):** 4 columns, 16px gutters, 20px margins.

Use "Section Padding" (typically 120px on desktop) to separate major narrative blocks, reinforcing the premium, high-end feel through expansive whitespace.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Ambient Shadows**. 

- **Level 0 (Base):** White (#FFFFFF).
- **Level 1 (Cards/Sections):** Light Gray (#F5F5F5) or White with a 1px border (#E5E5E5).
- **Level 2 (Interactive):** Diffused shadows. Use a subtle Y-offset (4px) with high blur (12px) and low opacity (4% Black) to suggest objects resting on a surface rather than floating.

For Dark Mode sections, elevation is achieved through "Luminance Tiers"—higher elevation layers use slightly lighter shades of Charcoal.

## Shapes

The design system utilizes **Soft** roundedness (4px - 8px) to maintain a professional, architectural feel. Sharp corners are avoided to remain modern, but overly rounded "bubbly" corners are strictly prohibited to preserve the engineering aesthetic.

Buttons and small components use the 4px (`rounded`) standard, while large cards and layout containers use 12px (`rounded-xl`) to soften the large surface areas.

## Components

### Buttons
- **Primary:** Solid Orange (#FF6B00) with White text. Bold weight. 4px border radius.
- **Secondary:** Transparent with a 2px Charcoal border.
- **Technical:** Small caps text with a trailing arrow icon (→) for "Learn More" links.

### Premium Feature Cards
Feature cards should utilize a White background with a 1px #E5E5E5 border. At the top right, include a technical icon in Charcoal. Feature titles should be `headline-md`, and secondary data (like efficiency ratings or output) should be styled using the Orange primary color for emphasis.

### Horizontal Process Stepper
A progress indicator for the "Installation Path." Use a thin 1px horizontal line. Completed steps use a solid Orange dot; current steps use an Orange ring with a white center; future steps use a Light Gray dot. Labels are placed below the line using `label-caps`.

### Input Fields
Fields should be rectangular with a 1px #E5E5E5 border. On focus, the border transitions to Orange. Labels are always visible above the field in `label-caps`.

### Dark-Mode Section Variant
For high-impact project showcases, invert the palette:
- **Background:** #1A1A1A.
- **Headlines:** White.
- **Body:** #A1A1A1.
- **Cards:** #262626 with 0% shadow (rely on tonal contrast).