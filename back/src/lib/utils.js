import jwt from "jsonwebtoken";

export const generateToken = async (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  return token;
};

export const verifyToken = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  return decoded;
};
