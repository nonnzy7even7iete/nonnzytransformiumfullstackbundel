import type { Config } from "tailwindcss";

const config: Config = {
  // 1. On active la détection par classe pour ne rien casser par défaut
  darkMode: "class",

  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        xxl: "777px", // Votre réglage spécifique est conservé ici
      },
      // Ici, on pourrait ajouter des couleurs sémantiques plus tard
      // si vous voulez éviter de répéter "zinc-900" partout.
    },
  },
  plugins: [],
};

export default config;
