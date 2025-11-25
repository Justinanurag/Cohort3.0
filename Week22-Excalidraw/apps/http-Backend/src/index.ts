import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { middleware } from "../Middleware/middleware";
import { UserSchema, SigninSchema, createRoomSchema } from "@repo/common/types";
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Hello from HTTP Backend!",
  });
});

//login
app.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    // Generate token
    const token = jwt.sign({ username }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

//register
app.post("/register", (req, res) => {
  try {
    const data = createRoomSchema.parse(req.body);
    if (!data) {
      return res.status(400).json({ error: "Invalid data" });
    }
    const { username, password, email } = req.body;
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//room
app.post("/room", middleware, (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`HTTP Backend is running on port ${port}`);
});
