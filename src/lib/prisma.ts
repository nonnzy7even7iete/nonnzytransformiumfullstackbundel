import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  // On ne passe pas d'objet de configuration si on n'en a pas besoin,
  // Prisma lira automatiquement DATABASE_URL depuis process.env
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
