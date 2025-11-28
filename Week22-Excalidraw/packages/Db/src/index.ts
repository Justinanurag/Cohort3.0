import { PrismaPg } from "@prisma/adapter-pg";
import { pool } from "./config/dbConnection";
import { PrismaClient } from "./generated/prisma/client";

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter,
});