import { body } from "express-validator";
import { Contact } from "../models/Contact.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const contactRules = [
  body("companyName").optional({ values: "falsy" }).isString(),
  body("legalName").optional({ values: "falsy" }).isString(),
  body("phone").optional({ values: "falsy" }).isString(),
  body("whatsapp").optional({ values: "falsy" }).isString(),
  body("email").optional({ values: "falsy" }).isString(),
  body("address").optional({ values: "falsy" }).isString(),
  body("businessHours").optional({ values: "falsy" }).isString(),
  body("mapsEmbedUrl").optional({ values: "falsy" }).isString(),
  body("mapsLink").optional({ values: "falsy" }).isString(),
  body("profilePdfUrl").optional({ values: "falsy" }).isString(),
  body("socialLinks").optional().isArray()
];

export const getContact = asyncHandler(async (_req, res) => {
  const contact = await Contact.findOne();
  res.json({ data: contact || {} });
});

export const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findOneAndUpdate({}, req.body, {
    new: true,
    upsert: true,
    runValidators: true,
    setDefaultsOnInsert: true
  });
  res.json({ data: contact });
});

