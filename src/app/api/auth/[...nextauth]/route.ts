import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "database", maxAge: 60 * 60 * 24 * 30 },
  callbacks: {
    async session({ session, user }) {
      if (session.user) session.user.id = user.id;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
  },
  pages: { signIn: "/" },
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
