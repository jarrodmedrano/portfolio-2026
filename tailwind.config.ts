import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Black & White Foundation
        white: '#ffffff',
        black: '#000000',

        // Grayscale Palette (Primary UI Colors)
        gray: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },

        // Primary = Black (for consistency with style guide)
        primary: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#000000', // Base primary color
          600: '#000000',
          700: '#000000',
          800: '#000000',
          900: '#000000',
          DEFAULT: '#000000',
        },

        // Semantic Colors (Minimal Use Only)
        success: {
          50: '#fafafa',
          100: '#f5f5f5',
          500: '#16a34a',
          700: '#15803d',
          900: '#14532d',
          DEFAULT: '#16a34a',
        },
        warning: {
          50: '#fafafa',
          100: '#f5f5f5',
          500: '#ea580c',
          700: '#c2410c',
          900: '#7c2d12',
          DEFAULT: '#ea580c',
        },
        error: {
          50: '#fafafa',
          100: '#f5f5f5',
          500: '#dc2626',
          700: '#b91c1c',
          900: '#7f1d1d',
          DEFAULT: '#dc2626',
        },
        info: {
          50: '#fafafa',
          100: '#f5f5f5',
          500: '#737373',
          700: '#404040',
          900: '#171717',
          DEFAULT: '#737373',
        },

        // Legacy support
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },

      // Border Radius (Minimalist - prefer sharp edges)
      borderRadius: {
        none: '0',
        sm: '0.125rem', // 2px - minimal
        DEFAULT: '0.25rem', // 4px - subtle
        md: '0.25rem', // 4px
        lg: '0.375rem', // 6px - reserved
        xl: '0.5rem', // 8px - rare
        '2xl': '0.75rem', // 12px - avoid
        full: '9999px', // Pills/avatars only
      },

      // Box Shadow (Subtle - prefer borders)
      boxShadow: {
        none: 'none',
        xs: '0 1px 2px rgba(0, 0, 0, 0.03)',
        sm: '0 1px 3px rgba(0, 0, 0, 0.06)',
        DEFAULT: '0 2px 4px rgba(0, 0, 0, 0.08)',
        md: '0 2px 4px rgba(0, 0, 0, 0.08)',
        lg: '0 4px 8px rgba(0, 0, 0, 0.10)',
        xl: '0 8px 16px rgba(0, 0, 0, 0.12)',
        '2xl': '0 12px 24px rgba(0, 0, 0, 0.15)',
      },

      // Spacing (Extended)
      spacing: {
        18: '4.5rem', // 72px
        22: '5.5rem', // 88px
        26: '6.5rem', // 104px
        30: '7.5rem', // 120px
      },

      // Typography
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },

      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }], // 12px
        sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
        base: ['1rem', { lineHeight: '1.5rem' }], // 16px
        lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px
        xl: ['1.25rem', { lineHeight: '1.75rem' }], // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }], // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
        '5xl': ['3rem', { lineHeight: '1' }], // 48px
        '6xl': ['3.75rem', { lineHeight: '1' }], // 60px
      },

      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },

      lineHeight: {
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
      },

      // Animation & Transitions
      transitionDuration: {
        fast: '150ms',
        DEFAULT: '200ms',
        slow: '300ms',
        slower: '500ms',
      },

      transitionTimingFunction: {
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      // Container
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
      },

      // Icon Sizes (using width/height utilities)
      width: {
        'icon-xs': '1rem', // 16px
        'icon-sm': '1.25rem', // 20px
        'icon-md': '1.5rem', // 24px
        'icon-lg': '2rem', // 32px
        'icon-xl': '2.5rem', // 40px
      },
      height: {
        'icon-xs': '1rem',
        'icon-sm': '1.25rem',
        'icon-md': '1.5rem',
        'icon-lg': '2rem',
        'icon-xl': '2.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
