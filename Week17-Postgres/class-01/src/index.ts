import { Client } from "pg";
import express from "express"

const app=express();
const pgClient = new Client({
  user: "neondb_owner",
  password: "npg_OFbL8stQaNW9",
  host: "ep-sparkling-resonance-adqjcbl7-pooler.c-2.us-east-1.aws.neon.tech",
  database: "neondb",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function main() {
  try {
    await pgClient.connect();
    console.log("✅ Database connected successfully!");

    const res = await pgClient.query("SELECT * FROM users;");
    console.log("📦 Query result:");
    console.table(res.rows);
  } catch (err) {
    console.error("❌ Error connecting to database:", err);
  } finally {
    await pgClient.end();
    console.log("🔒 Connection closed.");
  }
}

main();

app.post("/signup",(req,res)=>{
    const username=req.body.username;
    const password =req.body.password;
    const email=req.body.password;

    let sqlQuery="INSERT INTO user(username,email,password) VALUES("
    sqlQuery+=username;
    sqlQuery+=","
    sqlQuery+=email
    sqlQuery+=password
    
    sqlQuery+=
    ");"

    const response=await pgClient.query(`INSERT INTO users (username,email,password) VALUES (${username}),${email},${password}`);

    res.json({
        message:"You have signed up"
    })
})
