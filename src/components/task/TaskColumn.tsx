import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';
import { Task, TaskStatus } from '../../types/task';
import TaskCard from './TaskCard';

type TaskColumnProps = {
  title: string;
  tasks: Task[];
  status: TaskStatus;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  onDelete: (taskId: string) => void;
  onAddClick: (status: TaskStatus) => void;
};

const TaskColumn = ({
  title,
  tasks,
  status,
  onStatusChange,
  onDelete,
  onAddClick,
}: TaskColumnProps) => {
  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-800 dark:text-gray-200">
          {title} <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">({tasks.length})</span>
        </h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
          onClick={() => onAddClick(status)}
        >
          <PlusCircle size={18} />
        </motion.button>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-3 min-h-[200px]">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-32 text-gray-400 dark:text-gray-600 text-sm border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-lg">
            No tasks yet
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskColumn;