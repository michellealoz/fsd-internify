const jwt = require("jsonwebtoken");
require("dotenv").config();

// ✅ Middleware to verify token (for all roles)
const verifyToken = (req, res, next) => {
    try {
        const token = req.header("Authorization");

        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access Denied. No valid token provided." });
        }

        // Extract the token from "Bearer <token>"
        const actualToken = token.split(" ")[1];

        // Verify token
        const verified = jwt.verify(actualToken, process.env.JWT_SECRET);
        req.user = verified; // Attach user data to request

        next(); // Proceed to the next function
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

// ✅ Middleware to verify if the user is an admin (with accessLevel support)
const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access Denied. Only Admins Allowed." });
        }

        // `accessLevel` already exists in the token if issued correctly
        if (!req.user.accessLevel) {
            return res.status(403).json({ message: "Access Denied. Access level not found." });
        }

        next();
    });
};


// ✅ Middleware to verify if the user is a company
const verifyCompany = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role !== "company") {
            return res.status(403).json({ message: "Access Denied. Only Companies Allowed." });
        }
        next();
    });
};

// ✅ Middleware to verify if the user is a student
const verifyStudent = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role !== "student") {
            return res.status(403).json({ message: "Access Denied. Only Students Allowed." });
        }
        next();
    });
};

// ✅ Middleware to verify if the user is faculty
const verifyFaculty = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role !== "mentor") {
            return res.status(403).json({ message: "Access Denied. Only Mentor Allowed." });
        }
        next();
    });
};

const verifyManagement = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.role !== "management") {
        return res.status(403).json({ message: "Access Denied. Only Management Allowed." });
      }
      next();
    });
  };
  

module.exports = { verifyToken, verifyAdmin, verifyCompany, verifyStudent, verifyFaculty, verifyManagement };
