const taskModel = require("../models/taskModel");

exports.create = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({
      message: "Task title cannot be empty",
    });
  }

  const task = new taskModel({
    title: req.body.title,
    completed: req.body.completed,
    deadline: req.body.deadline,
  });

  try {
    const data = await task.save();
    res.json({
      message: "Task created successfully",
      data: data,
    });
  } catch {
    res.status(500).json({
      message: err.message || "Some error occurred while creating the Task.",
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const data = await taskModel.find();
    res.json({
      message: "All Tasks retrieved successfully",
      data: data,
    });
  } catch {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving tasks.",
    });
  }
};

exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await taskModel.findById(id);
    if (!data) {
      return res.status(404).json({
        message: `Task with id=${id} not found`,
      });
    }
    res.json({
      message: "Task retrieved successfully",
      data: data,
    });
  } catch {
    res.status(500).json({
      message: err.message || `Error retrieving Task with id=${id}`,
    });
  }
};

exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Data to update cannot be empty",
    });
  }

  const id = req.params.id;

  try {
    const data = await taskModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!data) {
      return res.status(404).json({
        message: `Task with id=${id} not found`,
      });
    }
    res.json({
      message: "Task updated successfully",
      data: data,
    });
  } catch {
    res.status(500).json({
      message: err.message || `Error updating Task with id=${id}`,
    });
  }
};
