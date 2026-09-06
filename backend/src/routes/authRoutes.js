import { Router } from "express";
import { login, loginRules, me } from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

export const authRoutes = Router();

authRoutes.post("/login", loginRules, validate, login);
authRoutes.get("/me", requireAuth, me);

