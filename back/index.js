import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.js";
import userRoutes from "./src/routes/user.js";
import messageRoutes from "./src/routes/message.js";
import connectDB from "./src/lib/db.js";
import { app, server } from "./src/lib/socket.js";
import authMiddleware from "./src/middleware/auth.js";

dotenv.config();

const port = process.env.PORT || 5000;
// const app = express();

// Middleware
app.use(express.json());
// app.use(cookieParser());

//cors
app.use(
  cors({
    origin: "http://localhost:5173", // The URL of your frontend (use specific URL, not *)
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//utils
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", authMiddleware, userRoutes);
app.use("/api/messages/", authMiddleware, messageRoutes);

// const server = createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173", // The URL of your frontend (use specific URL, not *)
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   },
// });

// io.on("connection", (socket) => {
//   console.log("use connected ", socket.id);

//   socket.on("message", ({ message, Room }) => {
//     console.log("message received: ", message, "and", Room);
//     socket.to(Room).emit("received-message", message);
//   });

//   socket.on("join-room", (name) => {
//     socket.join(name);
//     console.log("room joined");
//   });

//   socket.on("disconnect", () => {
//     console.log("user disconnected successfully ", socket.id);
//   });
// });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err); // Log the full error for debugging
  res.status(err.status || 500).json({
    error: {
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Internal Server Error",
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
      status: err.status || 500,
    },
  });
});

//db connection
connectDB();

// Start the server
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
