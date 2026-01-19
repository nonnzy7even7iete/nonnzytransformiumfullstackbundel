"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";

function ThemeWatcher() {
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    // On récupère le thème actif (même si c'est 'system')
    const activeTheme = resolvedTheme || theme;

    // On définit la couleur : Noir pour Dark (#000000), Blanc pour Light (#ffffff)
    const color = activeTheme === "dark" ? "#000000" : "#ffffff";

    // On cherche si la balise existe déjà, sinon on la crée
    let metaTag = document.querySelector('meta[name="theme-color"]');
    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.setAttribute("name", "theme-color");
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute("content", color);
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
        <ThemeWatcher />{" "}
        {/* 👈 Ce composant surveille et change la barre DNS */}
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
