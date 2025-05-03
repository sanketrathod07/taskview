import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    maxlength: [100, 'Task title cannot exceed 100 characters'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Task description cannot exceed 500 characters'],
  },
  status: {
    type: String,
    enum: ['todo', 'inProgress', 'done'],
    default: 'todo',
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateCompleted: {
    type: Date,
  },
}, { timestamps: true });

// Update dateCompleted when status changes to done
taskSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'done' && !this.dateCompleted) {
    this.dateCompleted = new Date();
  }
  next();
});

const Task = mongoose.model('Task', taskSchema);

export default Task;