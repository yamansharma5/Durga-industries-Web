import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    summary: { type: String, required: true, trim: true },
    detail: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
    applications: [{ type: String, trim: true }],
    sortOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Service = mongoose.model("Service", serviceSchema);

