const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes"); // Ensure this file exists

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allows frontend access
app.use(express.json()); // Parses JSON request body

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://jeevanjiji:pQL5YvXq5Ns8tBf@cluster0.xblsw.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit if database connection fails
  });

// Routes
app.use("/api/tasks", taskRoutes);

// Root route for health check
app.get("/", (req, res) => {
  res.json({ message: "Todo API is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
  console.error("Server error:", err);
  process.exit(1);
});
