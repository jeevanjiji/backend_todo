const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://jeevanjiji:pQL5YvXq5Ns8tBf@cluster0.xblsw.mongodb.net/todo?retryWrites=true&w=majority";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.error("Database connection error:", err);
    console.log("Attempting to connect with URI:", MONGODB_URI);
  });

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Todo API is running" });
});

// Use task routes
app.use("/api/tasks", taskRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
