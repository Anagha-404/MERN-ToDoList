const express = require("express");
const mongoose = require("mongoose");
const Task = require("../models/Task");

const router = express.Router();

// GET /api/tasks — fetch all tasks (newest first)
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/tasks — add a new task
router.post("/", async (req, res) => {
  try {
    const task = await Task.create({ title: req.body.title });
    res.status(201).json(task);
  } catch (err) {
    // Validation errors (e.g. missing title) are the client's fault
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/tasks/:id — update title and/or completed status
router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid task id" });
  }

  // Only allow these two fields to be changed
  const updates = {};
  if (req.body.title !== undefined) updates.title = req.body.title;
  if (req.body.completed !== undefined) updates.completed = req.body.completed;

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, updates, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/tasks/:id — delete a task
router.delete("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid task id" });
  }

  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted", id: task._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
