import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  userId?: string;  
}

export const userMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({
        success: false,
        message: "🚫 No token provided",
      });
    }

    const token = header.startsWith('Bearer ') ? header.slice(7) : header;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "🚫 Invalid token format",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    if (decoded && decoded.id) {
      req.userId = decoded.id;
      next();  
    } else {
      return res.status(401).json({
        success: false,
        message: "Auth middleware failed!!",
      });
    }
  } catch (error: any) {
    return res.status(401).json({  
      success: false,
      message: error.message,  
    });
  }
};