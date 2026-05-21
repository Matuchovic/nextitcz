import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        accent: {
          DEFAULT: '#4f8ef7',
          hover: '#7cb9ff',
        },
        accent2: '#7c3aed',
        accent3: '#06d6a0',
        glass: {
          DEFAULT: 'rgba(255,255,255,0.04)',
          hover: 'rgba(255,255,255,0.08)',
          border: 'rgba(255,255,255,0.08)',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #4f8ef7 0%, #7c3aed 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'scroll-marquee': 'scroll-marquee 24s linear infinite',
        'drift': 'drift 8s ease-in-out infinite',
        'fade-in': 'fade-in 0.4s ease-out',
        'slide-up': 'slide-up 0.4s ease-out',
        'blink': 'blink 2s ease-in-out infinite',
        'grow': 'grow 0.8s ease-out backwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-glow': {
          '0%, 100%': { borderColor: 'rgba(79,142,247,0.3)', boxShadow: '0 0 0 0 rgba(79,142,247,0)' },
          '50%': { borderColor: 'rgba(79,142,247,0.6)', boxShadow: '0 0 12px rgba(79,142,247,0.15)' },
        },
        'scroll-marquee': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(20px,-30px) scale(1.05)' },
          '66%': { transform: 'translate(-15px,20px) scale(0.95)' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        grow: {
          from: { transform: 'scaleY(0)', opacity: '0' },
          to: { transform: 'scaleY(1)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
