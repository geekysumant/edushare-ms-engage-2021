module.exports = {
  // purge:
  purge: {
    enabled: false,
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./public/index.html",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./layout/**/*.{js,ts,jsx,tsx}",
      "./helpers/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [
      "bg-blue-500",
      "bg-green-100",
      "bg-green-200",
      "bg-green-300",
      "bg-green-400",
      "bg-green-500",
      "bg-green-600",
      "bg-red-100",
      "bg-red-200",
      "bg-red-300",
      "bg-red-400",
      "bg-red-500",
      "bg-red-600",
      "text-center",
      "hover:opacity-100",
      "lg:text-right",
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        prism: "url('/src/assets/svg/subtle-prism.svg')",
        cheese: "url('/src/assets/svg/liquid-cheese.svg')",
        tornado: "url('/src/assets/svg/tornado.svg')",
        constellation: "url('/src/assets/svg/dp_background.svg')",
        meteor: "url('/src/assets/svg/meteor.svg')",
        greencheese: "url('/src/assets/svg/greencheese.svg')",
        boxes: "url('/src/assets/svg/boxes.svg')",
        pattern: "url('/src/assets/svg/pattern.svg')",
        haikei: "url('/src/assets/svg/blurry-gradient-haikei.svg')",
      },
    },
    screens: {
      xl: { max: "1500px" },
      lg: { max: "1023px" },
      md: { max: "767px" },
      sm: { max: "639px" },
    },
    // colors: {
    //   glass: "rgb(146 151 179 / 13%)",
    // },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
