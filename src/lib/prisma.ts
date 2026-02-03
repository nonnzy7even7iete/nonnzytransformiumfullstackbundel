import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  const url = process.env.DATABASE_URL;

  // On passe l'URL via 'datasourceUrl' (standard Prisma 7)
  // On ajoute un log pour vérifier sur Vercel si l'URL est bien là
  if (!url) {
    console.warn("⚠️ DATABASE_URL is missing during Prisma instantiation");
  }

  return new PrismaClient({
    datasourceUrl: url,
  } as any);
};

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
