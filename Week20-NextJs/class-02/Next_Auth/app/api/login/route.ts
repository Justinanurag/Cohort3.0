"use server"

import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const username = body.username;
    const password = body.password;

    console.log("username => ", username);

    // later DB validation
    const userId = 1;

    const token = jwt.sign(
      { userId },
      "SECRET"
    );

    return NextResponse.json({ token });

  } catch (err) {
    console.log("ERR => ", err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
