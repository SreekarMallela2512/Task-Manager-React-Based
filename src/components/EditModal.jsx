import { useState, useEffect } from 'react';
import { useTask } from '../context/TaskContext';
import { HiOutlineXMark } from 'react-icons/hi2';

const PRIORITIES = ['Low', 'Medium', 'High'];

const EditModal = ({ task, onClose }) => {
  const { editTask } = useTask();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [errors, setErrors] = useState({});

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = 'Title is required';
    if (!description.trim()) errs.description = 'Description is required';
    return errs;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    editTask(task.id, {
      title: title.trim(),
      description: description.trim(),
      priority,
    });
    onClose();
  };

  const priorityColor = {
    Low: 'bg-green-500/15 text-green-400 border-green-500/30',
    Medium: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    High: 'bg-red-500/15 text-red-400 border-red-500/30',
  };

  return (
    <div className="modal-overlay" onClick={onClose} id="edit-modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()} id="edit-modal">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-text-primary">Edit Task</h2>
          <button
            id="close-edit-modal"
            onClick={onClose}
            className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-lighter transition-colors cursor-pointer"
          >
            <HiOutlineXMark className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          {/* Title */}
          <div>
            <label htmlFor="edit-title" className="block text-sm font-medium text-text-secondary mb-1.5">
              Title
            </label>
            <input
              id="edit-title"
              type="text"
              value={title}
              onChange={(e) => { setTitle(e.target.value); setErrors((p) => ({ ...p, title: '' })); }}
              className={`w-full bg-surface-lighter/60 border rounded-xl px-4 py-3 text-text-primary transition-all duration-200
                ${errors.title ? 'border-red-500' : 'border-surface-lighter'}`}
            />
            {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="edit-description" className="block text-sm font-medium text-text-secondary mb-1.5">
              Description
            </label>
            <textarea
              id="edit-description"
              rows={3}
              value={description}
              onChange={(e) => { setDescription(e.target.value); setErrors((p) => ({ ...p, description: '' })); }}
              className={`w-full bg-surface-lighter/60 border rounded-xl px-4 py-3 text-text-primary resize-none transition-all duration-200
                ${errors.description ? 'border-red-500' : 'border-surface-lighter'}`}
            />
            {errors.description && <p className="mt-1 text-xs text-red-400">{errors.description}</p>}
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Priority</label>
            <div className="flex gap-2">
              {PRIORITIES.map((p) => (
                <button
                  key={p}
                  type="button"
                  id={`edit-priority-${p.toLowerCase()}`}
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

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              id="cancel-edit"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-surface-lighter/50 text-text-secondary hover:bg-surface-lighter hover:text-text-primary font-medium transition-all duration-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="save-edit"
              className="flex-1 py-3 rounded-xl bg-brand-600 text-white font-medium hover:bg-brand-500 transition-all duration-200 shadow-lg shadow-brand-600/25 cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
