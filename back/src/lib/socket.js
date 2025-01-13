import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import { verifyToken } from "./utils.js";
import Message from "../models/Messages.js";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

const userSocketMap = {};

// Add Socket to User's Active Connections
function addUserSocket(userId, socketId) {
  if (!userSocketMap[userId]) {
    userSocketMap[userId] = new Set();
  }
  userSocketMap[userId].add(socketId);
}

// Remove Socket from User's Active Connections
function removeUserSocket(userId, socketId) {
  if (userSocketMap[userId]) {
    userSocketMap[userId].delete(socketId);
    if (userSocketMap[userId].size === 0) {
      delete userSocketMap[userId];
    }
  }
}

// Get All Active Socket IDs for a User
function getUserSocketIds(userId) {
  return userSocketMap[userId] ? Array.from(userSocketMap[userId]) : [];
}

io.on("connection", async (socket) => {
  console.log("A user connected", socket.id);

  const { userId } = await verifyToken(socket.handshake.auth.token);

  if (userId) {
    addUserSocket(userId, socket.id);

    // Notify All Users of Online Users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  }

  // Handle Sending Messages
  socket.on(
    "sendMessage",
    async ({ recipientId, content, media, mediaType }, callback) => {
      try {
        const { userId } = await verifyToken(socket.handshake.auth.token);

        const senderId = userId;

        console.log(recipientId, senderId);

        const newMessage = await Message.create({
          senderId,
          recipientId,
          content,
          media,
          mediaType,
        });

        const recipientSocketIds = getUserSocketIds(recipientId);

        recipientSocketIds.forEach((recipientSocketId) => {
          io.to(recipientSocketId).emit("receiveMessage", newMessage);
        });

        callback({ status: "success", message: "Message delivered" });
      } catch (error) {
        console.error("Error sending message:", error);
        callback({ status: "error", message: "Failed to send message" });
      }
    }
  );

  // Handle Chat History Retrieval
  socket.on("getChatHistory", async ({ userId, recipientId }, callback) => {
    try {
      const messages = await Message.find({
        $or: [
          { senderId: userId, recipientId },
          { senderId: recipientId, recipientId: userId },
        ],
      }).sort({ timestamp: 1 }); // Sort by timestamp ascending
      callback({ status: "success", messages });
    } catch (error) {
      console.error("Error retrieving chat history:", error);
      callback({ status: "error", message: "Failed to fetch chat history" });
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnect", socket.id);
    removeUserSocket(userId, socket.id);
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
