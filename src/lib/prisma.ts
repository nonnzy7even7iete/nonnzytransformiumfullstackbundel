import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  // Le bouclier pour Vercel Build
  if (process.env.NEXT_PHASE === "phase-production-build") {
    return {} as PrismaClient;
  }

  // On laisse Prisma chercher DATABASE_URL tout seul dans le .env
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
