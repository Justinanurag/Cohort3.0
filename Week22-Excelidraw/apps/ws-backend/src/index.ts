import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import {JWT_SECRET} from "@repo/backend-common/config";


const wss = new WebSocketServer({ port: 8080 });
// const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

wss.on("connection", (ws, request) => {
  try {
    const url = request.url;

    if (!url || !url.includes("?")) {
      ws.close();
      return;
    }

    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get("token");

    if (!token) {
      ws.close();
      return;
    }

    // Verify JWT
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Your signup/login uses: { id, email }
    if (!decoded || !decoded.id) {
      ws.close();
      return;
    }

    console.log("User connected:", decoded.id);

    ws.on("message", (data) => {
      console.log("Received:", data.toString());
      ws.send("pong");
    });

  } catch (err) {
    console.error("JWT error:", err);
    ws.close();
  }
});
