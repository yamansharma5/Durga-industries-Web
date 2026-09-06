import { Router } from "express";
import { gallery, galleryRules, idRule } from "../controllers/contentController.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

export const galleryRoutes = Router();

galleryRoutes.get("/", gallery.list);
galleryRoutes.get("/admin", requireAuth, gallery.list);
galleryRoutes.post("/", requireAuth, galleryRules, validate, gallery.create);
galleryRoutes.put("/:id", requireAuth, idRule, galleryRules, validate, gallery.update);
galleryRoutes.delete("/:id", requireAuth, idRule, validate, gallery.remove);
