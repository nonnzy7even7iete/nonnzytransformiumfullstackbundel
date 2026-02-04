import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

// Utilise l'instance existante ou en crée une nouvelle
export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// En développement, on stocke l'instance dans le global pour éviter d'ouvrir
// trop de connexions à chaque "Hot Reload" de Next.js
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
