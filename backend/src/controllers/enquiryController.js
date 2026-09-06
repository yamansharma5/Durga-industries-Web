import { body, param, query } from "express-validator";
import { Enquiry, ENQUIRY_STATUSES } from "../models/Enquiry.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createHttpError } from "../utils/createHttpError.js";

export const enquiryCreateRules = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("companyName").trim().notEmpty().withMessage("Company name is required"),
  body("phone").trim().notEmpty().withMessage("Phone is required"),
  body("email").optional({ values: "falsy" }).isEmail().withMessage("Email must be valid"),
  body("requirement").trim().notEmpty().withMessage("Requirement is required"),
  body("serviceRequired").trim().notEmpty().withMessage("Service required is required"),
  body("quantity").optional({ values: "falsy" }).isString(),
  body("preferredTimeline").optional({ values: "falsy" }).isString(),
  body("message").trim().notEmpty().withMessage("Message is required")
];

export const enquiryListRules = [
  query("status").optional().isIn(ENQUIRY_STATUSES).withMessage("Invalid status"),
  query("limit").optional().isInt({ min: 1, max: 100 }),
  query("page").optional().isInt({ min: 1 })
];

export const enquiryStatusRules = [
  param("id").isMongoId().withMessage("Invalid id"),
  body("status").isIn(ENQUIRY_STATUSES).withMessage("Invalid status"),
  body("notes").optional({ values: "falsy" }).isString()
];

export const createEnquiry = asyncHandler(async (req, res) => {
  const attachment = req.file
    ? {
        originalName: req.file.originalname,
        fileName: req.file.filename,
        path: req.file.path,
        mimeType: req.file.mimetype,
        size: req.file.size
      }
    : undefined;

  const enquiry = await Enquiry.create({
    name: req.body.name,
    companyName: req.body.companyName,
    phone: req.body.phone,
    email: req.body.email || "",
    requirement: req.body.requirement,
    serviceRequired: req.body.serviceRequired,
    quantity: req.body.quantity || "",
    preferredTimeline: req.body.preferredTimeline || "",
    message: req.body.message,
    attachment
  });

  res.status(201).json({ data: enquiry });
});

export const listEnquiries = asyncHandler(async (req, res) => {
  const limit = Number(req.query.limit || 25);
  const page = Number(req.query.page || 1);
  const filter = req.query.status ? { status: req.query.status } : {};
  const [items, total] = await Promise.all([
    Enquiry.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Enquiry.countDocuments(filter)
  ]);

  res.json({
    data: items,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
      limit
    }
  });
});

export const updateEnquiryStatus = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status, notes: req.body.notes || "" },
    { new: true, runValidators: true }
  );

  if (!enquiry) throw createHttpError(404, "Enquiry not found");
  res.json({ data: enquiry });
});

export const deleteEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
  if (!enquiry) throw createHttpError(404, "Enquiry not found");
  res.status(204).end();
});

