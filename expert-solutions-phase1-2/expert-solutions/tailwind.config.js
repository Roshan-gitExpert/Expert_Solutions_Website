/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef3fa',
          100: '#d4e0ef',
          200: '#a8bfdd',
          300: '#7396c4',
          400: '#3f72ab',
          500: '#1a5296',
          600: '#144379',
          700: '#0f3560',
          800: '#0b2647',
          900: '#071b33',
          950: '#04101f',
        },
        teal: {
          500: '#0fb8a6',
          400: '#22cdb8',
          300: '#5fdfd0',
        },
        amber: {
          500: '#f5a524',
          400: '#f7b84f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(4, 16, 31, 0.25)',
      },
    },
  },
  plugins: [],
};
