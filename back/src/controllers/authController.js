import jwt from "jsonwebtoken";
import createError from "http-errors";
import User from "../models/User.js";

class AuthController {
  // Validate token
  static async validate(req, res, next) {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        throw createError(401, "No token provided");
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select("-password");

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

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      res.json({
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

  // Register new user
  static async register(req, res, next) {
    try {
      const { email, password, username } = req.body;

      if (!email || !password || !username) {
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
      });

      await user.save();

      const token = jwt.sign({ userId: user._id }, "process.env.JWT_SECRET", {
        expiresIn: "24h",
      });

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
