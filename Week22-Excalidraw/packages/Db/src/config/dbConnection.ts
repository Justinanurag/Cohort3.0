import { Pool } from "pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

// Create PostgreSQL pool
export const pool = new Pool({
  connectionString,
});

// Create Prisma adapter
const adapter = new PrismaPg(pool);

// Create Prisma client
export const prisma = new PrismaClient({
  adapter,
});

// Database connection function with confirmation
export async function connectDatabase(): Promise<void> {
  try {
    // Test PostgreSQL pool connection
    const client = await pool.connect();
    console.log("✅ PostgreSQL pool connected successfully");
    client.release();

    // Test Prisma connection
    await prisma.$connect();
    console.log("✅ Prisma client connected successfully");
    
    // Verify connection by running a simple query
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Database connection verified");
    
    console.log("🎉 Database connected successfully!");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    throw error;
  }
}
// Handle pool connection events
pool.on("connect", () => {
  console.log("📊 New PostgreSQL client connected");
});

pool.on("error", (error) => {
  console.error("❌ PostgreSQL pool error:", error);
});

// Handle Prisma disconnect
process.on("beforeExit", async () => {
  await prisma.$disconnect();
  await pool.end();
  console.log("🔌 Database connections closed");
});
