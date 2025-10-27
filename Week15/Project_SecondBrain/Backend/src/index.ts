import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { server } from "typescript";
import dotenv from "dotenv";
import connectDB from './config/mongodb.js'
import authRouter from './router/authRouter.js'
import cors from "cors";
dotenv.config();
const app = express();
const PORT = process.env.PORT||3000;

app.use(cors({
  origin: ["http://localhost:5173", "https://secondbrain-sepia.vercel.app","https://secondbrain-git-main-justinanurag02-7857s-projects.vercel.app/"],
  methods: ["GET", "POST", "PUT", "DELETE"], 
  credentials: true, 
}));


app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello boys!");
});
connectDB();
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});


app.use("/api/v1/",authRouter);


// app.post("/api/v1/user" ,userRouter);

// app.post("/api/v1/content", );
// app.get("/api/v1/content", );
// app.delete("/api/v1/content", );
// app.post("/api/v1/brain/share", );
// app.get("/api/v1/brain/share", );
