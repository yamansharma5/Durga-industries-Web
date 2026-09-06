import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    customer: { type: String, default: "", trim: true },
    problem: { type: String, default: "", trim: true },
    solution: { type: String, default: "", trim: true },
    work: { type: String, default: "", trim: true },
    result: { type: String, default: "", trim: true },
    image: { type: String, default: "" },
    videoUrl: { type: String, default: "" },
    sortOrder: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);

