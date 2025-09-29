/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        './pages/**/*.{js,jsx}',
        './components/**/*.{js,jsx}',
        './app/**/*.{js,jsx}',
        './src/**/*.{js,jsx}',
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "var(--color-border)", // light gray
                input: "var(--color-input)", // soft gray-white
                ring: "var(--color-ring)", // deep forest green
                background: "var(--color-background)", // pure white with subtle warmth
                foreground: "var(--color-foreground)", // near-black with slight warmth
                primary: {
                    DEFAULT: "var(--color-primary)", // deep forest green
                    foreground: "var(--color-primary-foreground)", // pure white with subtle warmth
                },
                secondary: {
                    DEFAULT: "var(--color-secondary)", // warm golden yellow
                    foreground: "var(--color-secondary-foreground)", // near-black with slight warmth
                },
                destructive: {
                    DEFAULT: "var(--color-destructive)", // clear red for critical issues
                    foreground: "var(--color-destructive-foreground)", // pure white with subtle warmth
                },
                muted: {
                    DEFAULT: "var(--color-muted)", // soft gray-white
                    foreground: "var(--color-muted-foreground)", // medium gray
                },
                accent: {
                    DEFAULT: "var(--color-accent)", // earthy terracotta
                    foreground: "var(--color-accent-foreground)", // pure white with subtle warmth
                },
                popover: {
                    DEFAULT: "var(--color-popover)", // pure white with subtle warmth
                    foreground: "var(--color-popover-foreground)", // near-black with slight warmth
                },
                card: {
                    DEFAULT: "var(--color-card)", // soft gray-white
                    foreground: "var(--color-card-foreground)", // near-black with slight warmth
                },
                success: {
                    DEFAULT: "var(--color-success)", // vibrant green
                    foreground: "var(--color-success-foreground)", // pure white with subtle warmth
                },
                warning: {
                    DEFAULT: "var(--color-warning)", // amber orange
                    foreground: "var(--color-warning-foreground)", // pure white with subtle warmth
                },
                error: {
                    DEFAULT: "var(--color-error)", // clear red for critical issues
                    foreground: "var(--color-error-foreground)", // pure white with subtle warmth
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            fontSize: {
                'xs': ['0.75rem', { lineHeight: '1rem' }],
                'sm': ['0.875rem', { lineHeight: '1.25rem' }],
                'base': ['1rem', { lineHeight: '1.5rem' }],
                'lg': ['1.125rem', { lineHeight: '1.75rem' }],
                'xl': ['1.25rem', { lineHeight: '1.75rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
            },
            animation: {
                "fade-in": "fadeIn 200ms ease-out",
                "slide-in": "slideIn 200ms ease-out",
                "scale-in": "scaleIn 150ms ease-out",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideIn: {
                    "0%": { transform: "translateY(-10px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                scaleIn: {
                    "0%": { transform: "scale(0.95)", opacity: "0" },
                    "100%": { transform: "scale(1)", opacity: "1" },
                },
            },
            boxShadow: {
                'agricultural': '0 1px 3px rgba(0, 0, 0, 0.1)',
                'agricultural-lg': '0 4px 6px rgba(0, 0, 0, 0.1)',
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}