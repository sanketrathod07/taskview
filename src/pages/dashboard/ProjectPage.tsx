import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Edit2, Trash2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProject } from '../../hooks/useProjects';
import { useTasks } from '../../hooks/useTasks';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import TaskColumn from '../../components/task/TaskColumn';
import CreateTaskModal from '../../components/task/CreateTaskModal';
import { TaskStatus } from '../../types/task';
import EditProjectModal from '../../components/project/EditProjectModal';
import { deleteProject } from '../../services/projectService';

const ProjectPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate(); // Initialize useNavigate
  const { project, isLoading: isLoadingProject } = useProject(projectId || '');
  const {
    tasks,
    isLoading: isLoadingTasks,
    updateTaskStatus,
    deleteTask
  } = useTasks(projectId || '');

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newTaskStatus, setNewTaskStatus] = useState<TaskStatus>('todo');

  if (isLoadingProject || isLoadingTasks) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Project not found</h2>
        <Link to="/dashboard" className="btn-primary">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const todoTasks = tasks?.filter(task => task.status === 'todo') || [];
  const inProgressTasks = tasks?.filter(task => task.status === 'inProgress') || [];
  const doneTasks = tasks?.filter(task => task.status === 'done') || [];

  const handleAddTask = (status: TaskStatus) => {
    setNewTaskStatus(status);
    setIsCreateModalOpen(true);
  };

  const handleStatusChange = async (taskId: string, status: TaskStatus) => {
    await updateTaskStatus({ taskId, status });
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      console.log('Deleting project:', projectId);
      await deleteProject(projectId);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };


  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-4"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Dashboard
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{project.name}</h1>
            {project.description && (
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {project.description}
              </p>
            )}
          </div>

          <div className="mt-4 md:mt-0 flex space-x-2">
            <button
              className="btn-outline inline-flex items-center"
              onClick={() => setIsEditModalOpen(true)}
            >
              <Edit2 size={16} className="mr-1" />
              Edit
            </button>
            <button
              className="btn-outline text-error-600 dark:text-error-400 border-error-200 dark:border-error-800 hover:bg-error-50 dark:hover:bg-error-900/30 inline-flex items-center"
              onClick={() => {
                handleDeleteProject(projectId || '');
              }}
            >
              <Trash2 size={16} className="mr-1" />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <motion.div
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-light dark:shadow-dark"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Tasks</p>
          <p className="text-2xl font-semibold">{tasks?.length || 0}</p>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-light dark:shadow-dark"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">In Progress</p>
          <p className="text-2xl font-semibold">{inProgressTasks.length}</p>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-light dark:shadow-dark"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.2 }}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
          <p className="text-2xl font-semibold">{doneTasks.length}</p>
        </motion.div>
      </div>

      {/* Task Board */}
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TaskColumn
            title="To Do"
            tasks={todoTasks}
            status="todo"
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteTask}
            onAddClick={handleAddTask}
          />

          <TaskColumn
            title="In Progress"
            tasks={inProgressTasks}
            status="inProgress"
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteTask}
            onAddClick={handleAddTask}
          />

          <TaskColumn
            title="Done"
            tasks={doneTasks}
            status="done"
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteTask}
            onAddClick={handleAddTask}
          />
        </div>
      </div>

      {/* Create Task Modal */}
      <CreateTaskModal
        projectId={projectId || ''}
        initialStatus={newTaskStatus}
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {/* Edit Project Modal */}
      <EditProjectModal
        project={{
          id: project._id,
          name: project.name,
          description: project.description || '',
        }}
        projectId={projectId || ''}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
};

export default ProjectPage;