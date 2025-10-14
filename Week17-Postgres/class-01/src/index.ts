// Importing necessary modules
import express from "express";
import type { Request, Response } from "express";
import { Client } from "pg"; // PostgreSQL client

// Create an Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON body from requests
app.use(express.json());

// Database connection setup
const pgClient = new Client({
  user: "neondb_owner",
  password: "npg_OFbL8stQaNW9",
  host: "ep-sparkling-resonance-adqjcbl7-pooler.c-2.us-east-1.aws.neon.tech",
  database: "neondb",
  port: 5432,
  ssl: { rejectUnauthorized: false }, // Required for Neon DB
});

// Connect once to PostgreSQL
pgClient
  .connect()
  .then(() => console.log("✅ Database connected successfully!"))
  .catch((err) => console.error("❌ Database connection error:", err));

// --- SIGNUP API ---
app.post("/signup", async (req: Request, res: Response) => {
  try {
    const { username, email, password, city, street, country, pincode } = req.body;

    // ✅ Step 1: Validate user info
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All user fields are required!" });
    }

    // ✅ Step 2: Insert into users table
    const userQuery = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING id;  -- Return inserted user ID
    `;
    const userResult = await pgClient.query(userQuery, [username, email, password]);
    console.log("User inserted:", userResult.rows[0]);

    const userId = userResult.rows[0].id;

    // ✅ Step 3: Validate address info
    if (!city || !street || !country || !pincode) {
      return res.status(400).json({ error: "All address fields are required!" });
    }

    // ✅ Step 4: Insert address for that user
    const addressQuery = `
      INSERT INTO addresses (user_id, city, street, country, pincode)
      VALUES ($1, $2, $3, $4, $5)
    `;
    const addressResult = await pgClient.query(addressQuery, [
      userId,
      city,
      street,
      country,
      pincode,
    ]);
    console.log("Address inserted:", addressResult.rowCount);

    // ✅ Step 5: Respond success
    res.json({ message: "✅ Signup and address saved successfully!" });
  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

//---For metadata---
app.get("/metadata",async(req,res)=>{
  const id=req.query.id;

  const query1=`SELECT username,email,id FROM users WHERE id=$1`;
  const response1=await pgClient.query(query1,[id]);

  const query2=`SELECT * FROM addresses WHERE user_id=$1`;
  const response2=await pgClient.query(query2,[id]);

  res.json({
    success:true,
    user:response1.rows[0],
    address:response2.rows[0]
  })
})

// --- TEST ROUTE ---
app.get("/", (req, res) => {
  res.send("🚀 Server is running!");
});

// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
