import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  // Structure maintenue : l'Adapter Prisma pour l'enregistrement en DB
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  // Le secret est lu depuis Vercel (indispensable pour chiffrer les tokens)
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Stratégie recommandée pour la stabilité sur Vercel
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Version sécurisée pour éviter le crash "Unexpected token <"
      // Si l'URL est interne, on l'autorise
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Si l'URL appartient au même domaine, on l'autorise
      try {
        const urlObj = new URL(url);
        if (urlObj.origin === baseUrl) return url;
      } catch (e) {
        // En cas d'erreur de parsing d'URL, on redirige par défaut
        return `${baseUrl}/dashboard`;
      }
      return `${baseUrl}/dashboard`;
    },
  },
  pages: {
    signIn: "/",
  },
  // Active le mode debug uniquement en local pour ne pas polluer les logs Vercel
  debug: process.env.NODE_ENV === "development",
};
