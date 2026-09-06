import { Router } from "express";
import { projects, projectRules, idRule } from "../controllers/contentController.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

export const projectRoutes = Router();

projectRoutes.get("/", projects.list);
projectRoutes.get("/admin", requireAuth, projects.list);
projectRoutes.post("/", requireAuth, projectRules, validate, projects.create);
projectRoutes.put("/:id", requireAuth, idRule, projectRules, validate, projects.update);
projectRoutes.delete("/:id", requireAuth, idRule, validate, projects.remove);
