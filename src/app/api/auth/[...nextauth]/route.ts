import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Force Next.js à ignorer cette route pendant la génération statique du build
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
