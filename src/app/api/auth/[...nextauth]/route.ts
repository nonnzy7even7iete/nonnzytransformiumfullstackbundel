import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

// On vérifie si on est en phase de build (Vercel définit CI=true ou NODE_ENV=production)
// Si on n'a pas de base de données et qu'on est au build, on exporte un handler vide
const isBuildStep =
  process.env.NEXT_PHASE === "phase-production-build" ||
  !process.env.DATABASE_URL;

const handler = !isBuildStep
  ? NextAuth(authOptions)
  : () => new Response("Auth disabled during build", { status: 200 });

export { handler as GET, handler as POST };
