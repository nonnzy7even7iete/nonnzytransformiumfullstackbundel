"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark" // 👈 On remet le Dark par défaut
        enableSystem={true}
        enableColorScheme={true} // 👈 Gère la couleur de la barre DNS/Système
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
