module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    container: {
      center: true,
    },
    extend: {
      backgroundImage: (theme) => ({
        'hero-image':
          "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80')",
      }),
      colors: {
        'gray-main': '#777777',
      },
      boxShadow: {
        yellow: '0 4px 12px 0 rgba(245, 158, 11, 50%)',
        slight:
          '0 8px 15px -3px rgba(0, 0, 0, 0.1), 0 2px 6px -2px rgba(0, 0, 0, 0.01)',
      },
      dropShadow: {
        lightning: '0 2px 6px rgba(245, 158, 11, 50%)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
