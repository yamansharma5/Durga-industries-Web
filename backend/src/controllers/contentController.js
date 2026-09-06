import slugify from "slugify";
import { body, param } from "express-validator";
import { Service } from "../models/Service.js";
import { Project } from "../models/Project.js";
import { GalleryItem } from "../models/GalleryItem.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createHttpError } from "../utils/createHttpError.js";

const galleryCategories = ["Workshop", "Machinery", "Fabrication", "Repair Work", "Team", "Completed Work", "On-Site Work"];

export const idRule = [param("id").isMongoId().withMessage("Invalid id")];

export const serviceRules = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("summary").trim().notEmpty().withMessage("Summary is required"),
  body("detail").trim().notEmpty().withMessage("Detail is required"),
  body("image").optional({ values: "falsy" }).isString(),
  body("applications").optional().isArray().withMessage("Applications must be an array"),
  body("sortOrder").optional().isNumeric(),
  body("active").optional().isBoolean()
];

export const projectRules = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("customer").optional({ values: "falsy" }).isString(),
  body("problem").optional({ values: "falsy" }).isString(),
  body("solution").optional({ values: "falsy" }).isString(),
  body("work").optional({ values: "falsy" }).isString(),
  body("result").optional({ values: "falsy" }).isString(),
  body("image").optional({ values: "falsy" }).isString(),
  body("videoUrl").optional({ values: "falsy" }).isURL().withMessage("Video URL must be valid"),
  body("sortOrder").optional().isNumeric(),
  body("featured").optional().isBoolean(),
  body("active").optional().isBoolean()
];

export const galleryRules = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("category").isIn(galleryCategories).withMessage("Invalid category"),
  body("type").optional().isIn(["image", "video"]).withMessage("Invalid media type"),
  body("src").trim().notEmpty().withMessage("Media source is required"),
  body("alt").optional({ values: "falsy" }).isString(),
  body("poster").optional({ values: "falsy" }).isString(),
  body("sortOrder").optional().isNumeric(),
  body("active").optional().isBoolean()
];

function servicePayload(bodyData) {
  const title = bodyData.title.trim();
  return {
    title,
    slug: slugify(title, { lower: true, strict: true }),
    summary: bodyData.summary,
    detail: bodyData.detail,
    image: bodyData.image || "",
    applications: bodyData.applications || [],
    sortOrder: Number(bodyData.sortOrder || 0),
    active: bodyData.active ?? true
  };
}

function buildCrud(Model, payloadBuilder) {
  return {
    list: asyncHandler(async (req, res) => {
      const includeInactive = req.query.includeInactive === "true" && req.user;
      const filter = includeInactive ? {} : { active: true };
      const docs = await Model.find(filter).sort({ sortOrder: 1, createdAt: -1 });
      res.json({ data: docs });
    }),
    create: asyncHandler(async (req, res) => {
      const doc = await Model.create(payloadBuilder(req.body));
      res.status(201).json({ data: doc });
    }),
    update: asyncHandler(async (req, res) => {
      const doc = await Model.findByIdAndUpdate(req.params.id, payloadBuilder(req.body), {
        new: true,
        runValidators: true
      });
      if (!doc) throw createHttpError(404, "Record not found");
      res.json({ data: doc });
    }),
    remove: asyncHandler(async (req, res) => {
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) throw createHttpError(404, "Record not found");
      res.status(204).end();
    })
  };
}

export const services = buildCrud(Service, servicePayload);

export const projects = buildCrud(Project, (data) => ({
  title: data.title,
  customer: data.customer || "",
  problem: data.problem || "",
  solution: data.solution || "",
  work: data.work || "",
  result: data.result || "",
  image: data.image || "",
  videoUrl: data.videoUrl || "",
  sortOrder: Number(data.sortOrder || 0),
  featured: data.featured ?? false,
  active: data.active ?? true
}));

export const gallery = buildCrud(GalleryItem, (data) => ({
  title: data.title,
  category: data.category,
  type: data.type || "image",
  src: data.src,
  alt: data.alt || "",
  poster: data.poster || "",
  sortOrder: Number(data.sortOrder || 0),
  active: data.active ?? true
}));
