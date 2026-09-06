import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDb } from "./config/db.js";
import { User } from "./models/User.js";
import { Service } from "./models/Service.js";
import { Project } from "./models/Project.js";
import { GalleryItem } from "./models/GalleryItem.js";
import { Contact } from "./models/Contact.js";

const services = [
  {
    title: "Machinery Repair & Maintenance",
    slug: "machinery-repair-maintenance",
    image: "/assets/images/machinery-repair.jpg",
    summary: "Troubleshooting, mechanical repair, preventive maintenance, and breakdown support for industrial machinery.",
    detail: "Support for factories that need practical diagnosis, repair planning, component replacement, alignment, servicing, and maintenance work.",
    applications: ["Breakdown investigation", "Mechanical servicing", "Part replacement", "Preventive maintenance", "Machine alignment and adjustment"],
    sortOrder: 1
  },
  {
    title: "Industrial Fabrication",
    slug: "industrial-fabrication",
    image: "/assets/images/fabrication-work.jpg",
    summary: "Fabrication of mechanical structures, machine supports, guards, brackets, fixtures, and custom industrial components.",
    detail: "Fabrication work can be carried out from drawings, site measurements, samples, or functional requirements.",
    applications: ["Machine frames and supports", "Industrial brackets and fixtures", "Guards and covers", "Repair fabrication", "Custom mechanical assemblies"],
    sortOrder: 2
  },
  {
    title: "Custom Machinery Parts",
    slug: "custom-machinery-parts",
    image: "/assets/images/custom-machinery-parts.jpg",
    summary: "Replacement and custom machinery parts manufactured from drawings, samples, dimensions, or application requirements.",
    detail: "Useful for obsolete parts, damaged components, small batches, and machinery modifications where standard parts are unavailable.",
    applications: ["Shafts, bushes, spacers and sleeves", "Brackets, plates and flanges", "Replacement machine components", "Sample-based manufacturing", "Drawing-based manufacturing"],
    sortOrder: 3
  },
  {
    title: "Low-Volume / On-Demand Manufacturing",
    slug: "low-volume-on-demand-manufacturing",
    image: "/assets/images/custom-machinery-parts.jpg",
    summary: "Small-quantity manufacturing for industrial buyers where large production runs are not required or economical.",
    detail: "Designed for maintenance teams, purchase departments, and factories that need urgent or limited-quantity mechanical components.",
    applications: ["Small-batch replacement parts", "Pilot or trial components", "Maintenance spares", "Urgent plant requirements", "Custom one-off mechanical items"],
    sortOrder: 4
  },
  {
    title: "Machine Modification",
    slug: "machine-modification",
    image: "/assets/images/onsite-industrial-support.jpg",
    summary: "Modification, improvement, replacement, and customization of existing machinery and mechanical components.",
    detail: "Machine modification work can include adapting existing equipment to new requirements, improving usability, or replacing worn assemblies.",
    applications: ["Existing machine improvement", "Custom component replacement", "Mechanical adaptation", "Fixture and guard changes", "Production support modifications"],
    sortOrder: 5
  },
  {
    title: "Industrial Support",
    slug: "industrial-support",
    image: "/assets/images/onsite-industrial-support.jpg",
    summary: "General industrial mechanical support, site service work, repair assistance, and technical shop-floor problem solving.",
    detail: "A practical support service for industrial customers that need direct communication and hands-on mechanical work.",
    applications: ["On-site mechanical support", "Factory maintenance assistance", "Repair planning support", "Production equipment service", "Industrial mechanical work"],
    sortOrder: 6
  }
];

const projects = [
  {
    title: "Placeholder: Machinery Repair Project",
    customer: "[Add customer or industry, optional]",
    problem: "[Add the machine issue or business problem]",
    solution: "[Add the solution provided]",
    work: "[Add inspection, repair, fabrication, parts, or service work performed]",
    result: "[Add measurable or approved result only when confirmed]",
    image: "/assets/images/machinery-repair.jpg",
    sortOrder: 1
  },
  {
    title: "Placeholder: Fabrication / Modification Work",
    customer: "[Add customer or industry, optional]",
    problem: "[Add fabrication or modification requirement]",
    solution: "[Add design/fabrication approach]",
    work: "[Add work performed]",
    result: "[Add final outcome after approval]",
    image: "/assets/images/fabrication-work.jpg",
    sortOrder: 2
  },
  {
    title: "Placeholder: Custom Machinery Part",
    customer: "[Add customer or industry, optional]",
    problem: "[Add part requirement, drawing, sample, or failure context]",
    solution: "[Add manufacturing method or replacement approach]",
    work: "[Add machining/fabrication/inspection work]",
    result: "[Add confirmed result]",
    image: "/assets/images/custom-machinery-parts.jpg",
    sortOrder: 3
  }
];

const gallery = [
  { title: "Workshop", category: "Workshop", type: "image", src: "/assets/images/industrial-workshop-hero.jpg", alt: "Industrial workshop placeholder image", sortOrder: 1 },
  { title: "Machinery", category: "Machinery", type: "image", src: "/assets/images/machinery-repair.jpg", alt: "Machinery repair placeholder image", sortOrder: 2 },
  { title: "Fabrication", category: "Fabrication", type: "image", src: "/assets/images/fabrication-work.jpg", alt: "Fabrication work placeholder image", sortOrder: 3 },
  { title: "Repair Work", category: "Repair Work", type: "image", src: "/assets/images/machinery-repair.jpg", alt: "Mechanical repair placeholder image", sortOrder: 4 },
  { title: "Team", category: "Team", type: "image", src: "/assets/images/onsite-industrial-support.jpg", alt: "Industrial technician team placeholder image", sortOrder: 5 },
  { title: "Completed Work", category: "Completed Work", type: "image", src: "/assets/images/custom-machinery-parts.jpg", alt: "Completed custom machinery parts placeholder image", sortOrder: 6 },
  { title: "On-Site Work", category: "On-Site Work", type: "image", src: "/assets/images/onsite-industrial-support.jpg", alt: "On-site industrial support placeholder image", sortOrder: 7 }
];

async function seed() {
  await connectDb();

  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required for seeding");
  }

  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
  await User.findOneAndUpdate(
    { email: process.env.ADMIN_EMAIL.toLowerCase() },
    { email: process.env.ADMIN_EMAIL.toLowerCase(), passwordHash, role: "admin", active: true },
    { upsert: true, new: true }
  );

  await Promise.all(services.map((item) => Service.findOneAndUpdate({ slug: item.slug }, item, { upsert: true, new: true })));
  await Promise.all(projects.map((item) => Project.findOneAndUpdate({ title: item.title }, item, { upsert: true, new: true })));
  await Promise.all(gallery.map((item) => GalleryItem.findOneAndUpdate({ title: item.title, category: item.category }, item, { upsert: true, new: true })));
  await Contact.findOneAndUpdate(
    {},
    {
      companyName: "Durga Industries",
      legalName: "[Add registered business name]",
      phone: "[Add phone number]",
      whatsapp: "[Add WhatsApp number]",
      email: "[Add email address]",
      address: "[Add business address]",
      businessHours: "[Add business hours]",
      mapsEmbedUrl: "https://www.google.com/maps?q=Add%20business%20location&output=embed",
      mapsLink: "https://www.google.com/maps",
      profilePdfUrl: "/assets/company-profile.pdf",
      socialLinks: [
        { label: "LinkedIn", url: "[Add LinkedIn URL]" },
        { label: "YouTube", url: "[Add YouTube URL]" },
        { label: "Facebook", url: "[Add Facebook URL]" }
      ]
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log("Seed complete");
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
