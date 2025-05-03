import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Map, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const ProfilePage = () => {
  const { user, isLoading, updateUserData } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const [formData, setFormData] = useState({
    name: user?.name || '',
    country: user?.country || '',
  });


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">You need to be logged in</h2>
      </div>
    );
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveChanges = async () => {
    console.log('Form data before update:', formData);

    try {
      updateUserData(formData);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">Account Settings</h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-light dark:shadow-dark overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'profile'
              ? 'border-b-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'security'
              ? 'border-b-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            onClick={() => setActiveTab('security')}
          >
            Security
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'profile' ? (
            <motion.div
              key="profile-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-lg font-semibold mb-6">Personal Information</h2>

              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      className="form-input pl-10"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      className="form-input pl-10"
                      placeholder="Your email address"
                      defaultValue={user.email}
                      disabled
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Email address cannot be changed
                  </p>
                </div>

                <div>
                  <label htmlFor="country" className="form-label">Country</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Map size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="country"
                      className="form-input pl-10"
                      placeholder="Your country"
                      value={formData.country}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button className="btn-primary" onClick={handleSaveChanges}>
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="security-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-lg font-semibold mb-6">Change Password</h2>

              <div className="space-y-6">
                <div>
                  <label htmlFor="current-password" className="form-label">Current Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      id="current-password"
                      className="form-input pl-10"
                      placeholder="Enter current password"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="new-password" className="form-label">New Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      id="new-password"
                      className="form-input pl-10"
                      placeholder="Enter new password"
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Password must be at least 6 characters long
                  </p>
                </div>

                <div>
                  <label htmlFor="confirm-password" className="form-label">Confirm New Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      id="confirm-password"
                      className="form-input pl-10"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button className="btn-primary">
                    Update Password
                  </button>
                </div>
              </div>

              <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-error-600 dark:text-error-400 mb-4">Danger Zone</h3>

                <div className="bg-error-50 dark:bg-error-900/30 rounded-lg p-4">
                  <h4 className="text-error-800 dark:text-error-200 font-medium">Delete Account</h4>
                  <p className="text-error-600 dark:text-error-400 text-sm mt-1 mb-3">
                    Once you delete your account, there is no going back. All your data will be permanently removed.
                  </p>
                  <button className="text-sm px-3 py-1.5 text-white bg-error-600 rounded hover:bg-error-700 focus:ring-2 focus:ring-error-500 flex items-center">
                    Delete Account <ArrowRight size={14} className="ml-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;