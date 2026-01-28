import 'dotenv/config';
import { defineConfig } from '@prisma/config';

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
  migrations: {
    // Este comando le dice a Prisma cómo ejecutar tu script de semillas
    seed: 'ts-node ./prisma/seed.ts',
  },
});