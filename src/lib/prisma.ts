import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  // 1. On crée le client totalement VIDE pour satisfaire le validateur
  const client = new PrismaClient();

  // 2. On injecte l'URL de force dans la propriété interne utilisée par Prisma
  // Cela permet de passer outre la validation du constructeur
  const url = process.env.DATABASE_URL;
  if (url) {
    (client as any)._datasourceUrl = url;
  }

  return client;
};

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
