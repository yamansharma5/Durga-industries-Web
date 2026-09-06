/*
  EDIT THIS FILE FIRST
  Replace the placeholders below with the company's real information.

  Key fields to update:
  - company.name, logoText, logoImage
  - contact.phone, whatsapp, email, address, businessHours
  - contact.mapsEmbedUrl and mapsLink
  - profilePdf path, usually assets/company-profile.pdf
  - services, capabilities, industries, projects, gallery media
  - socials
*/

window.SITE_CONTENT = {
  company: {
    name: "Durga Industries",
    legalName: "[Add registered business name]",
    logoText: "DI",
    logoImage: "",
    tagline: "Industrial Machinery Repair, Fabrication & Custom Engineering Solutions",
    shortDescription:
      "Reliable industrial repair, maintenance, fabrication, and custom machinery-part solutions for manufacturing businesses.",
    overview:
      "Durga Industries provides practical mechanical engineering support for factories and industrial customers. The company focuses on machinery repair, breakdown support, fabrication, modification, and low-volume manufacturing of custom machinery components.",
    team: "5 skilled mechanical technicians/workers",
    profilePdf: "assets/company-profile.pdf"
  },

  contact: {
    phone: "[Add phone number]",
    whatsapp: "[Add WhatsApp number]",
    email: "[Add email address]",
    address: "[Add business address]",
    businessHours: "[Add business hours]",
    mapsEmbedUrl: "https://www.google.com/maps?q=Add%20business%20location&output=embed",
    mapsLink: "https://www.google.com/maps",
    enquiryEndpoint: "[Future backend endpoint or CRM webhook]"
  },

  socials: [
    { label: "LinkedIn", url: "[Add LinkedIn URL]" },
    { label: "YouTube", url: "[Add YouTube URL]" },
    { label: "Facebook", url: "[Add Facebook URL]" }
  ],

  capabilities: [
    "Machinery Repair & Maintenance",
    "Industrial Fabrication",
    "Custom Machinery Parts",
    "On-Demand Manufacturing",
    "Breakdown & Repair Support",
    "Machine Modification & Improvement"
  ],

  services: [
    {
      id: "repair",
      title: "Machinery Repair & Maintenance",
      image: "assets/images/machinery-repair.jpg",
      summary:
        "Troubleshooting, mechanical repair, preventive maintenance, and breakdown support for industrial machinery.",
      detail:
        "Support for factories that need practical diagnosis, repair planning, component replacement, alignment, servicing, and maintenance work. The scope can be adapted after machine inspection and customer requirements.",
      applications: [
        "Breakdown investigation",
        "Mechanical servicing",
        "Part replacement",
        "Preventive maintenance",
        "Machine alignment and adjustment"
      ]
    },
    {
      id: "fabrication",
      title: "Industrial Fabrication",
      image: "assets/images/fabrication-work.jpg",
      summary:
        "Fabrication of mechanical structures, machine supports, guards, brackets, fixtures, and custom industrial components.",
      detail:
        "Fabrication work can be carried out from drawings, site measurements, samples, or functional requirements. Final scope, material, and finish should be confirmed during quotation.",
      applications: [
        "Machine frames and supports",
        "Industrial brackets and fixtures",
        "Guards and covers",
        "Repair fabrication",
        "Custom mechanical assemblies"
      ]
    },
    {
      id: "parts",
      title: "Custom Machinery Parts",
      image: "assets/images/custom-machinery-parts.jpg",
      summary:
        "Replacement and custom machinery parts manufactured from drawings, samples, dimensions, or application requirements.",
      detail:
        "Useful for obsolete parts, damaged components, small batches, and machinery modifications where standard parts are unavailable or unsuitable.",
      applications: [
        "Shafts, bushes, spacers and sleeves",
        "Brackets, plates and flanges",
        "Replacement machine components",
        "Sample-based manufacturing",
        "Drawing-based manufacturing"
      ]
    },
    {
      id: "low-volume",
      title: "Low-Volume / On-Demand Manufacturing",
      image: "assets/images/custom-machinery-parts.jpg",
      summary:
        "Small-quantity manufacturing for industrial buyers where large production runs are not required or economical.",
      detail:
        "Designed for maintenance teams, purchase departments, and factories that need urgent or limited-quantity mechanical components without committing to large batch sizes.",
      applications: [
        "Small-batch replacement parts",
        "Pilot or trial components",
        "Maintenance spares",
        "Urgent plant requirements",
        "Custom one-off mechanical items"
      ]
    },
    {
      id: "modification",
      title: "Machine Modification",
      image: "assets/images/onsite-industrial-support.jpg",
      summary:
        "Modification, improvement, replacement, and customization of existing machinery and mechanical components.",
      detail:
        "Machine modification work can include adapting existing equipment to new requirements, improving usability, replacing worn assemblies, or fabricating custom support parts.",
      applications: [
        "Existing machine improvement",
        "Custom component replacement",
        "Mechanical adaptation",
        "Fixture and guard changes",
        "Production support modifications"
      ]
    },
    {
      id: "support",
      title: "Industrial Support",
      image: "assets/images/onsite-industrial-support.jpg",
      summary:
        "General industrial mechanical support, site service work, repair assistance, and technical shop-floor problem solving.",
      detail:
        "A practical support service for industrial customers that need direct communication and hands-on mechanical work for machinery, equipment, or production-related issues.",
      applications: [
        "On-site mechanical support",
        "Factory maintenance assistance",
        "Repair planning support",
        "Production equipment service",
        "Industrial mechanical work"
      ]
    }
  ],

  industries: [
    "Automobile Manufacturing",
    "Auto Components",
    "Engineering & Manufacturing",
    "Industrial Plants",
    "Machinery & Equipment",
    "General Manufacturing"
  ],

  projects: [
    {
      title: "Placeholder: Machinery Repair Project",
      customer: "[Add customer or industry, optional]",
      problem: "[Add the machine issue or business problem]",
      solution: "[Add the solution provided]",
      work: "[Add inspection, repair, fabrication, parts, or service work performed]",
      result: "[Add measurable or approved result only when confirmed]",
      image: "assets/images/machinery-repair.jpg",
      videoUrl: ""
    },
    {
      title: "Placeholder: Fabrication / Modification Work",
      customer: "[Add customer or industry, optional]",
      problem: "[Add fabrication or modification requirement]",
      solution: "[Add design/fabrication approach]",
      work: "[Add work performed]",
      result: "[Add final outcome after approval]",
      image: "assets/images/fabrication-work.jpg",
      videoUrl: ""
    },
    {
      title: "Placeholder: Custom Machinery Part",
      customer: "[Add customer or industry, optional]",
      problem: "[Add part requirement, drawing, sample, or failure context]",
      solution: "[Add manufacturing method or replacement approach]",
      work: "[Add machining/fabrication/inspection work]",
      result: "[Add confirmed result]",
      image: "assets/images/custom-machinery-parts.jpg",
      videoUrl: ""
    }
  ],

  gallery: [
    {
      title: "Workshop",
      category: "Workshop",
      type: "image",
      src: "assets/images/industrial-workshop-hero.jpg",
      alt: "Industrial workshop placeholder image"
    },
    {
      title: "Machinery",
      category: "Machinery",
      type: "image",
      src: "assets/images/machinery-repair.jpg",
      alt: "Machinery repair placeholder image"
    },
    {
      title: "Fabrication",
      category: "Fabrication",
      type: "image",
      src: "assets/images/fabrication-work.jpg",
      alt: "Fabrication work placeholder image"
    },
    {
      title: "Repair Work",
      category: "Repair Work",
      type: "image",
      src: "assets/images/machinery-repair.jpg",
      alt: "Mechanical repair placeholder image"
    },
    {
      title: "Team",
      category: "Team",
      type: "image",
      src: "assets/images/onsite-industrial-support.jpg",
      alt: "Industrial technician team placeholder image"
    },
    {
      title: "Completed Work",
      category: "Completed Work",
      type: "image",
      src: "assets/images/custom-machinery-parts.jpg",
      alt: "Completed custom machinery parts placeholder image"
    },
    {
      title: "On-Site Work",
      category: "On-Site Work",
      type: "image",
      src: "assets/images/onsite-industrial-support.jpg",
      alt: "On-site industrial support placeholder image"
    }
  ],

  whyChooseUs: [
    "Skilled mechanical team",
    "Practical industrial experience",
    "Fast response",
    "Custom solutions",
    "Small-batch capability",
    "Reliable workmanship",
    "B2B-focused service",
    "Direct communication"
  ],

  process: [
    "Requirement",
    "Inspection",
    "Quotation",
    "Approval",
    "Planning",
    "Repair / Fabrication",
    "Quality Check",
    "Delivery",
    "Support"
  ],

  profileSections: {
    "Company Overview":
      "Edit this online company profile with the final business overview, legal name, location, service area, and company background.",
    "Core Services":
      "Machinery repair, maintenance, industrial fabrication, custom machinery parts, machine modification, and on-demand low-volume manufacturing.",
    "Industries Served":
      "Automobile manufacturing, auto components, engineering and manufacturing, industrial plants, machinery and equipment, and general manufacturing.",
    Capabilities:
      "Add confirmed workshop capabilities, machinery, tooling, materials handled, inspection process, and service coverage.",
    "Workshop & Equipment":
      "Add actual workshop photographs, machine list, equipment list, and site-service capability details.",
    "Representative Projects":
      "Add approved project examples with problem, solution, work performed, results, images, and videos.",
    "Contact Information":
      "Add phone, WhatsApp, email, address, business hours, and Google Maps location."
  },

  testimonials: []
};
