import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.{js,jsx,ts,tsx}',
    ],

    darkMode: 'class',

    theme: {
        extend: {
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                border: 'hsl(var(--border))',
                'hero-subtitle': 'hsl(var(--hero-subtitle))',
                /* Rainforest green palette */
                green: {
                    50: '#dcfce7',
                    100: '#bbf7d0',
                    200: '#93c598',
                    300: '#4ade80',
                    400: '#22c55e',
                    500: '#16a34a',
                    600: '#15803d',
                    700: '#166534',
                    800: '#14532d',
                    900: '#12372a',
                },
                forest: {
                    100: '#436850',
                    200: '#12372a',
                    300: '#0e2a12',
                    400: '#071409',
                },
            },
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                serif: ['Instrument Serif', ...defaultTheme.fontFamily.serif],
                display: ['Bebas Neue', ...defaultTheme.fontFamily.sans],
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            animation: {
                'fade-in': 'fade-in 0.8s ease-out forwards',
                'fade-up': 'fade-up 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
                'fade-up-slow': 'fade-up 1s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
                'shimmer': 'shimmer 2.5s infinite linear',
                'marquee': 'marquee var(--tw-duration, 15s) infinite linear',
                'marquee-vertical': 'marquee-vertical var(--tw-duration, 15s) linear infinite',
                'bounce-slow': 'bounce-slow 2s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
                'gradient-shift': 'gradientShift 20s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'scale-in': 'scale-in 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
            },
            keyframes: {
                'fade-in': {
                    '0%': { opacity: '0', transform: 'translateY(-10px)' },
                    'to': { opacity: '1', transform: 'none' },
                },
                'fade-up': {
                    '0%': { opacity: '0', transform: 'translateY(24px)' },
                    'to': { opacity: '1', transform: 'none' },
                },
                shimmer: {
                    '0%': { 'background-position': 'calc(-100% - var(--shimmer-width, 32px)) 0' },
                    '30%': { 'background-position': 'calc(100% + var(--shimmer-width, 32px)) 0' },
                    '60%': { 'background-position': 'calc(-100% - var(--shimmer-width, 32px)) 0' },
                },
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    'to': { transform: 'translateX(calc(-100% - var(--tw-gap, 1rem)))' },
                },
                'marquee-vertical': {
                    '0%': { transform: 'translateY(0)' },
                    'to': { transform: 'translateY(calc(-100% - var(--tw-gap, 1rem)))' },
                },
                'bounce-slow': {
                    '0%, 100%': { transform: 'translateY(0)', opacity: '0.6' },
                    '50%': { transform: 'translateY(12px)', opacity: '1' },
                },
                'pulse-glow': {
                    '0%, 100%': {
                        'box-shadow': '0 0 20px 4px rgba(74, 222, 122, 0.25), 0 0 40px 8px rgba(74, 222, 122, 0.15)',
                    },
                    '50%': {
                        'box-shadow': '0 0 30px 6px rgba(74, 222, 122, 0.35), 0 0 50px 12px rgba(74, 222, 122, 0.2)',
                    },
                },
                gradientShift: {
                    '0%': { 'background-position': '0% 50%' },
                    '50%': { 'background-position': '100% 50%' },
                    '100%': { 'background-position': '0% 50%' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
                    '33%': { transform: 'translateY(-12px) rotate(1.5deg)' },
                    '66%': { transform: 'translateY(-6px) rotate(-1.5deg)' },
                },
                'scale-in': {
                    '0%': { opacity: '0', transform: 'scale(0.85) translateY(20px)' },
                    'to': { opacity: '1', transform: 'scale(1) translateY(0)' },
                },
            },
        },
    },

    plugins: [forms],
};