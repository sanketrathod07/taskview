import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckSquare, Users, ArrowRight, Clock, Layers, Shield } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container-fluid">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Organize Tasks, <span className="text-primary-600 dark:text-primary-400">Maximize Productivity</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
                TaskFlow helps you manage projects, track tasks, and collaborate with your team seamlessly. Get started for free and take control of your workflow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="btn-primary text-center">
                  Get Started
                </Link>
                <Link to="/login" className="btn-outline text-center">
                  Sign In
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-light-lg dark:shadow-dark-lg p-4 md:p-6">
                <img 
                  src="https://images.pexels.com/photos/7114/laptop-mobile.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="TaskFlow Dashboard" 
                  className="rounded-xl w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container-fluid">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Powerful Features for Any Workflow</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our task tracker comes with everything you need to manage projects efficiently
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-light dark:shadow-dark"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary-600 dark:bg-primary-900">
        <div className="container-fluid">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to boost your productivity?</h2>
              <p className="text-lg text-primary-100 mb-8">
                Join thousands of professionals who use TaskFlow to manage their work efficiently.
              </p>
            </div>
            <div className="lg:w-1/3 flex justify-end">
              <Link 
                to="/register" 
                className="bg-white text-primary-600 hover:bg-primary-50 btn flex items-center justify-center"
              >
                Start For Free <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-12">
        <div className="container-fluid">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <CheckSquare size={24} className="text-primary-600 dark:text-primary-400 mr-2" />
              <span className="font-semibold text-xl">TaskFlow</span>
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                Terms
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                Privacy
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} TaskFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

const features = [
  {
    title: 'Project Management',
    description: 'Create and manage up to 4 projects to keep your work organized and focused.',
    icon: <Layers size={24} />,
  },
  {
    title: 'Task Tracking',
    description: 'Easily track the status of your tasks from To Do to Done with visual indicators.',
    icon: <CheckSquare size={24} />,
  },
  {
    title: 'Secure Authentication',
    description: 'Your data is protected with our secure JWT-based authentication system.',
    icon: <Shield size={24} />,
  },
  {
    title: 'Progress Monitoring',
    description: 'Monitor project progress with intuitive visual indicators and detailed statistics.',
    icon: <Clock size={24} />,
  },
  {
    title: 'User Profiles',
    description: 'Manage your personal information and account settings in one place.',
    icon: <Users size={24} />,
  },
  {
    title: 'Dark Mode',
    description: 'Reduce eye strain with our elegant dark mode, perfect for late-night work sessions.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
    </svg>,
  },
];

export default LandingPage;