/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '320px',
        sm: '375px',
        sml: '500px',
        md: '667px',
        mdl: '768px',
        lg: '960px',
        lgl: '1024px',
        xl: '1280px'
      },
      colors: {
        red: '#e52e06',
        dark: {
          20: '#888888',
          40: '#444'
        },

        light: {},

        text: {
          main: '#323232',
          sub: '#444444',
          gray: '#7e7e7e'
        }
      },
      boxShadow: {
        menu: '0 0 60px 50px rgba(0, 0, 0, 0.3)',
        arround: '0 5px 30px 5px rgba(0, 0, 0, 0.3)'
      },

      fontSize: {
        15: '15px'
      }
    }
  },
  plugins: []
};
