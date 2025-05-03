export type TaskStatus = 'todo' | 'inProgress' | 'done';

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  projectId: string;
  userId: string;
  dateCreated: string;
  dateCompleted?: string;
  updatedAt: string;
}

export interface TaskInput {
  title: string;
  description?: string;
  status: TaskStatus;
  projectId: string;
}