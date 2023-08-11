/** @type {import('tailwindcss').Config} */
import animated from 'tailwindcss-animated';

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        colors: {
            darkBlue: '#0d253f',
            lightBlue: '#01B4E4',
            lightGreen: '#1ed5a9',
            black: '#000',
            white: '#fff',
        },
        extend: {
            fontFamily: {
                Source: ['Source Sans 3', 'sans-serif'],
            },
            dropShadow: {
                custom: '0 2px 8px rgba(0, 0, 0, 0.1)',
            },
            backgroundImage: {
                'trending-bg': 'url(/trendingBg.svg)',
                'play-icon': 'url(/playIcon.sv)',
            },
        },
    },
    plugins: [animated],
};
