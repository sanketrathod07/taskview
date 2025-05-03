import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { 
  getProjects, 
  getProjectById, 
  createProject as createProjectService, 
  updateProject as updateProjectService, 
  deleteProject as deleteProjectService 
} from '../services/projectService';
import { Project, ProjectInput } from '../types/project';

export const useProjects = () => {
  const queryClient = useQueryClient();

  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  const { mutateAsync: createProject, isPending: isCreating } = useMutation({
    mutationFn: (projectData: ProjectInput) => createProjectService(projectData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create project');
    },
  });

  const { mutateAsync: updateProject, isPending: isUpdating } = useMutation({
    mutationFn: ({ projectId, projectData }: { projectId: string; projectData: Partial<ProjectInput> }) =>
      updateProjectService(projectId, projectData),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      toast.success('Project updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update project');
    },
  });

  const { mutateAsync: deleteProject, isPending: isDeleting } = useMutation({
    mutationFn: (projectId: string) => deleteProjectService(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete project');
    },
  });

  return {
    projects,
    isLoading,
    error,
    createProject,
    isCreating,
    updateProject,
    isUpdating,
    deleteProject,
    isDeleting,
  };
};

export const useProject = (projectId: string) => {
  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId),
    enabled: !!projectId,
  });

  return {
    project,
    isLoading,
    error,
  };
};