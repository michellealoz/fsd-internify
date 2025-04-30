const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const Application = require("../models/application");
const { verifyAdmin } = require("../middlewares/authMiddleware");
const Admin = require("../models/admin"); // Assuming you have this model
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Internship = require("../models/internship"); // <-- Make sure this is imported!
const checkAdminLevel = require("../middlewares/checkAdminLevel");
// ✅ Admin Login
router.post("/login", async (req, res) => {
    console.log("### /api/admin/login route was hit! ###"); // Added logging
    console.log("Request body:", req.body);
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        console.log("Admin found:", admin);

        if (!admin) {
            console.log("Admin not found");
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        const isPasswordMatch = await bcrypt.compare(password, admin.password);
        
        if (!isPasswordMatch) {
            console.log("Invalid credentials");
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            {
              id: admin._id,
              role: "admin",
              accessLevel: admin.accessLevel
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          );
        console.log("Token generated:", token);
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("❌ Admin login failed:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// ✅ 1. Get All Users (Admin Only)
router.get("/users", verifyAdmin, checkAdminLevel(["super"]), async (req, res) =>  {
    try {
        const users = await User.find().select("-password"); // Exclude passwords for security
        res.status(200).json(users);
    } catch (error) {
        console.error("❌ Error fetching users:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// ✅ 2. Delete a User (Admin Only)
router.delete("/users/:id", verifyAdmin, checkAdminLevel(["super"]), async (req, res) => {

    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// ✅ 3. Update User Role (Admin Only)
router.put("/users/:id/role", verifyAdmin, checkAdminLevel(["super"]), async (req, res) => {

    try {
        const { role } = req.body;
        if (!["student", "management", "admin", "mentor"].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User role updated successfully", user });
    } catch (error) {
        console.error("❌ Error updating user role:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// ✅ 4. Get All Applications (Admin Only)
router.get("/applications", verifyAdmin, checkAdminLevel(["program"]), async (req, res) => {
    try {
        const applications = await Application.find()
            .populate("student", "name email")
            .populate("internship", "title company");
        res.status(200).json(applications);
    } catch (error) {
        console.error("❌ Error fetching applications:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// ✅ 5. Delete an Application (Admin Only)
router.delete("/applications/:id", verifyAdmin, checkAdminLevel(["program"]), async (req, res) => {

    try {
        const application = await Application.findByIdAndDelete(req.params.id);
        if (!application) return res.status(404).json({ message: "Application not found" });

        res.status(200).json({ message: "Application deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting application:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
// ✅ 6.Update an Application (Admin Only)
router.put("/applications/:id", verifyAdmin, checkAdminLevel(["program"]), async (req, res) => {

    try {
        const { status } = req.body;
        if (!["pending", "accepted", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const application = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!application) return res.status(404).json({ message: "Application not found" });

        res.status(200).json({ message: "Application status updated successfully", application });
    } catch (error) {
        console.error("❌ Error updating application status:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
// ✅ 6. Get All Internships (Admin Only)
router.get("/internships", verifyAdmin, checkAdminLevel(["basic", "program"]), async (req, res) => {

    try {
        const internships = await Internship.find();
        res.status(200).json(internships);
    } catch (error) {
        console.error("❌ Error fetching internships:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
// ✅ 7. Delete an Internship (Admin Only)
router.delete("/internships/:id", verifyAdmin, checkAdminLevel(["program"]), async (req, res) => {

    try {
        const internship = await Internship.findByIdAndDelete(req.params.id);
        if (!internship) return res.status(404).json({ message: "Internship not found" });

        res.status(200).json({ message: "Internship deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting internship:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
// ✅ 8. Update Internship Status (Admin Only)
router.put("/internships/:id/status", verifyAdmin, checkAdminLevel(["program"]), async (req, res) => {

    try {
        const { status } = req.body;
        if (!["open", "closed"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const internship = await Internship.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!internship) return res.status(404).json({ message: "Internship not found" });

        res.status(200).json({ message: "Internship status updated successfully", internship });
    } catch (error) {
        console.error("❌ Error updating internship status:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.get("/test", (req, res) => {
    res.send("✅ Admin routes working!");
  });
  
module.exports = router;