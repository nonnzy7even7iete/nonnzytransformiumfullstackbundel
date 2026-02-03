import { PrismaClient } from "@prisma/client";

// On garantit à TS que c'est une string, même si c'est vide au build
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        // Si DATABASE_URL est absente (pendant le build), on met une URL bidon
        url:
          process.env.DATABASE_URL ||
          "mongodb://unused:unused@localhost:27017/unused",
      },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
