import fs from "fs";
import path from "path";
import multer from "multer";
import { createHttpError } from "../utils/createHttpError.js";

const uploadDir = process.env.UPLOAD_DIR || "src/uploads";
fs.mkdirSync(uploadDir, { recursive: true });

const allowed = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "application/acad",
  "application/x-acad",
  "application/dxf",
  "image/vnd.dxf"
]);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "-");
    cb(null, `${Date.now()}-${safeName}`);
  }
});

export const enquiryUpload = multer({
  storage,
  limits: {
    fileSize: Number(process.env.MAX_UPLOAD_MB || 10) * 1024 * 1024
  },
  fileFilter: (_req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const extensionAllowed = [".pdf", ".jpg", ".jpeg", ".png", ".webp", ".heic", ".dwg", ".dxf"].includes(extension);

    if (allowed.has(file.mimetype) || extensionAllowed) {
      cb(null, true);
      return;
    }

    cb(createHttpError(415, "Unsupported attachment type"));
  }
});
