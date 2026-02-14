/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Adds custom colors to existing pallette. Now we don't have to type hex codes. Just say "gray" or "blue".
      colors: {
        blue: "#2997FF",
        offwhite: "#E9E9EC",
        offwhite2: "#dbdbdb",
        gray: {
          DEFAULT: "#86868b",
          100: "#ededed",
          200: "#dbdbdb",
          300: "#42424570",
          400: "#E8EAEC",
        },
        mwsGrey: "#d4d4d4",
        offBlack: "#333333",
        offBlack1: "#373737",
        offBlack2: "#515151",
        offBlack3: "var(--offBlack3)",
        // offBlack3: "rgba(139, 142, 144, 1)",
        // 139	142	144
        zinc: "#101010",
        threejsBlue: "hsl(0, 95, 70)",
        "blog-headerBlock": "rgba(217, 217, 217, 0.14)",
      },
      // OLD TYPE ::102124
      // fontSize: {
      //   xxs: "0.5rem",
      //   xs: "0.75rem",
      //   sm: "0.8rem",
      //   base: "1rem",
      //   lg: "1.375rem", // This is the 'entry' text in styleguide!
      //   xl: "1.75rem",
      //   "9xl": "3.88rem",
      //   h1: "var(--fs-h1)",
      //   p: "var(--fs-p)",
      //   // h4pp == PP Neue montreal website large p text, their h4
      //   h4pp: "2.1875rem",
      //   callout: "var(--fs-callout)",
      // },

      // Typography
      fontSize: {
        xxs: "0.5rem",
        xs: "0.75rem",
        sm: "0.8rem",
        base: "1rem",
        lg: "1.375rem", // This is the 'entry' text in styleguide!
        xl: "1.75rem",
        "9xl": "3.88rem",
        h1: "var(--fs-h1)",
        cap: "var(--fs-cap)",
        p: "var(--fs-p)",
        // h4pp == PP Neue montreal website large p text, their h4
        h4pp: "2.1875rem",
        callout: "var(--fs-callout)",
      },

      // LINE HEIGHT
      lineHeight: {
        h1: "var(--lh-h1)",
        cap: "var(--lh-cap)",
        p: "var(--lh-p)",
        pMobile: "var(--lh-pMobile)",
        p3: "var(--lh-p3)",
        // h4pp == PP Neue montreal website large p text, their h4
        h4pp: "1",
        callout: "var(--lh-callout2)",
        p2: "var(--lh-p2)",
      },

      // LETTER SPACING (tracking?)
      letterSpacing: {
        h1: "-0.13019rem",
        p2: "var(--ls-p2)",
      },

      // font family
      fontFamily: {
        // SUISSE FONT CAUSED SCROLLING TO BE FUCKED :(
        // Suisse: ["Suisse"],

        Helvetica: ["Helvetica-Neue"],
        SuisseWorks: ["SuisseWorks"],
        SFProDisplay: ["SFProDisplay"],
        LabMono: ["LabMono"],
        MonumentGroteskSemiMono: ["MonumentGroteskSemiMono"],
        ABCDiatypeReg: ["ABCDiatypeReg"],
        Arial: ["ArialReg"],
        ArialLightReg: ["ArialLightReg"],
        // MonumentGroteskSemiMonoThin: ["MonumentGroteskSemiMonoThin"],
      },
      // RESPONSIVE DESIGN : SCREEN SIZES
      // SEE https://tailwindcss.com/docs/responsive-design FOR DEFAULTS (sm,md,lg,xl,2xl)
      // SEE THIS SIZE FOR COMMON DEVICE WIDTHS: https://www.mydevice.io/ and https://www.icwebdesign.co.uk/common-viewport-sizes
      // md is like an iPad air. iPad pro is 1024px wide.
      screens: {
        xs: "390px", // 390px is an iPhone 12 Pro
      },
    },
  },
  plugins: [
    // POSSIBLY UNNECCESARY AS OF ::022425
    function ({ addUtilities }) {
      addUtilities({
        ".checkbox-label-checked": {
          'input[type="checkbox"]:checked ~ &': {
            color: "#94928d", // Customize this color as needed
          },
        },
      });
    },
  ],
};
