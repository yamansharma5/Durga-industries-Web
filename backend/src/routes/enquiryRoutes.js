import { Router } from "express";
import {
  createEnquiry,
  deleteEnquiry,
  enquiryCreateRules,
  enquiryListRules,
  enquiryStatusRules,
  listEnquiries,
  updateEnquiryStatus
} from "../controllers/enquiryController.js";
import { requireAuth } from "../middleware/auth.js";
import { enquiryUpload } from "../middleware/upload.js";
import { validate } from "../middleware/validate.js";
import { idRule } from "../controllers/contentController.js";

export const enquiryRoutes = Router();

enquiryRoutes.post("/", enquiryUpload.single("attachment"), enquiryCreateRules, validate, createEnquiry);
enquiryRoutes.get("/", requireAuth, enquiryListRules, validate, listEnquiries);
enquiryRoutes.patch("/:id/status", requireAuth, enquiryStatusRules, validate, updateEnquiryStatus);
enquiryRoutes.delete("/:id", requireAuth, idRule, validate, deleteEnquiry);

