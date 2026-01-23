import type { Config } from "tailwindcss";

const config: Config = {
  // On garde le mode classe pour le contrôle total
  darkMode: "class",

  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 1. TYPOGRAPHIE : On force l'Inter pour le look Data-Driven
      fontFamily: {
        sans: ["Inter", "var(--font-inter)", "system-ui", "sans-serif"],
      },

      // 2. COULEURS SÉMANTIQUES (Standard Shadcn + Aceternity)
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

      // 3. EFFETS GLASS ET BLUR
      backdropBlur: {
        xxl: "777px", // Ton réglage spécifique conservé
      },

      // 4. ANIMATIONS ACETERNITY & RA'AD
      animation: {
        // Pour le Card Stack si besoin de mouvement fluide
        "card-stack": "stack-move 0.5s ease-out forwards",
        // Shimmer pour des effets de brillance additionnels
        shimmer: "shimmer 2s linear infinite",
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
      },

      // 5. RADIUS LOGIC
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  // Plugin pour ajouter les variables Aceternity si nécessaire via CSS-in-JS
  plugins: [
    require("tailwindcss-animate"), // Fortement recommandé pour Shadcn
  ],
};

export default config;
