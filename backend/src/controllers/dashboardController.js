import { Enquiry, ENQUIRY_STATUSES } from "../models/Enquiry.js";
import { Service } from "../models/Service.js";
import { Project } from "../models/Project.js";
import { GalleryItem } from "../models/GalleryItem.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getDashboardStats = asyncHandler(async (_req, res) => {
  const [statusCounts, totalEnquiries, serviceCount, projectCount, galleryCount, recentEnquiries] =
    await Promise.all([
      Enquiry.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      Enquiry.countDocuments(),
      Service.countDocuments(),
      Project.countDocuments(),
      GalleryItem.countDocuments(),
      Enquiry.find().sort({ createdAt: -1 }).limit(8)
    ]);

  const byStatus = Object.fromEntries(ENQUIRY_STATUSES.map((status) => [status, 0]));
  statusCounts.forEach((item) => {
    byStatus[item._id] = item.count;
  });

  res.json({
    data: {
      totalEnquiries,
      byStatus,
      content: {
        services: serviceCount,
        projects: projectCount,
        galleryItems: galleryCount
      },
      recentEnquiries
    }
  });
});
