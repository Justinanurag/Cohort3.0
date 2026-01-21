import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file in the http-backend directory
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import express, { Request, Response, Express } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authMiddleware } from "./middleware";
import {JWT_SECRET} from "@repo/backend-common/config";
import {CreateUserSchema,SigninSchema,createRoomSchema} from "@repo/common/types";
import { PrismaClient } from "@prisma/client";

const app: Express = express();
const PORT = process.env.PORT || 54;

process.env.PRISMA_CLIENT_ENGINE_TYPE = "library";

app.use(express.json());

const prisma = new PrismaClient({
  __internal: { engine: { type: "library" } },
} as any);

// Home route
app.get("/", (req: Request, res: Response) => {
  res.json("Server is running 🚀");
});

//Sign up route
app.post("/signup", async (req: Request, res: Response) => {
  // 1. Validate input
  const parsed = CreateUserSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid input data",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const validatedData = parsed.data;
  const { name, email, password } = validatedData;
  // const { name, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // 5. Generate JWT
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 6. Send response
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

//Sign in route
app.post("/signin", async (req: Request, res: Response) => {
  const data=SigninSchema.safeParse(req.body);
  if(!data.success){
    return res.json({
      message:"Incorrect inputs!!"
    })
  }
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "email and password are required!!!",
      });
    }

    //find user by id
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

//room route
app.post("/room", authMiddleware, async (req: Request, res: Response) => {
  const data=createRoomSchema.safeParse(req.body);
  if(!data.success){
    return res.json({
      message:"Incorrect inputs!!"
    })
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
