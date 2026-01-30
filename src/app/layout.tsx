import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald, JetBrains_Mono } from "next/font/google";
import "./tailwind.css";
import { Providers } from "@/components/Providers";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Polices standards
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

// Polices Techniques & Machine
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-tech",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nonnzy App | Protocol 2026",
  description: "Decision Resilience Architecture",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`
          ${geistSans.variable} 
          ${oswald.variable} 
          ${jetbrainsMono.variable} 
          antialiased font-sans
        `}
      >
        <Providers>
          {children}
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
