const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    console.log("Fetched tasks:", tasks);
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Add a new task
router.post("/", async (req, res) => {
  try {
    console.log("Received task data:", req.body);
    const newTask = new Task({ text: req.body.text });
    const savedTask = await newTask.save();
    console.log("Saved task:", savedTask);
    res.status(201).json(savedTask);
  } catch (err) {
    console.error("Error saving task:", err);
    res.status(500).json({ error: "Failed to save task" });
  }
});

// Update a task
router.put("/:id", async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
});

// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    console.log("Deleting task with ID:", req.params.id);
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

module.exports = router;
