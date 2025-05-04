import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, FolderKanban, BarChart2, LayoutGrid } from 'lucide-react';
import { useProjects } from '../../hooks/useProjects';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import CreateProjectModal from '../../components/project/CreateProjectModal';
import { getTasksByProjectId } from '../../services/projectService';


const Dashboard = () => {
  const { projects, isLoading } = useProjects();
  const { user } = useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);

  useEffect(() => {
    const fetchTaskData = async () => {
      let total = 0;
      let completed = 0;

      if (projects && projects.length > 0) {
        for (const project of projects) {
          const tasks = await getTasksByProjectId(project._id); // Fetch tasks for each project
          total += tasks.length;
          completed += tasks.filter((task) => task.status === 'done').length;
        }
      }

      setTotalTasks(total);
      setCompletedTasks(completed);
    };

    fetchTaskData();
  }, [projects]);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const canCreateProject = !projects || projects.length < 4;

  // Calculate average completion percentage
  const averageCompletion = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;


  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back, {user?.name || 'User'}
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="mt-4 md:mt-0 btn-primary inline-flex items-center"
          disabled={!canCreateProject}
          title={!canCreateProject ? "Maximum 4 projects allowed" : "Create new project"}
        >
          <Plus size={18} className="mr-2" />
          New Project
        </button>
      </div>

      {/* Projects Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-light dark:shadow-dark p-6 mb-8">
        <div className="flex items-center mb-6">
          <FolderKanban size={20} className="text-primary-600 dark:text-primary-400 mr-2" />
          <h2 className="text-lg font-semibold">Your Projects</h2>
          <span className="ml-2 text-gray-500 dark:text-gray-400 text-sm">
            ({projects ? projects.length : 0}/4)
          </span>
        </div>

        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {projects.map((project) => (
                <motion.div
                  key={project._id}
                  className="bg-gray-50 dark:bg-gray-900 rounded-lg shadow-light dark:shadow-dark overflow-hidden hover:shadow-light-md dark:hover:shadow-dark-md transition-all duration-200"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to={`/projects/${project._id}`} className="block p-6">
                    <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                      {project.name}
                    </h3>
                    {project.description && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>
                    )}

                    {/* Task stats */}
                    <div className="flex items-center justify-between mt-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <LayoutGrid size={16} className="mr-1" />
                        <span>{project.taskCount || 0} tasks</span>
                      </div>
                      <div>
                        {new Date(project.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="bg-gray-100 dark:bg-gray-900 inline-flex rounded-full p-3 mb-4">
              <FolderKanban size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No projects yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create your first project to get started
            </p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="btn-primary"
            >
              Create Project
            </button>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-light dark:shadow-dark p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Projects</h3>
            <div className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 p-2 rounded-lg">
              <FolderKanban size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold">{projects ? projects.length : 0}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Total projects</p>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-light dark:shadow-dark p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Tasks</h3>
            <div className="bg-secondary-100 dark:bg-secondary-900 text-secondary-600 dark:text-secondary-400 p-2 rounded-lg">
              <LayoutGrid size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold">
            {projects?.reduce((total, project) => total + (project.taskCount || 0), 0) || 0}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Total tasks</p>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-light dark:shadow-dark p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Completion</h3>
            <div className="bg-accent-100 dark:bg-accent-900 text-accent-600 dark:text-accent-400 p-2 rounded-lg">
              <BarChart2 size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold">
            {projects && projects.length > 0 ? `${averageCompletion}%` : '-'}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Average completion</p>
        </motion.div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'profile' && (
            <motion.div
              key="profile-tab" // Unique key for the profile tab
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Profile content */}
            </motion.div>
          )}
          {activeTab === 'security' && (
            <motion.div
              key="security-tab" // Unique key for the security tab
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Security content */}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;