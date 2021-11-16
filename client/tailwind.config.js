module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
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
      },
    },
    // screens: {
    //   xl: { max: "1279px" },
    //   lg: { max: "1023px" },
    //   md: { max: "767px" },
    //   sm: { max: "639px" },
    // },
    // colors: {
    //   glass: "rgb(146 151 179 / 13%)",
    // },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
