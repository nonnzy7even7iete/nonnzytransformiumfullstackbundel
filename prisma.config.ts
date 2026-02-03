import { defineConfig } from "@prisma/config";
import * as dotenv from "dotenv";

// On force le chargement du .env
dotenv.config();

export default defineConfig({
  datasource: {
    // On ajoute une sécurité pour s'assurer que l'URL est bien une string
    url: process.env.MONGODB_URI as string,
  },
});
