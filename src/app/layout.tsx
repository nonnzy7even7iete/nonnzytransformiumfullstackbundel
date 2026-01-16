import type { Metadata, Viewport } from "next"; // Ajout de Viewport
import { Geist, Geist_Mono } from "next/font/google";
import "./tailwind.css";
import { Providers } from "@/components/Providers";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// CETTE PARTIE S'OCCUPE UNIQUEMENT DU NAVIGATEUR
export const viewport: Viewport = {
  themeColor: "#000000", // La couleur de la barre DNS / Navigation
};

export const metadata: Metadata = {
  title: "Nonnzy App",
  description: "Application fullstack avec Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
