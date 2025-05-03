import Task from '../models/Task.js';
import Project from '../models/Project.js';

// Get all tasks for a project
const getTasks = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
      userId: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    const tasks = await Task.find({
      projectId: req.params.projectId,
      userId: req.user._id,
    }).sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, description, status, projectId } = req.body;

    // Check if project exists and belongs to the user
    const project = await Project.findOne({
      _id: projectId,
      userId: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    const task = await Task.create({
      title,
      description,
      status,
      projectId,
      userId: req.user._id,
    });

    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // Update the fields
    if (title) task.title = title;
    if (description !== undefined) task.description = description;
    if (status) {
      task.status = status;
      if (status === 'done' && !task.dateCompleted) {
        task.dateCompleted = new Date();
      } else if (status !== 'done') {
        task.dateCompleted = undefined;
      }
    }

    await task.save();

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update task status
const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // Update status
    task.status = status;

    // Update dateCompleted if status is done
    if (status === 'done' && !task.dateCompleted) {
      task.dateCompleted = new Date();
    } else if (status !== 'done') {
      task.dateCompleted = undefined;
    }

    await task.save();

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTasksByProjectId = async (req, res) => {
  try {
    const { projectId } = req.query;

    if (!projectId) {
      return res.status(400).json({ success: false, message: 'Project ID is required' });
    }

    const tasks = await Task.find({ projectId });
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { getTasks, createTask, updateTask, updateTaskStatus, deleteTask, getTasksByProjectId };