/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#2C3E50",
                secondary: "#E74C3C",
                accent: "#3498DB",
                neutral: "#ECF0F1",
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                display: ["Playfair Display", "serif"],
            },
        },
    },
    plugins: [],
};
