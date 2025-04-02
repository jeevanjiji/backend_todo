const express = require("express");
const Task = require("../models/Task"); // Ensure this model exists
const router = express.Router();

// Get all tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Add a task
router.post("/", async (req, res) => {
  try {
    const newTask = new Task({ text: req.body.text });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: "Failed to save task" });
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
