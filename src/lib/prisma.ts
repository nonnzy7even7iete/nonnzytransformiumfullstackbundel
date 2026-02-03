import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  const url =
    process.env.DATABASE_URL ||
    "mongodb://unused:unused@localhost:27017/unused";

  // On force l'URL dans un objet de config que Prisma ne peut pas ignorer
  // Le 'as any' est vital pour que TypeScript ne bloque pas le déploiement
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
