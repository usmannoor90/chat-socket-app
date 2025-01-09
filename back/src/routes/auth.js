import express from "express";
import AuthController from "../controllers/authController.js";
import authMiddleware from "../middleware/auth.js";
const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/validate", authMiddleware, AuthController.validate);

export default router;
