import { WebSocketServer, WebSocket } from "ws";

// Define the shape of a connected user
interface User {
  socket: WebSocket;
  room: string;
}

// Define message types
interface JoinMessage {
  type: "join";
  payload: {
    roomId: string;
  };
}

interface ChatMessage {
  type: "chat";
  payload: {
    message: string;
  };
}

type IncomingMessage = JoinMessage | ChatMessage;

// Set up WebSocket server
const wss = new WebSocketServer({ port: 8080 });

let users: User[] = [];
let userCount = 0;

wss.on("connection", (socket: WebSocket) => {
  userCount++;
  console.log(`User connected #${userCount}`);

  socket.on("message", (message: string | Buffer) => {
    try {
      const parsedMessage = JSON.parse(message.toString()) as IncomingMessage;

      switch (parsedMessage.type) {
        case "join": {
          const roomId = parsedMessage.payload.roomId;

          // Add user to the users list with room info
          users.push({ socket, room: roomId });
          console.log(`User joined room: ${roomId}`);
          break;
        }

        case "chat": {
          // Find sender's room
          const sender = users.find((u) => u.socket === socket);
          if (!sender) {
            console.warn("Sender not found in users list.");
            return;
          }

          const senderRoom = sender.room;
          const messageText = parsedMessage.payload.message;

          console.log(`User sent message to room ${senderRoom}:`, messageText);

          // Broadcast to users in the same room
          users.forEach((user) => {
            if (user.room === senderRoom) {
              user.socket.send(messageText);
            }
          });

          break;
        }

        default:
          console.warn("Unknown message type received.");
      }

      console.log("Raw message received:", message.toString());
    } catch (error) {
      console.error("Failed to parse message:", message.toString(), error);
    }
  });

  // Handle disconnection
  socket.on("close", () => {
    users = users.filter((u) => u.socket !== socket);
    console.log("User disconnected. Active users:", users.length);
  });
});
