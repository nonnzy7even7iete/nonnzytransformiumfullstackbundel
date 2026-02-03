import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  // 1. On récupère l'URL
  const url =
    process.env.DATABASE_URL ||
    "mongodb://unused:unused@localhost:27017/unused";

  // 2. On crée le client SANS options pour ne pas fâcher Prisma 7
  const client = new PrismaClient();

  // 3. On "hack" l'URL à l'intérieur du client juste avant de le renvoyer
  // C'est ce qui permet de passer le build Vercel sans erreur de "Unknown property"
  (client as any)._datasourceUrl = url;

  return client;
};

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
