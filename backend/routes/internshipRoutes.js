const express = require("express");
const router = express.Router();
const Internship = require("../models/internship");
const { verifyToken, verifyAdmin } = require("../middlewares/authMiddleware");
const SDGS = require("../models/SDGS.js");


// ✅ Add Internship (with PO/PEO/SDG mapping)
router.post("/", verifyToken, async (req, res) => {
    try {
        const { title, location, duration, description, requirements, stipend, PO, PEO, SDGS } = req.body;
        const userRole = req.user.role;

        if (userRole !== "admin") {
            return res.status(403).json({ error: "Unauthorized. Only admin can add internships." });
        }

        if (!title || !location || !duration || !description || !requirements || stipend === undefined) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newInternship = new Internship({
            title,
            location,
            duration,
            description,
            requirements,
            stipend,
            
            PO,  // PO mapping
            PEO, // PEO mapping
            SDGS  // SDG mapping
        });

        await newInternship.save();
        res.status(201).json({ message: "Internship added successfully!", internship: newInternship });

    } catch (error) {
        console.error("❌ Error adding internship:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Update Internship (with PO/PEO/SDG mapping)
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const { title, location, duration, description, requirements, stipend, PO, PEO, SDGS } = req.body;
        const userRole = req.user.role;
        const userId = req.user._id;

        if (userRole !== "admin") {
            return res.status(403).json({ error: "Unauthorized. Only admin can update internships." });
        }

        const internship = await Internship.findById(req.params.id);
        if (!internship) {
            return res.status(404).json({ error: "Internship not found" });
        }


        const updatedInternship = await Internship.findByIdAndUpdate(
            req.params.id,
            { title, location, duration, description, requirements, stipend, PO, PEO, SDGS },
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: "Internship updated successfully!", internship: updatedInternship });

    } catch (error) {
        console.error("❌ Error updating internship:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Fetch internships with PO/PEO/SDG populated
router.get("/", async (req, res) => {
    try {
        const { search, location, requirements, description, stipendMin, stipendMax, page = 1, limit = 5 } = req.query;

        let query = {};

        if (search) query.title = { $regex: search, $options: "i" };
        if (location) query.location = location;
        if (requirements) query.requirements = { $regex: requirements, $options: "i" };
        if (description) query.description = { $regex: description, $options: "i" };
        if (stipendMin || stipendMax) {
            query.stipend = {};
            if (stipendMin) query.stipend.$gte = parseInt(stipendMin);
            if (stipendMax) query.stipend.$lte = parseInt(stipendMax);
        }

        const pageNumber = Math.max(1, parseInt(page));
        const limitNumber = Math.max(1, parseInt(limit));

        const internships = await Internship.find(query)
            .populate("PO")  // Populate PO
            .populate("PEO") // Populate PEO
            .populate("SDGS") // Populate SDG
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber)
            .exec();

        const total = await Internship.countDocuments(query).exec();

        res.json({
            total,
            page: pageNumber,
            totalPages: Math.ceil(total / limitNumber),
            internships
        });

    } catch (err) {
        console.error("❌ Error fetching internships:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ Delete Internship (only creator can delete)
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const userId = req.user._id;

        const internship = await Internship.findById(req.params.id);
        if (!internship) {
            return res.status(404).json({ error: "Internship not found" });
        }


        const deletedInternship = await Internship.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Internship deleted successfully!", deletedInternship });

    } catch (error) {
        console.error("❌ Error deleting internship:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Delete ALL internships (super destructive — companies only)
router.delete("/", verifyToken, async (req, res) => {
    try {
        const userRole = req.user.role;
        if (userRole !== "admin") {
            return res.status(403).json({ error: "Unauthorized. Only admins can delete internships." });
        }

        await Internship.deleteMany({});
        res.status(200).json({ message: "All internships deleted successfully" });

    } catch (error) {
        console.error("❌ Error deleting all internships:", error);
        res.status(500).json({ error: "Error deleting internships" });
    }
});

module.exports = router;
