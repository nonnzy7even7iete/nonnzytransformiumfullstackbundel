import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  // On s'assure que l'URL est bien dans l'environnement avant l'instanciation
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = "mongodb://unused:unused@localhost:27017/unused";
  }

  // ON NE MET RIEN DANS LE CONSTRUCTEUR
  // Prisma 7 va lire tout seul le fichier prisma.config.ts
  return new PrismaClient();
};

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
