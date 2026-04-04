  /** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        premium: {
          900: "#050505",
          800: "#0a0a0a",
          700: "#121212",
          600: "#1a1a1a",
          500: "#222222",
        },
        cyan: {
          DEFAULT: "#00f5ff",
          glow: "rgba(0, 245, 255, 0.4)",
        },
        purple: {
          DEFAULT: "#bc13fe",
          glow: "rgba(188, 19, 254, 0.4)",
        },
        pink: {
          DEFAULT: "#ff00e5",
          glow: "rgba(255, 0, 229, 0.4)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      backgroundImage: {
        "premium-gradient": "linear-gradient(135deg, #050505 0%, #121212 100%)",
        "cyan-purple": "linear-gradient(135deg, #00f5ff 0%, #bc13fe 100%)",
        "pink-purple": "linear-gradient(135deg, #ff00e5 0%, #bc13fe 100%)",
        "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
      },
      animation: {
        "blob-float": "blob-float 20s infinite alternate cubic-bezier(0.4, 0, 0.2, 1)",
        "pulse-glow": "pulse-glow 2s infinite alternate ease-in-out",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        "blob-float": {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        "pulse-glow": {
          "0%": { opacity: "0.4", scale: "1" },
          "100%": { opacity: "0.8", scale: "1.02" },
        },
      },
      boxShadow: {
        "cyan-glow": "0 0 20px rgba(0, 245, 255, 0.3)",
        "purple-glow": "0 0 20px rgba(188, 19, 254, 0.3)",
        "pink-glow": "0 0 20px rgba(255, 0, 229, 0.3)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
    },
  },
  plugins: [],
};