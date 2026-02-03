import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  const url = process.env.DATABASE_URL;

  // Si l'URL est absente (pendant le build), on met une URL bidon
  // pour que le constructeur ne soit jamais vide.
  const effectiveUrl = url || "mongodb://build:timeout@localhost:27017/db";

  return new PrismaClient({
    // @ts-ignore - On utilise datasourceUrl pour Prisma 7
    datasourceUrl: effectiveUrl,
    // On force l'objet pour éviter l'erreur "non-empty options"
    __internal: {
      useConfig: true,
    },
  } as any);
};

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
