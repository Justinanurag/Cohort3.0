import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
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

    const token = jwt.sign({ username }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    return res.status(200).json({
      success: true,
      message: "Login successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

//register
app.post("/register", (req, res) => {
  try {
    const { username, password, email } = req.body;
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//room
app.post("/room", (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`HTTP Backend is running on port ${port}`);
});
