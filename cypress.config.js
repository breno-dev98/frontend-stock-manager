import { defineConfig } from "cypress";
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  e2e: {
    env: {
      EMAIL: process.env.CYPRESS_EMAIL,
      SENHA: process.env.CYPRESS_SENHA
    }
  },
});
