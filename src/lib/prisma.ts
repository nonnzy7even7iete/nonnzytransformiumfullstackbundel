import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  const url =
    process.env.DATABASE_URL ||
    "mongodb://unused:unused@localhost:27017/unused";

  // On utilise 'as any' pour bypasser la vérification de TypeScript.
  // Cela enlève le rouge dans VS Code immédiatement.
  return new PrismaClient({
    datasources: {
      db: {
        url: url,
      },
    },
  } as any);
};

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
