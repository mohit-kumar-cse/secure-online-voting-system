// server/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
 
  if (!process.env.JWT_SECRET) {
    console.error("❌ JWT_SECRET is not defined in environment variables");
    return res.status(500).json({ message: "Server configuration error." });
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

 
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Not authorized. User no longer exists." });
    }

    req.user = user;
    next();

  } catch (error) {
 
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Session expired. Please log in again." });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token. Please log in again." });
    }
    console.error("Auth middleware error:", error);
    return res.status(401).json({ message: "Not authorized." });
  }
};

export default protect;