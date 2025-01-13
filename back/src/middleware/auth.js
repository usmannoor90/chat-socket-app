import createError from "http-errors";
import { verifyToken } from "../lib/utils.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw createError(401, "Authentication required");
    }

    const decoded = await verifyToken(token);

    req.userId = decoded.userId;

    next();
  } catch (error) {
    next(createError(401, "Invalid or expired token"));
  }
};

export default authMiddleware;
