import jwt from "jsonwebtoken";
import createError from "http-errors";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw createError(401, "Authentication required");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    next(createError(401, "Invalid or expired token"));
  }
};

export default authMiddleware;
