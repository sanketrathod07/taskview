import axios from 'axios';
import { Project, ProjectInput } from '../types/project';

const API_URL = 'http://localhost:8000/api';

// Set up axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Get all projects for the current user
export const getProjects = async (): Promise<Project[]> => {
  try {
    const response = await api.get('/projects');
    return response.data.projects;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch projects');
  }
};

// Get a project by ID
export const getProjectById = async (projectId: string): Promise<Project> => {
  try {
    const response = await api.get(`/projects/${projectId}`);
    return response.data.project;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch project');
  }
};

// Create a new project
export const createProject = async (projectData: ProjectInput): Promise<Project> => {
  try {
    const response = await api.post('/projects', projectData);
    return response.data.project;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create project');
  }
};

// Update a project
export const updateProject = async (
  projectId: string,
  projectData: Partial<ProjectInput>
): Promise<Project> => {
  try {
    const response = await api.put(`/projects/${projectId}`, projectData);
    return response.data.project;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update project');
  }
};

// Delete a project
export const deleteProject = async (projectId: string): Promise<void> => {
  try {
    await api.delete(`/projects/${projectId}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete project');
  }
};

export const getTasksByProjectId = async (projectId: string) => {
  const response = await api.get(`/tasks?projectId=${projectId}`);
  return response.data.tasks;
};