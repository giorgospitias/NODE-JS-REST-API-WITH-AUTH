import asyncHandler from "express-async-handler"; // We use this package for using the error handler and not the try..catch method
import Task from "../mongodb/models/taskModel.js";
import User from "../mongodb/models/userModel.js";

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
export const getTask = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });

  res.status(200).json(tasks);
});

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
export const setTask = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const task = await Task.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(task);
});

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error("Task not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the task user
  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updateTask);
});

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error("Task not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the task user
  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await task.remove();

  res.status(200).json({ id: req.params.id });
});
