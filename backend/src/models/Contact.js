import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    companyName: { type: String, default: "Durga Industries", trim: true },
    legalName: { type: String, default: "[Add registered business name]", trim: true },
    phone: { type: String, default: "[Add phone number]", trim: true },
    whatsapp: { type: String, default: "[Add WhatsApp number]", trim: true },
    email: { type: String, default: "[Add email address]", trim: true },
    address: { type: String, default: "[Add business address]", trim: true },
    businessHours: { type: String, default: "[Add business hours]", trim: true },
    mapsEmbedUrl: { type: String, default: "https://www.google.com/maps?q=Add%20business%20location&output=embed", trim: true },
    mapsLink: { type: String, default: "https://www.google.com/maps", trim: true },
    profilePdfUrl: { type: String, default: "/assets/company-profile.pdf", trim: true },
    socialLinks: [
      {
        label: { type: String, trim: true },
        url: { type: String, trim: true }
      }
    ]
  },
  { timestamps: true }
);

export const Contact = mongoose.model("Contact", contactSchema);
