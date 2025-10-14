import express from "express";
import type { Request, Response } from "express";

import { Client } from "pg";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json()); 


const pgClient = new Client({
  user: "neondb_owner",
  password: "npg_OFbL8stQaNW9",
  host: "ep-sparkling-resonance-adqjcbl7-pooler.c-2.us-east-1.aws.neon.tech",
  database: "neondb",
  port: 5432,
  ssl: { rejectUnauthorized: false },
});

// Connect once and keep it open
pgClient.connect()
  .then(() => console.log("✅ Database connected successfully!"))
  .catch((err) => console.error("❌ Database connection error:", err));

// --- Signup API ---
app.post("/signup", async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const sqlQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
    await pgClient.query(sqlQuery, [username, email, password]);

    res.json({ message: "✅ You have signed up successfully!" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// --- Test Route ---
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
