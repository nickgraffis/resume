export default {
    extract: {
        include: [
            './src/**.*',
            './index.html'
        ]
    },
    theme: {
        extends: {
            screens: {
                print: { raw: 'print' },
              },
        },
  },
    darkMode: 'class',
}