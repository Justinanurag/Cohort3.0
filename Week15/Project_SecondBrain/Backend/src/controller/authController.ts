import type { Response ,Request} from 'express';
import express from 'express';

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js"; 

export const register = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password || password.length < 3) {
    return res.status(400).json({
      success: false,
      message: "❌ Missing or Invalid Details",
    });
  }

  try {
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "⚠️ Email already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "4d" }
    );

    return res.status(201).json({
      success: true,
      message: "✅ Registration successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({
      success: false,
      message: "🚨 Server Error",
    });
  }
};