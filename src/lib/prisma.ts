import { PrismaClient } from "@prisma/client";

// On crée une fonction pour générer le client
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// On définit le type pour TypeScript
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// On attache Prisma au scope global pour éviter d'ouvrir
// trop de connexions en mode développement
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
