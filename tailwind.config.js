module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      foreground: 'var(--geist-foreground)',
      background: 'var(--geist-background)',
    },
    extend: {
      flex: {
        2: '2 2 0%',
        3: '3 3 0%',
        4: '4 4 0%',
      },
      margin: {
        gap: 'var(--geist-gap)',
        'gap-half': 'var(--geist-gap-half)',
      },
      padding: {
        gap: 'var(--geist-gap)',
        'gap-half': 'var(--geist-gap-half)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
