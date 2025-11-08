import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function GET(req: NextRequest) {
  try {
    const authorizationHeader = req.headers.get("authorization");

    if (!authorizationHeader) {
      return NextResponse.json({ error: "No token found" }, { status: 401 });
    }

    const token = authorizationHeader.replace("Bearer ", "");

    const decoded: any = jwt.verify(token, "SECRET");

    return NextResponse.json({
      userId: decoded.userId,
      message: "Valid token",
      name:"Anurag"
    });
  } catch (err) {
    return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
  }
}
