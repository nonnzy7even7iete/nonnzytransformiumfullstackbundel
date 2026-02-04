import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// On réutilise l'instance existante ou on en crée une nouvelle
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"], // Optionnel : pour voir ce qui se passe dans ton terminal
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
