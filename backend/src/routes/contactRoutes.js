import { Router } from "express";
import { contactRules, getContact, updateContact } from "../controllers/contactController.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

export const contactRoutes = Router();

contactRoutes.get("/", getContact);
contactRoutes.put("/", requireAuth, contactRules, validate, updateContact);

