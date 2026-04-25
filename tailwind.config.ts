import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Design system — Academic Conservatory
        'ds-bg':                    '#fff7f9',
        'ds-surface':               '#fdf6f9',
        'ds-surface-low':           '#faf1f4',
        'ds-surface-container':     '#f4ecee',
        'ds-surface-high':          '#eee6e8',
        'ds-surface-highest':       '#e9e0e3',
        'ds-on-surface':            '#1e1b1c',
        'ds-on-surface-variant':    '#4f4448',
        'ds-inverse-surface':       '#332f31',
        'ds-primary':               '#795465',
        'ds-primary-container':     '#f8c8dc',
        'ds-border':                '#ead1dc',
        'ds-outline-variant':       '#d2c3c7',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      spacing: {
        xs:     '4px',
        sm:     '8px',
        md:     '16px',
        lg:     '24px',
        xl:     '48px',
        gutter: '24px',
        margin: '32px',
      },
      fontFamily: {
        lexend: ['var(--font-lexend)', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
