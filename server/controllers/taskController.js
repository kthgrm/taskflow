const Project = require("../models/Project");
const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { title, description, projectId } = req.body;

    if (!title || !projectId) {
      return res.status(400).json({ message: "Title and project is required" });
    }

    const project = Project.findOne({ _id: projectId, owner: req.user.id });
    if (!project) {
      return res.status(400).json({ message: "Unauthorized project access" });
    }

    const task = await Task.create({
      title,
      description,
      project: projectId,
    });

    return res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const projectId = req.params.projectId;

    const project = await Project.findOne({
      _id: projectId,
      owner: req.user.id,
    });
    if (!project) {
      return res.status(403).json({ message: "Unauthorized project access" });
    }

    const tasks = await Task.find({ project: projectId }).sort({
      createdAt: -1,
    });
    if (tasks.length === 0) {
      return res.status(200).json({ message: "No tasks found" });
    }
    return res
      .status(200)
      .json({ message: "Task retrieved successfully", tasks });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = status;
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
