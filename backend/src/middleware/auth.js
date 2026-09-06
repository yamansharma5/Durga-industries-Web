import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { createHttpError } from "../utils/createHttpError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const requireAuth = asyncHandler(async (req, _res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    throw createHttpError(401, "Authentication required");
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(payload.id).select("-passwordHash");

  if (!user || !user.active) {
    throw createHttpError(401, "Invalid authentication token");
  }

  req.user = user;
  next();
});

