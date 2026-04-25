---
name: Academic Conservatory
colors:
  surface: '#fff7f9'
  surface-dim: '#e0d8da'
  surface-bright: '#fff7f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#faf1f4'
  surface-container: '#f4ecee'
  surface-container-high: '#eee6e8'
  surface-container-highest: '#e9e0e3'
  on-surface: '#1e1b1c'
  on-surface-variant: '#4f4448'
  inverse-surface: '#332f31'
  inverse-on-surface: '#f7eff1'
  outline: '#817478'
  outline-variant: '#d2c3c7'
  surface-tint: '#795465'
  primary: '#795465'
  on-primary: '#ffffff'
  primary-container: '#f8c8dc'
  on-primary-container: '#765162'
  inverse-primary: '#e9bacd'
  secondary: '#6c5964'
  on-secondary: '#ffffff'
  secondary-container: '#f2d9e6'
  on-secondary-container: '#705d68'
  tertiary: '#6c5962'
  on-tertiary: '#ffffff'
  tertiary-container: '#e7ced9'
  on-tertiary-container: '#695660'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd8e7'
  primary-fixed-dim: '#e9bacd'
  on-primary-fixed: '#2e1221'
  on-primary-fixed-variant: '#5f3c4d'
  secondary-fixed: '#f5dce9'
  secondary-fixed-dim: '#d8c0cd'
  on-secondary-fixed: '#251720'
  on-secondary-fixed-variant: '#53424c'
  tertiary-fixed: '#f5dce7'
  tertiary-fixed-dim: '#d8c0cb'
  on-tertiary-fixed: '#25171f'
  on-tertiary-fixed-variant: '#53424b'
  background: '#fff7f9'
  on-background: '#1e1b1c'
  surface-variant: '#e9e0e3'
typography:
  headline-lg:
    fontFamily: Lexend
    fontSize: 40px
    fontWeight: '300'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Lexend
    fontSize: 28px
    fontWeight: '400'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Lexend
    fontSize: 20px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0em
  body-lg:
    fontFamily: Lexend
    fontSize: 18px
    fontWeight: '300'
    lineHeight: '1.6'
    letterSpacing: 0em
  body-md:
    fontFamily: Lexend
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  label-lg:
    fontFamily: Lexend
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Lexend
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  gutter: 24px
  margin: 32px
---

## Brand & Style

This design system embodies the disciplined elegance of a classical music conservatory. The aesthetic is rooted in **Minimalism** with a heavy emphasis on whitespace and rhythmic structural alignment, much like a clean sheet of music. 

The target audience consists of students, educators, and professionals who value clarity, focus, and a sophisticated atmosphere. The visual style is professional and academic, avoiding all vibrant or aggressive tones in favor of a monochromatic-adjacent pastel palette. To mirror classical notation, the interface uses thin lines, precise spacing, and a "paper-like" tactile quality that feels both historic and modern.

## Colors

The palette is strictly limited to soft pink pastels and subtle dark accents to maintain an air of calm authority.

- **Primary Pink (#F8C8DC):** Used for key brand moments and active states. It should feel integrated, never jarring.
- **Surface Tones:** A range of light pinks (ranging from #FFF5F8 to #FDF0F5) creates a layered, "vellum" effect, distinguishing content areas without high-contrast borders.
- **Subtle Dark Accents (#332F31):** Rather than pure black, a warm, charcoal-tinted dark is used for text and iconography to mimic the ink of a printed score while maintaining readability.
- **Functional States:** Success and error states should be handled through iconography or weight changes rather than introducing non-pastel greens or reds.

## Typography

Lexend is utilized for its exceptional legibility and geometric clarity. In this design system, typography follows the logic of musical dynamics:

- **Weight as Emphasis:** Use lighter weights (300) for large headlines to evoke grace, and medium weights (500-600) for labels and navigation to mimic the boldness of musical directives (p, mf, f).
- **Leading:** Generous line-heights are required to ensure the "stave" of text has room to breathe.
- **Letter Spacing:** Small labels and headers use slight tracking increases to emphasize the academic, formal nature of the content.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** system, providing a structured, sheet-music-like container for all information. 

- **The Stave Rhythm:** Use a 12-column grid for desktop with 24px gutters. Vertically, all elements must align to a 4px baseline grid to maintain a rigorous academic structure.
- **Whitespace:** Emphasize "silence" in the layout. Use `xl` (48px) spacing between major sections to prevent visual clutter and ensure the soft palette doesn't become muddy.
- **Margins:** Page margins should be generous (32px minimum), framing the content like a published manuscript.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Low-Contrast Outlines** rather than aggressive shadows. 

- **Surface Tiering:** Use subtle shifts in pink saturation to indicate depth. The background is the lightest, with interactive cards being slightly more saturated.
- **Borders:** Instead of shadows, use 1px solid borders in a slightly darker pink (#EAD1DC) or very low-opacity charcoal. This mimics the thin lines of a musical staff.
- **Shadows:** When necessary for high-priority modals, use a single, extremely diffused ambient shadow with a pink tint: `0 10px 30px -10px rgba(248, 200, 220, 0.5)`.

## Shapes

The shape language is **Soft**, reflecting the precision of classical instruments. 

- **Corners:** A standard 0.25rem (4px) radius is applied to buttons and inputs. This provides a professional, "clipped" look that is softer than sharp brutalism but more serious than bubbly, highly-rounded systems.
- **Dividers:** Horizontal and vertical lines should be thin (1px) and use the subtle dark accent at 10-20% opacity.

## Components

- **Buttons:** Primary buttons use a solid #F8C8DC background with dark #332F31 text. Ghost buttons use a 1px border. Interactions should be subtle, such as a slight darken on hover.
- **Inputs:** Form fields are styled as simple underlined rows or light-pink filled boxes with a 1px bottom border, mimicking a ledger line.
- **Cards:** Cards should have no shadow, utilizing a 1px border (#EAD1DC) and a slightly darker surface color than the background.
- **Chips/Labels:** Small, all-caps Lexend text with increased tracking. Use these for categorization (e.g., "SONATA", "THEORY").
- **Lists:** Items should be separated by thin dividers. Use custom bullet points that resemble musical dots or note heads for a thematic touch.
- **Progress Indicators:** Use thin, horizontal bars that fill with the primary pink, resembling a playback bar in a digital audio workstation (DAW) or a musical phrase marker.