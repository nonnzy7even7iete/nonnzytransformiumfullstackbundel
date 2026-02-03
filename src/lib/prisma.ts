import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  // On récupère l'URL
  const url = process.env.DATABASE_URL;

  // HACK DE SURVIE : Si l'URL est vide pendant le build, on donne une URL MongoDB
  // valide syntaxiquement pour que Prisma ne plante pas le build.
  const effectiveUrl =
    url ||
    "mongodb+srv://build-user:pass@localhost/temporary?retryWrites=true&w=majority";

  return new PrismaClient({
    datasourceUrl: effectiveUrl,
  } as any);
};

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
