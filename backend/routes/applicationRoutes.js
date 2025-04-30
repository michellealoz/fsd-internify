    const express = require("express");
    const router = express.Router();
    const Application = require("../models/application");
    const { verifyToken } = require("../middlewares/authMiddleware");


    // ✅ Approve or Reject an application (Only Companies/Admins)
    router.put("/:id/status", verifyToken, async (req, res) => {
        try {
            const { status } = req.body;

            if (req.user.role !== "company" && req.user.role !== "admin") {
                return res.status(403).json({ message: "Unauthorized. Only companies can approve/reject applications." });
            }

            if (!["Approved", "Rejected"].includes(status)) {
                return res.status(400).json({ message: "Invalid status. Must be 'Approved' or 'Rejected'." });
            }

            const application = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });

            if (!application) {
                return res.status(404).json({ message: "Application not found" });
            }

            res.status(200).json({ message: `Application ${status.toLowerCase()} successfully`, application });
        } catch (error) {
            console.error("❌ Error updating application status:", error);
            res.status(500).json({ message: "Internal Server Error", error });
        }
    });

    // ✅ Get applications with PO/PEO/SDG populated
    router.get("/", verifyToken, async (req, res) => {
        try {
            if (req.user.role !== "company" && req.user.role !== "admin") {
                return res.status(403).json({ message: "Unauthorized. Only companies can view applications." });
            }

            const { internshipId, studentId, status, page = 1, limit = 10, search = "" } = req.query;
            let query = {};

            if (internshipId) query.internship = internshipId;
            if (studentId) query.student = studentId;
            if (status) query.status = status;
            if (search) {
                query.$or = [
                    { "student.name": { $regex: search, $options: "i" } },
                    { "internship.title": { $regex: search, $options: "i" } },
                ];
            }

            const applications = await Application.find(query)
                .populate("student", "name email")
                .populate("internship", "title company PO PEO SDG") // Populate PO/PEO/SDG
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .sort({ createdAt: -1 });

            const totalApplications = await Application.countDocuments(query);

            res.status(200).json({
                totalApplications,
                totalPages: Math.ceil(totalApplications / limit),
                currentPage: parseInt(page),
                applications,
            });
        } catch (error) {
            console.error("❌ Error fetching applications:", error);
            res.status(500).json({ message: "Internal Server Error", error });
        }
    });

    
    module.exports = router;
