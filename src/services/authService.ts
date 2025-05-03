import axios from 'axios';
import { User } from '../types/user';

const API_URL = 'https://taskview-backend.onrender.com/api';

// Set up axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // to handle cookies for authentication
});

// Register a new user
export const registerUser = async (
  name: string,
  email: string,
  password: string,
  country?: string
): Promise<User> => {
  try {
    const response = await api.post('/auth/register', {
      name,
      email,
      password,
      country,
    });
    return response.data.user;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

// Login user
export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    return response.data.user;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Invalid credentials');
  }
};

// Logout user
export const logoutUser = async (): Promise<void> => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout failed', error);
  }
};

// Get current user (check auth status)
export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await api.get('/auth/me');
    return response.data.user;
  } catch (error) {
    throw new Error('Not authenticated');
  }
};

export const updateUser = async (userData: Partial<User>): Promise<User> => {
  try {
    const response = await api.put('/auth/me', userData);
    return response.data.user;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update user at authService');
  }
};

// Change password
export const changePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<{ message: string }> => {
  try {
    const response = await api.put('/users/change-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to change password');
  }
};