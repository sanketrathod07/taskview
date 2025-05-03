import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, FolderKanban, Settings, PlusCircle } from 'lucide-react';
import { useProjects } from '../../hooks/useProjects';
import CreateProjectModal from '../project/CreateProjectModal';

const Sidebar = () => {
  const location = useLocation();
  const { projects, isLoading } = useProjects();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="md:hidden fixed bottom-4 right-4 z-30 bg-primary-600 text-white p-3 rounded-full shadow-lg"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <LayoutDashboard size={20} />
      </button>

      {/* Sidebar */}
      <motion.aside
        className={`bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 w-64 fixed md:sticky top-0 h-screen overflow-y-auto z-20 transition-all ${isMobileOpen ? 'left-0' : '-left-full md:left-0'
          }`}
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="p-4">
          <div className="flex flex-col h-full">
            {/* Navigation Links */}
            <nav className="space-y-1 mt-4">
              <Link
                to="/dashboard"
                className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${location.pathname === '/dashboard'
                    ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-gray-800'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
              >
                <LayoutDashboard size={18} className="mr-2" />
                <span>Dashboard</span>
              </Link>

              <div className="pt-4">
                <div className="flex items-center justify-between px-3 mb-2">
                  <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Projects
                  </h3>
                  {projects && projects.length < 4 && (
                    <button
                      onClick={() => setIsCreateModalOpen(true)}
                      className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors duration-200"
                    >
                      <PlusCircle size={16} />
                    </button>
                  )}
                </div>

                <div className="space-y-1 ml-2">
                  {isLoading ? (
                    <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                      Loading projects...
                    </div>
                  ) : projects && projects.length > 0 ? (
                    projects.map((project) => (
                      <Link
                        key={project._id}
                        to={`/projects/${project._id}`}
                        className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${location.pathname === `/projects/${project._id}`
                            ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-gray-800'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                      >
                        <FolderKanban size={18} className="mr-2" />
                        <span className="truncate">{project.name}</span>
                      </Link>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                      No projects yet
                    </div>
                  )}
                </div>
              </div>
            </nav>

            {/* Bottom links */}
            <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800">
              <Link
                to="/profile"
                className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${location.pathname === '/profile'
                    ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-gray-800'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
              >
                <Settings size={18} className="mr-2" />
                <span>Settings</span>
              </Link>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Project Creation Modal */}
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
};

export default Sidebar;