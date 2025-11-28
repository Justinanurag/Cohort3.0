"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const wss = new ws_1.WebSocketServer({ port: 8080 });
wss.on('connection', (ws, request) => {
    const url = request.url;
    if (!url) {
        return;
    }
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') || "";
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    if (typeof decoded === 'string') {
        ws.close(1008, "Unauthorized");
        return;
    }
    if (!decoded || !decoded.userId) {
        ws.close(1008, "Unauthorized");
        return;
    }
});
