/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./screens/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'pulse-glow': 'pulse-glow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                'pulse-glow': {
                    '0%, 100%': { opacity: 0.5 },
                    '50%': { opacity: 0.2 },
                }
            }
        },
    },
    plugins: [],
}
