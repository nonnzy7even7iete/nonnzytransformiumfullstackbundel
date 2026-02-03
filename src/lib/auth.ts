import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma"; // Importe l'instance unique qu'on a créée

export const authOptions: NextAuthOptions = {
  // On utilise l'instance Singleton pour ne pas saturer MongoDB Atlas
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "database", // MongoDB stockera les sessions dans la collection 'Session'
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },
  callbacks: {
    async session({ session, user }) {
      // Transfert de l'ID MongoDB vers la session frontend
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    async redirect({ baseUrl }) {
      // Redirection après login réussi
      return `${baseUrl}/dashboard`;
    },
  },
  pages: {
    signIn: "/", // Page de login personnalisée
  },
  // Utile pour débugger les erreurs de redirection Google en dev
  debug: process.env.NODE_ENV === "development",
};
