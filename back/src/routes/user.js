import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router();

// Get contacts list with pagination and filters
router.get("/contacts", UserController.GetContactsUsers);

// Search contacts
router.get("/contacts/search", UserController.SearchContacts);

// Add new contact
router.post("/contacts", UserController.AddContact);

// Remove contact
router.delete("/contacts/:contactId", UserController.RemoveContact);

// Update user profile
// router.put("/profile", UserController.updateProfile);

// // Update user settings
// router.put("/settings", UserController.updateSettings);

// // Get user profile by ID
// router.get("/profile/:userId", UserController.getUserProfile);

export default router;
