import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

export const pool = new Pool({
  connectionString,
});

pool.on("connect", () => {
  console.log("Database connected successfully");
});

pool.on("error", (error) => {
  console.error("Database connection error:", error);
});
