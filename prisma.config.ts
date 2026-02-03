import { defineConfig } from "@prisma/config";
import * as dotenv from "dotenv";

dotenv.config();

// On utilise DATABASE_URL pour correspondre à Vercel et au standard Prisma
// On met une URL bidon en secours UNIQUEMENT pour que le build passe
const databaseUrl =
  process.env.DATABASE_URL || "mongodb://localhost:27017/unused";

export default defineConfig({
  datasource: {
    url: databaseUrl,
  },
});
