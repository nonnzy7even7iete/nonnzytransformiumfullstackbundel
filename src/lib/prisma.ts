import { PrismaClient } from "@prisma/client";

// Cette fonction garantit que DATABASE_URL est définie pour Prisma
// même si elle est absente de ton système (pendant le build Vercel)
const getPrismaClient = () => {
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = "mongodb://unused:unused@localhost:27017/unused";
  }
  return new PrismaClient();
};

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? getPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
