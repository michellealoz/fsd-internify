require("dotenv").config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cron = require("node-cron");
dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json()); // Parse JSON data
app.use(cors()); // Enable CORS

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Test Endpoint
app.post("/test", (req, res) => {
    console.log("Hit the /test endpoint!", req.body);
    res.status(200).json({ message: "Test endpoint reached!", body: req.body });
});


app.use(cors({
  origin: "http://localhost:3000",  // Allow frontend to communicate with backend
  credentials: true  // Ensure cookies or authorization headers are sent
}));


// ✅ Import Routes
const authRoutes = require("./routes/authRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const sdgRoutes = require("./routes/sdgRoutes");
const poRoutes = require("./routes/poRoutes");
const peoRoutes = require("./routes/peoRoutes");
const adminRoutes = require("./routes/adminRoutes"); // Import Admin Routes
const userRoutes = require("./routes/userRoutes");
const progressRoutes = require("./routes/progressRoutes");

// ✅ Use Routes
app.use("/api/auth", authRoutes); // Authentication Routes
app.use("/api/internships", internshipRoutes); // Internship Routes
app.use("/api/applications", applicationRoutes); // Application Routes
app.use("/api/sdgs", sdgRoutes);
app.use("/api/po", poRoutes);
app.use("/api/peo", peoRoutes);
app.use("/api/admin", adminRoutes); // Base route for Admin APIs
app.use("/api/users", userRoutes);
app.use("/api/progress", progressRoutes);
app.use(require('./middlewares/errorHandler'));
// Schedule daily progress updates
cron.schedule("0 0 * * *", async () => {
  try {
      const currentDate = new Date();
      const progresses = await Progress.find({
          startDate: { $lte: currentDate },
          endDate: { $gte: currentDate }
      });

      const bulkOps = progresses.map(progress => {
          const update = {
              daysSpent: Math.floor((currentDate - progress.startDate) / 86400000) + 1,
              lastUpdated: currentDate
          };

          // Auto-complete overdue milestones
          if (progress.milestones?.length > 0) {
              update.milestones = progress.milestones.map(m => ({
                  ...m.toObject(),
                  completed: m.completed || new Date() > m.dueDate
              }));
              update.completion = progress.milestones.filter(m => m.completed).length / progress.milestones.length * 100;
          } else {
              update.completion = update.daysSpent / Math.ceil((progress.endDate - progress.startDate) / 86400000) * 100;
          }

          return {
              updateOne: {
                  filter: { _id: progress._id },
                  update: { $set: update }
              }
          };
      });

      if (bulkOps.length > 0) {
          await Progress.bulkWrite(bulkOps);
          console.log(`Updated ${bulkOps.length} progress entries`);
      }
  } catch (error) {
      console.error("Cron job failed:", error);
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));