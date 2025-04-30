 /** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#1a365d', // navy
          },
          secondary: {
            DEFAULT: '#10b981', // green
          },
        },
      },
    },
    plugins: [],
    corePlugins: {
      preflight: false,
    },
  }