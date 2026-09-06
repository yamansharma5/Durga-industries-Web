import mongoose from "mongoose";

export const ENQUIRY_STATUSES = ["New", "Contacted", "Quotation Sent", "Won", "Lost"];

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, default: "", trim: true, lowercase: true },
    requirement: { type: String, required: true, trim: true },
    serviceRequired: { type: String, required: true, trim: true },
    quantity: { type: String, default: "", trim: true },
    preferredTimeline: { type: String, default: "", trim: true },
    message: { type: String, required: true, trim: true },
    attachment: {
      originalName: { type: String, default: "" },
      fileName: { type: String, default: "" },
      path: { type: String, default: "" },
      mimeType: { type: String, default: "" },
      size: { type: Number, default: 0 }
    },
    status: {
      type: String,
      enum: ENQUIRY_STATUSES,
      default: "New"
    },
    notes: { type: String, default: "", trim: true }
  },
  { timestamps: true }
);

export const Enquiry = mongoose.model("Enquiry", enquirySchema);

