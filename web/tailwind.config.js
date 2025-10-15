/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#fef2f2',
                    100: '#fee2e2',
                    200: '#fecaca',
                    300: '#fca5a5',
                    400: '#f87171',
                    500: '#E8665F',
                    600: '#dc2626',
                    700: '#b91c1c',
                    800: '#991b1b',
                    900: '#7f1d1d',
                },
                accent: {
                    coral: '#E8665F',
                    cream: '#FFF8F3',
                    beige: '#F5EDE4',
                    pink: '#FF9EC1',
                    blue: '#6FB4E8',
                    yellow: '#FFD166',
                    purple: '#9C89E8',
                },
                crypto: {
                    bitcoin: '#F7931A',
                    ethereum: '#627EEA',
                    success: '#10b981',
                    warning: '#f59e0b',
                    danger: '#ef4444',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                heading: ['Poppins', 'sans-serif'],
            },
            boxShadow: {
                'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            },
        },
    },
    plugins: [],
}
