// src/app/api/auth/[...nextauth]/route.ts
export const dynamic = "force-dynamic"; // ✅ Force Next.js à ne pas builder cette page statiquement
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
