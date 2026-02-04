import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Cette ligne est cruciale pour que Vercel ne crash pas au build
export const dynamic = "force-dynamic";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
