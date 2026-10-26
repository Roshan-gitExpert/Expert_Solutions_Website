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
                            emerald: {
                                        500: '#10e8a0',
                                        400: '#3ff5bb',
                                        300: '#7cffd4',
                            },
                  },
                  fontFamily: {
                            sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Arial', 'sans-serif'],
                  },
                  boxShadow: {
                            card: '0 10px 30px -12px rgba(4, 16, 31, 0.25)',
                            'glow-teal': '0 0 0 1px rgba(15, 184, 166, 0.4), 0 8px 40px -8px rgba(15, 184, 166, 0.35)',
                            'glow-amber': '0 0 0 1px rgba(245, 165, 36, 0.4), 0 8px 40px -8px rgba(245, 165, 36, 0.35)',
                            'glow-emerald': '0 0 0 1px rgba(16, 232, 160, 0.4), 0 8px 40px -8px rgba(16, 232, 160, 0.3)',
                            panel: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 50px -20px rgba(4, 16, 31, 0.6)',
                  },
                  backgroundImage: {
                            'grid-dark':
                              'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
                  },
                  backgroundSize: {
                            grid: '40px 40px',
                  },
                  borderRadius: {
                            xl2: '0.875rem',
                  },
          },
    },
    plugins: [],
};
