import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router();

// Get contacts list with pagination and filters
router.get("/messages/:recipientId", UserController.GetContactsUsers);

export default router;
