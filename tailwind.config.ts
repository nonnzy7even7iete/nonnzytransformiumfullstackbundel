import type { Config } from "tailwindcss";

const config: Config = {
  // Mode classe pour le contrÃ´le du Dark Mode
  darkMode: "class",

  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 1. TYPOGRAPHIE : Mix entre Geist (Sans) et Oswald (Tech)
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "sans-serif"],
        oswald: ["var(--font-oswald)", "sans-serif"],
        "mono-tech": ["var(--font-mono-tech)", "monospace"],
      },

      // 2. COULEURS SÃ‰MANTIQUES (HSL Variables)
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
      },

      // 3. EFFETS SPECIFIQUES
      backdropBlur: {
        xxl: "777px", // Ton rÃ©glage spÃ©cifique
      },

      // 4. ANIMATIONS & KEYFRAMES
      animation: {
        "card-stack": "stack-move 0.5s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
        "glow-pulse": "glow 2s ease-in-out infinite alternate",
      },

      keyframes: {
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        "stack-move": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glow: {
          "0%": { "text-shadow": "0 0 5px rgba(34, 197, 94, 0.1)" },
          "100%": {
            "text-shadow":
              "0 0 15px rgba(34, 197, 94, 0.5), 0 0 25px rgba(34, 197, 94, 0.3)",
          },
        },
      },

      // 5. RADIUS LOGIC
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
