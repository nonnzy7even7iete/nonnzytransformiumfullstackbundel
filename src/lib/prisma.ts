import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  // On force une valeur pour DATABASE_URL si elle est absente (pendant le build Vercel)
  // Prisma 7 lira cette variable automatiquement
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = "mongodb://unused:unused@localhost:27017/unused";
  }

  // CONSTRUCTEUR VIDE : Obligatoire avec Prisma 7 + prisma.config.ts
  return new PrismaClient();
};

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
