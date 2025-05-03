import { Loader2 } from 'lucide-react';

type LoadingSpinnerProps = {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
};

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'text-primary-600 dark:text-primary-400' 
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10',
  };

  return (
    <Loader2 className={`${sizeClasses[size]} ${color} animate-spin`} />
  );
};

export default LoadingSpinner;