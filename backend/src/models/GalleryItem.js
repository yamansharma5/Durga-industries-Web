import mongoose from "mongoose";

const galleryItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["Workshop", "Machinery", "Fabrication", "Repair Work", "Team", "Completed Work", "On-Site Work"],
      required: true
    },
    type: {
      type: String,
      enum: ["image", "video"],
      default: "image"
    },
    src: { type: String, required: true, trim: true },
    alt: { type: String, default: "", trim: true },
    poster: { type: String, default: "", trim: true },
    sortOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const GalleryItem = mongoose.model("GalleryItem", galleryItemSchema);

