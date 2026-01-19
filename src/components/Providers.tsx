"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";

function ThemeWatcher() {
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    // On récupère le thème actif (calculé par next-themes)
    const activeTheme = resolvedTheme || theme;

    // Définition de la couleur pour la barre DNS / Status Bar
    // Noir (#000000) en Dark, Blanc (#ffffff) en Light
    const color = activeTheme === "dark" ? "#000000" : "#ffffff";

    // Mise à jour de la balise méta theme-color
    let metaTag = document.querySelector('meta[name="theme-color"]');
    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.setAttribute("name", "theme-color");
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute("content", color);

    // 💡 Optionnel mais crucial pour certains navigateurs mobiles (Safari/Chrome) :
    // On synchronise aussi la couleur de fond du HTML pour éviter les bordures DNS résiduelles
    document.documentElement.style.setProperty(
      "color-scheme",
      activeTheme === "dark" ? "dark" : "light"
    );
  }, [theme, resolvedTheme]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={true}
        enableColorScheme={true}
      >
        <ThemeWatcher />
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
