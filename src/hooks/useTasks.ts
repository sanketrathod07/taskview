import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { 
  getTasks, 
  createTask as createTaskService, 
  updateTask as updateTaskService, 
  deleteTask as deleteTaskService,
  updateTaskStatus as updateTaskStatusService 
} from '../services/taskService';
import { TaskInput, TaskStatus } from '../types/task';

export const useTasks = (projectId: string) => {
  const queryClient = useQueryClient();

  const { data: tasks, isLoading, error } = useQuery({
    queryKey: ['tasks', projectId],
    queryFn: () => getTasks(projectId),
    enabled: !!projectId,
  });

  const { mutateAsync: createTask, isPending: isCreating } = useMutation({
    mutationFn: (taskData: TaskInput) => createTaskService(taskData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] });
      toast.success('Task created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create task');
    },
  });

  const { mutateAsync: updateTask, isPending: isUpdating } = useMutation({
    mutationFn: ({ taskId, taskData }: { taskId: string; taskData: Partial<TaskInput> }) =>
      updateTaskService(taskId, taskData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] });
      toast.success('Task updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update task');
    },
  });

  const { mutateAsync: updateTaskStatus, isPending: isUpdatingStatus } = useMutation({
    mutationFn: ({ taskId, status }: { taskId: string; status: TaskStatus }) =>
      updateTaskStatusService(taskId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update task status');
    },
  });

  const { mutateAsync: deleteTask, isPending: isDeleting } = useMutation({
    mutationFn: (taskId: string) => deleteTaskService(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] });
      toast.success('Task deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete task');
    },
  });

  return {
    tasks,
    isLoading,
    error,
    createTask,
    isCreating,
    updateTask,
    isUpdating,
    updateTaskStatus,
    isUpdatingStatus,
    deleteTask,
    isDeleting,
  };
};