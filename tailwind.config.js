module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './App.tsx'],
  theme: {
    extend: {
      colors: {
        blue: '#166FFF',
        white: '#fff',
        gray: '#eee',
        red: '#FC015B',
        green: '#1AD285',
      },
    },
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
