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
            lightBlack: 'rgba(0,0,0, 0.4)',
            lightGray: 'rgb(227,227,227)',
            pink: 'rgb(234,20,140)',
            red: 'rgb(212,2,66)',
        },
        extend: {
            fontFamily: {
                Source: ['Source Sans 3', 'sans-serif'],
            },
            boxShadow: {
                custom: '0 2px 8px rgba(0, 0, 0, 0.3)',
                radio: '0 0 0 2px #01B4E4',
            },
            backgroundImage: {
                'trending-bg': 'url(/trendingBg.svg)',
                'play-icon': 'url(/playIcon.sv)',
                'profile-bg': 'url(/profile.svg)',
            },
        },
    },
    variants: {
        extend: {
            backgroundColor: ['disabled'],
            textColor: ['disabled'],
        },
    },
    plugins: [animated],
};
