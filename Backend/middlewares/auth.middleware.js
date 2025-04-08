import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.headers["authorization"]?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded?.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Invalid access token" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
