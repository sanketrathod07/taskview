import Project from '../models/Project.js';
import Task from '../models/Task.js';

// Get all projects for the current user
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user._id }).sort({ createdAt: -1 });
    
    // Add task count to each project
    const projectsWithCount = await Promise.all(
      projects.map(async (project) => {
        const taskCount = await project.getTaskCount();
        return {
          ...project._doc,
          taskCount,
        };
      })
    );

    res.status(200).json({
      success: true,
      projects: projectsWithCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get a project by ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    const taskCount = await project.getTaskCount();

    res.status(200).json({
      success: true,
      project: {
        ...project._doc,
        taskCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create a new project
const createProject = async (req, res) => {
  try {
    // Check if user already has 4 projects
    const projectCount = await Project.countDocuments({ userId: req.user._id });
    if (projectCount >= 4) {
      return res.status(400).json({
        success: false,
        message: 'You cannot create more than 4 projects',
      });
    }

    const { name, description } = req.body;

    const project = await Project.create({
      name,
      description,
      userId: req.user._id,
    });

    res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a project
const updateProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await Project.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user._id,
      },
      {
        name,
        description,
      },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a project
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Delete all tasks associated with the project
    await Task.deleteMany({ projectId: project._id });

    // Delete the project
    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { getProjects, getProjectById, createProject, updateProject, deleteProject };