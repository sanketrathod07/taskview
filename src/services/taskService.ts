import axios from 'axios';
import { Task, TaskInput, TaskStatus } from '../types/task';

const API_URL = 'https://taskview-backend.onrender.com/api';

// Set up axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Get all tasks for a project
export const getTasks = async (projectId: string): Promise<Task[]> => {
  try {
    const response = await api.get(`/projects/${projectId}/tasks`);
    return response.data.tasks;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch tasks');
  }
};

// Create a new task
export const createTask = async (taskData: TaskInput): Promise<Task> => {
  try {
    const response = await api.post(`/projects/${taskData.projectId}/tasks`, taskData);
    return response.data.task;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create task');
  }
};

// Update a task
export const updateTask = async (
  taskId: string,
  taskData: Partial<TaskInput>
): Promise<Task> => {
  try {
    const response = await api.put(`/tasks/${taskId}`, taskData);
    return response.data.task;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update task');
  }
};

// Update task status
export const updateTaskStatus = async (
  taskId: string,
  status: TaskStatus
): Promise<Task> => {
  try {
    const response = await api.patch(`/tasks/${taskId}/status`, { status });
    return response.data.task;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update task status');
  }
};

// Delete a task
export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    await api.delete(`/tasks/${taskId}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete task');
  }
};