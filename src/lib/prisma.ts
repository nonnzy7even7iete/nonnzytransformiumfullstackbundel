import { PrismaClient } from "@prisma/client";

// Cette ligne règle le problème du build : si l'URL est vide,
// on met n'importe quoi pour que Prisma ne râle pas.
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "mongodb://localhost:27017/unused";
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
