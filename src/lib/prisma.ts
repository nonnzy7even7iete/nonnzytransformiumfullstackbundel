import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  // On récupère l'URL ou on met une URL bidon pour le build
  const url =
    process.env.DATABASE_URL ||
    "mongodb://unused:unused@localhost:27017/unused";

  // On passe datasourceUrl explicitement. C'est CA qui manque dans ton log.
  return new PrismaClient({
    datasourceUrl: url,
  } as any);
};

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
