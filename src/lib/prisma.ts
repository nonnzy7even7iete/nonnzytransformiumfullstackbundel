import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  // On laisse Prisma gérer l'URL tout seul via le fichier schema.prisma
  // C'est la méthode la plus compatible qui évite les erreurs de "Unknown property"
  return new PrismaClient();
};

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
