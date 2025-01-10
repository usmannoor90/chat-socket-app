import createError from "http-errors";
import User from "../models/User.js";
import { generateToken, verifyToken } from "../lib/utils.js";
import mongoose from "mongoose";

class AuthController {
  // Validate token
  static async validate(req, res, next) {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        throw createError(401, "No token provided");
      }

      const decoded = await verifyToken(token);

      const user = await User.findOne({
        _id: new mongoose.Types.ObjectId(decoded.userId),
      });

      if (!user) {
        throw createError(404, "User not found");
      }

      res.json({ user });
    } catch (error) {
      next(
        error.name === "JsonWebTokenError"
          ? createError(401, "Invalid token")
          : error
      );
    }
  }

  // Login user
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      console.log(req.body);

      if (!email || !password) {
        throw createError(400, "Email and password are required");
      }

      const user = await User.findOne({ email });

      if (!user) {
        throw createError(401, "Invalid credentials");
      }
      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        throw createError(401, "Invalid credentials");
      }
      const token = await generateToken(user._id);

      res.json({
        token,
        user: user,
      });
    } catch (error) {
      next(error);
    }
  }

  // Register new user
  static async register(req, res, next) {
    try {
      const { email, password, username, phoneNumber } = req.body;

      if (!email || !password || !username || !phoneNumber) {
        throw createError(400, "All fields are required");
      }
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw createError(409, "Email already registered");
      }

      const user = new User({
        email,
        passwordHash: password,
        username,
        displayName: username,
        phoneNumber: phoneNumber,
      });

      await user.save();

      const token = await generateToken(user._id);

      console.log({
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      });

      res.status(201).json({
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
