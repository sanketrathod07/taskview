export interface Project {
  _id: string;
  name: string;
  description?: string;
  userId: string;
  taskCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectInput {
  name: string;
  description?: string;
}