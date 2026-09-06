import { Router } from "express";
import { services, serviceRules, idRule } from "../controllers/contentController.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

export const serviceRoutes = Router();

serviceRoutes.get("/", services.list);
serviceRoutes.get("/admin", requireAuth, services.list);
serviceRoutes.post("/", requireAuth, serviceRules, validate, services.create);
serviceRoutes.put("/:id", requireAuth, idRule, serviceRules, validate, services.update);
serviceRoutes.delete("/:id", requireAuth, idRule, validate, services.remove);
