const express = require("express");
const router = express.Router();
const Progress = require("../models/progress");
const Application = require("../models/application");
const { verifyToken, verifyAdmin } = require("../middlewares/authMiddleware");

// Initialize progress tracking
router.post("/:applicationId", verifyAdmin, async (req, res) => {
    try {
        const { startDate, endDate, milestones } = req.body;
        
        if (!startDate || !endDate) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newProgress = new Progress({
            startDate,
            endDate,
            milestones: (milestones || []).map(m => ({
                title: m.title,
                dueDate: m.dueDate,
                completed: false
            }))
        });

        await newProgress.save();

        // Link to application
const application = await Application.findByIdAndUpdate(
    req.params.applicationId,
    { progress: newProgress._id },
    { new: true }
);

if (!application) {
    return res.status(404).json({ message: "Application not found" });
}

// ✅ Link application → progress (No need to save progress twice)
newProgress.application = application._id;
// Save the progress only once here
await newProgress.save();

res.status(201).json({
    message: "Progress tracking initialized",
    progress: newProgress
});

    } catch (error) {
        console.error("Error initializing progress:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update progress details
router.put("/:id", verifyAdmin, async (req, res) => {
    try {
        const progress = await Progress.findById(req.params.id)
            .populate({
                path: 'application',
                populate: [
                    { path: 'student', select: 'name email' },
                    { path: 'internship', select: 'title' }
                ]
            });
        if (!progress) {
            return res.status(404).json({ message: "Progress not found" });
        }

        // Update fields
        Object.assign(progress, req.body);
        progress.lastUpdated = new Date();
        progress.completion = progress.calculateCompletion();
        
        await progress.save();
        
        res.status(200).json(progress);
    } catch (error) {
        console.error("Error updating progress:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// Get progress details by progress ID
router.get("/:id", verifyToken, async (req, res) => {
    try {
        const progress = await Progress.findById(req.params.id)
            .populate('application') // Populate the application field
            .populate('application.student') // Populate student from application
            .populate('application.internship'); // Populate internship from application

        if (!progress) {
            return res.status(404).json({ message: "Progress not found" });
        }

        // Check for student role (if applicable)
        if (req.user.role === 'student' && !progress.application.student._id.equals(req.user.id)) {
            return res.status(403).json({ message: "Access denied" });
        }

        res.status(200).json(progress);
    } catch (error) {
        console.error("Error fetching progress:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get progress via application ID
router.get("/application/:id", verifyToken, async (req, res) => {
    try {
        const application = await Application.findById(req.params.id)
            .populate('progress')  // Populate the progress field from Application
            .populate('student')   // Populate student field
            .populate('internship');  // Populate internship field

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        if (!application.progress) {
            return res.status(404).json({ message: "Progress not found for this application" });
        }

        res.status(200).json(application.progress); // Return the progress directly
    } catch (error) {
        console.error("Error fetching progress:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = router;