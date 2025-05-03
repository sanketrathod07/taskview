import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useProjects } from '../../hooks/useProjects';
import { deleteProject } from '../../services/projectService';


type EditProjectModalProps = {
    project: { id: string; name: string; description: string };
    projectId: string;
    isOpen: boolean;
    onClose: () => void;
};

const EditProjectModal = ({ project, projectId, isOpen, onClose }: EditProjectModalProps) => {

    const [name, setName] = useState(project.name || '');
    const [description, setDescription] = useState(project.description || '');
    const { updateProject, isUpdating } = useProjects();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) return;

        try {
            await updateProject({
                projectId: projectId,
                projectData: {
                    name,
                    description,
                },
            });
            onClose();
        } catch (error) {
            console.error('Update failed:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 z-[-1] pointer-events-none" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <motion.div
                    className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                >
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Edit Project</h3>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="form-label">Project Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    className="form-input"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter project name"
                                    maxLength={50}
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="description" className="form-label">Description (Optional)</label>
                                <textarea
                                    id="description"
                                    className="form-input min-h-[100px]"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter project description"
                                    maxLength={200}
                                />
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    className="btn-outline"
                                    onClick={onClose}
                                    disabled={isUpdating}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn-primary"
                                    disabled={!name.trim() || isUpdating}
                                >
                                    {isUpdating ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default EditProjectModal;