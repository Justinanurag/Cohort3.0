import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from 'express';

export function middleware(req:Request, res:Response, next:Function) {
    const token=req.headers['authorization'] ??"";   
    const decoded=jwt.verify(token,process.env.JWT_SECRET as string);
    if(decoded){
        //@ts-ignore
        req.userId=decoded.userId;
        next();
    } else{
        //@ts-ignore
        req.status(403).json({
            message:"unauthorized"
        })
    }
}