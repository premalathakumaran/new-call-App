

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//     content: [
//       "./index.html",
//       "./src/**/*.{js,jsx,ts,tsx}",
//     ],
//     theme: {
//       extend: {},
//     },
//     plugins: [],
//   }
  

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'phone': '480px',
        'tablet': '768px',
        'laptop': '1024px',
      },
    },
  },
  plugins: [],
};
