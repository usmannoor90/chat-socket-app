import express from "express";
import MessageController from "../controllers/messageController.js";

const router = express.Router();

// Get contacts list with pagination and filters
router.post("/send", MessageController.sendMessage);

export default router;
