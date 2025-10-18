module.exports = {
  content: ["./index.html", "./src/**/*.{js,html}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--ff)"],
        mono: ["var(--ff-mono)"],
      },
    },
  },
  plugins: [],
};
