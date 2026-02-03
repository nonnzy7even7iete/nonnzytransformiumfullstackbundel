import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  // Si on est en plein build Vercel et que DATABASE_URL est vide
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = "mongodb://unused:unused@localhost:27017/unused";
  }

  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
