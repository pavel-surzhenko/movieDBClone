/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        colors: {
            darkBlue: '#032541',
            lightBlue: '#01B4E4',
            lightGreen: '#1ed5a9',
            black: '#000',
            white: '#fff',
        },
        extend: {
            fontFamily: {
                Source: ['Source Sans 3', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
