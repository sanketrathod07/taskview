import { useState } from 'react';
import { motion } from 'framer-motion';
import { MoreVertical, Edit2, Trash, Check, Clock } from 'lucide-react';
import { formatDistanceToNow } from '../../utils/dateUtils';
import { Task, TaskStatus } from '../../types/task';
import EditTaskModal from './EditTaskModal';

type TaskCardProps = {
  task: Task;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  onDelete: (taskId: string) => void;
};

const TaskCard = ({ task, onStatusChange, onDelete }: TaskCardProps) => {
  const [showActions, setShowActions] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const statusColor = {
    todo: 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-300',
    inProgress: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300',
    done: 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-300',
  };
  
  const statusIcon = {
    todo: <Clock size={14} className="mr-1" />,
    inProgress: <Clock size={14} className="animate-pulse mr-1" />,
    done: <Check size={14} className="mr-1" />,
  };

  return (
    <>
      <motion.div
        className="card card-hover p-4 relative group"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">{task.title}</h3>
          <div className="relative">
            <button 
              onClick={() => setShowActions(!showActions)}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <MoreVertical size={16} />
            </button>
            
            {showActions && (
              <div className="absolute right-0 mt-1 w-36 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1" role="menu">
                  <button
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => {
                      setIsEditModalOpen(true);
                      setShowActions(false);
                    }}
                  >
                    <Edit2 size={14} className="mr-2" /> Edit
                  </button>
                  <button
                    className="flex w-full items-center px-4 py-2 text-sm text-error-600 dark:text-error-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => {
                      onDelete(task._id);
                      setShowActions(false);
                    }}
                  >
                    <Trash size={14} className="mr-2" /> Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 mb-3">
          {task.description}
        </p>
        
        <div className="flex justify-between items-center mt-4">
          <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${statusColor[task.status]}`}>
            {statusIcon[task.status]}
            {task.status === 'todo' ? 'To Do' : task.status === 'inProgress' ? 'In Progress' : 'Done'}
          </span>
          
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {task.dateCreated ? formatDistanceToNow(new Date(task.dateCreated)) : 'Just now'}
          </span>
        </div>
        
        {task.status !== 'done' && (
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
            <div className="flex justify-end space-x-2">
              {task.status === 'todo' && (
                <button
                  onClick={() => onStatusChange(task._id, 'inProgress')}
                  className="text-xs px-2 py-1 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800 rounded"
                >
                  Start Task
                </button>
              )}
              {task.status === 'inProgress' && (
                <button
                  onClick={() => onStatusChange(task._id, 'done')}
                  className="text-xs px-2 py-1 text-success-600 dark:text-success-400 hover:bg-success-50 dark:hover:bg-gray-800 rounded"
                >
                  Complete Task
                </button>
              )}
            </div>
          </div>
        )}
      </motion.div>
      
      {isEditModalOpen && (
        <EditTaskModal
          task={task}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </>
  );
};

export default TaskCard;