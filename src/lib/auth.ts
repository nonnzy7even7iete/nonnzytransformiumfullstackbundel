import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"; // Utilisation de la version stable pour v4
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  // On ne charge l'adapter que si prisma est disponible pour éviter le crash au build
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    // Le mode JWT est le plus stable pour Next.js 15 sur Vercel
    strategy: "jwt",
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
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      const urlObj = new URL(url, baseUrl);
      if (urlObj.origin === baseUrl) return url;
      return `${baseUrl}/dashboard`;
    },
  },
  pages: {
    signIn: "/",
  },
  // Désactive le debug en production pour gagner en performance
  debug: process.env.NODE_ENV === "development",
};
