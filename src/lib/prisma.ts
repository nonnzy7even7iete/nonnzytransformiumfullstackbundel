import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  // On récupère l'URL
  const url =
    process.env.DATABASE_URL ||
    "mongodb://unused:unused@localhost:27017/unused";

  // On utilise 'as any' pour que VS Code arrête de souligner 'datasourceUrl' en rouge
  // C'est la solution pour contourner les types qui ne sont pas à jour
  return new PrismaClient({
    datasourceUrl: url,
  } as any);
};

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
