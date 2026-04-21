import { useState } from 'react';
import { useTask } from '../context/TaskContext';
import { HiOutlinePlus, HiOutlineSparkles } from 'react-icons/hi2';

const PRIORITIES = ['Low', 'Medium', 'High'];

const TaskForm = () => {
  const { addTask } = useTask();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [errors, setErrors] = useState({});

  // Before adding a task, let's make sure the user didn't leave anything blank.
  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = 'Title is required';
    if (!description.trim()) errs.description = 'Description is required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    addTask({ title: title.trim(), description: description.trim(), priority });
    
    // Clear everything out and close the form so it's fresh for next time.
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setErrors({});
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setErrors({});
    setIsOpen(false);
  };

  const priorityColor = {
    Low: 'bg-green-500/15 text-green-400 border-green-500/30',
    Medium: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    High: 'bg-red-500/15 text-red-400 border-red-500/30',
  };

  // If the form isn't open, we just show a friendly button to get started.
  if (!isOpen) {
    return (
      <button
        id="open-add-task-form"
        onClick={() => setIsOpen(true)}
        className="w-full glass-card flex items-center justify-center gap-3 py-4 px-6
                   text-brand-400 font-medium cursor-pointer
                   hover:bg-brand-500/10 hover:text-brand-300
                   transition-all duration-300 group"
      >
        <span className="p-1.5 rounded-lg bg-brand-500/15 group-hover:bg-brand-500/25 transition-colors">
          <HiOutlinePlus className="w-5 h-5" />
        </span>
        Add New Task
      </button>
    );
  }

  return (
    <form
      id="task-form"
      onSubmit={handleSubmit}
      className="glass-card p-6 space-y-5 animate-fade-in-up"
    >
      <div className="flex items-center gap-2 text-brand-400 mb-1">
        <HiOutlineSparkles className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Create New Task</h2>
      </div>

      <div>
        <label htmlFor="task-title" className="block text-sm font-medium text-text-secondary mb-1.5">
          Title
        </label>
        <input
          id="task-title"
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => { setTitle(e.target.value); setErrors((p) => ({ ...p, title: '' })); }}
          className={`w-full bg-surface-lighter/60 border rounded-xl px-4 py-3 text-text-primary
                      placeholder:text-text-muted transition-all duration-200
                      ${errors.title ? 'border-red-500' : 'border-surface-lighter'}`}
        />
        {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="task-description" className="block text-sm font-medium text-text-secondary mb-1.5">
          Description
        </label>
        <textarea
          id="task-description"
          placeholder="Add some details..."
          rows={3}
          value={description}
          onChange={(e) => { setDescription(e.target.value); setErrors((p) => ({ ...p, description: '' })); }}
          className={`w-full bg-surface-lighter/60 border rounded-xl px-4 py-3 text-text-primary
                      placeholder:text-text-muted transition-all duration-200 resize-none
                      ${errors.description ? 'border-red-500' : 'border-surface-lighter'}`}
        />
        {errors.description && <p className="mt-1 text-xs text-red-400">{errors.description}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Priority
        </label>
        <div className="flex gap-2">
          {/* Let users pick priority levels with color-coded buttons to make it clear. */}
          {PRIORITIES.map((p) => (
            <button
              key={p}
              type="button"
              id={`priority-${p.toLowerCase()}`}
              onClick={() => setPriority(p)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 cursor-pointer
                ${priority === p
                  ? priorityColor[p]
                  : 'bg-surface-lighter/40 text-text-muted border-transparent hover:bg-surface-lighter/70'
                }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-1">
        <button
          type="button"
          id="cancel-add-task"
          onClick={handleCancel}
          className="flex-1 py-3 rounded-xl bg-surface-lighter/50 text-text-secondary
                     hover:bg-surface-lighter hover:text-text-primary
                     font-medium transition-all duration-200 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          id="submit-add-task"
          className="flex-1 py-3 rounded-xl bg-brand-600 text-white font-medium
                     hover:bg-brand-500 transition-all duration-200
                     shadow-lg shadow-brand-600/25 cursor-pointer"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
