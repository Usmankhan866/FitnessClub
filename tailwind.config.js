 const config = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}", // Updated to only include .js and .jsx
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        xsm: "375px",
        sm: "450px",
        md: "540px",
        lg: "620px",
        xl: "800px",
        "2xl": "1000px",
        "3xl": "1200px",
      },
    },
    extend: {
      height: {
        screen: "100dvh",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#ff0336", // Your custom red color
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#323232", // Your gray-500
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#2b2b2b", // Your gray-550
          foreground: "#a1a1a1", // Your gray-200
        },
        accent: {
          DEFAULT: "#ff0336", // Your custom red color
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#323232", // Your gray-500
          foreground: "#000000", // Your gray-600 (black)
        },
        card: {
          DEFAULT: "#ffffff", // White for light theme
          foreground: "#000000", // Your gray-600 (black)
        },
        // Your custom color palette
        transparent: "transparent",
        white: "#ffffff",
        red: "#ff0336",
        gray: {
          50: "#efefef",
          100: "#dedede",
          150: "#b4b4b4",
          200: "#a1a1a1",
          250: "#7e7e7e",
          300: "#6d6d6d",
          350: "#646464",
          400: "#595959",
          450: "#3f3f3f",
          500: "#323232",
          550: "#2b2b2b",
          600: "#000000",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float1: "float1 3s infinite linear",
        float2: "float2 3.5s infinite linear",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float1: {
          "0%": {
            transform: "rotate(0deg) translate3d(10px, 0, 0) rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg) translate3d(10px, 0, 0) rotate(-360deg)",
          },
        },
        float2: {
          "0%": {
            transform: "rotate(0deg) translate3d(10px, 0, 0) rotate(0deg)",
          },
          "100%": {
            transform: "rotate(-360deg) translate3d(10px, 0, 0) rotate(360deg)",
          },
        },
      },
    },
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
    },
    fontWeight: {
      thin: "100",
      regular: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    screens: {
      xsm: "375px",
      sm: "450px",
      md: "540px",
      lg: "620px",
      xl: "800px",
      "2xl": "1000px",
      "3xl": "1200px",
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
