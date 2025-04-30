const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

// Rate limiter for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later",
  skipSuccessfulRequests: true // only count failed requests
});

// Input validation for signup
const validateSignup = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('role').isIn(['student', 'admin', 'mentor', 'management']).withMessage('Invalid role')
];

// Input validation for login
const validateLogin = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
];

// ✅ Signup Route with validation
router.post("/signup", validateSignup, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false,
                errors: errors.array().map(err => ({
                    field: err.param,
                    message: err.msg
                }))
            });
        }

        const { name, email, password, role } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ 
                success: false,
                message: "User already exists" 
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = new User({ 
            name, 
            email, 
            password: hashedPassword, 
            role 
        });

        await user.save();

        res.status(201).json({ 
            success: true,
            message: "User registered successfully" 
        });
    } catch (error) {
        console.error("❌ Error signing up:", error);
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// ✅ Login Route with rate limiting and validation
router.post("/login", authLimiter, validateLogin, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false,
                errors: errors.array().map(err => ({
                    field: err.param,
                    message: err.msg
                }))
            });
        }

        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ 
                success: false,
                message: "Invalid credentials" 
            });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ 
                success: false,
                message: "Invalid credentials" 
            });
        }

        // Create tokens
        const accessToken = jwt.sign(
            { 
                id: user._id, 
                role: user.role 
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m' }
        );

        const refreshToken = jwt.sign(
            { 
                id: user._id, 
                role: user.role 
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d' }
        );

        // Omit password from response
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken,
            refreshToken,
            user: userResponse
        });
    } catch (error) {
        console.error("❌ Login error:", error);
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// ✅ Refresh Token Route
router.post("/refresh-token", async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(401).json({ 
                success: false,
                message: "No refresh token provided" 
            });
        }

        // Verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        // Check if user still exists
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(403).json({ 
                success: false,
                message: "User no longer exists" 
            });
        }

        // Issue new access token
        const newAccessToken = jwt.sign(
            { 
                id: user._id, 
                role: user.role 
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m' }
        );

        res.json({ 
            success: true,
            accessToken: newAccessToken 
        });
    } catch (error) {
        console.error("❌ Refresh token error:", error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ 
                success: false,
                message: "Invalid token" 
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ 
                success: false,
                message: "Token expired" 
            });
        }
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

module.exports = router;