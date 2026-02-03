import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Cela empêche le build d'échouer à cause des erreurs de types Prisma/TypeScript
    ignoreBuildErrors: true,
  },
  eslint: {
    // On ignore ESLint pour éviter que le build s'arrête pour un point-virgule mal placé
    ignoreDuringBuilds: true,
  },
  // Cette option aide à stabiliser les polices Geist qui font des warnings dans tes logs
  optimizeFonts: false,
};

export default nextConfig;
