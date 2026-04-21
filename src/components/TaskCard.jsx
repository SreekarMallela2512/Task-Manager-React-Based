import { useState, useEffect } from 'react';
import { useTask } from '../context/TaskContext';
import { HiOutlinePencilSquare, HiOutlineTrash, HiOutlineClock } from 'react-icons/hi2';

const TaskCard = ({ task, onEdit }) => {
  const { deleteTask } = useTask();
  const [showConfirm, setShowConfirm] = useState(false);

  // We assign a color and pulse effect based on the priority to make important tasks pop out.
  const priorityConfig = {
    High: { badge: 'bg-red-500/15 text-red-400', dot: 'high' },
    Medium: { badge: 'bg-amber-500/15 text-amber-400', dot: 'medium' },
    Low: { badge: 'bg-green-500/15 text-green-400', dot: 'low' },
  };

  const config = priorityConfig[task.priority];

  // A helper to make the ISO date string look beautiful and easy to read.
  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    }) + ' · ' + d.toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit',
    });
  };

  // We use a small timeout to clear the confirmation if the user clicks away or changes their mind.
  useEffect(() => {
    let timer;
    if (showConfirm) {
      timer = setTimeout(() => setShowConfirm(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [showConfirm]);

  const handleDelete = () => {
    if (showConfirm) {
      deleteTask(task.id);
    } else {
      setShowConfirm(true);
    }
  };

  return (
    <div className="glass-card p-5 animate-fade-in-up" id={`task-card-${task.id}`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-text-primary truncate">
            {task.title}
          </h3>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium shrink-0 ${config.badge}`}>
          <span className={`priority-dot ${config.dot}`} />
          {task.priority}
        </span>
      </div>

      <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3">
        {task.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-text-muted text-xs">
          <HiOutlineClock className="w-3.5 h-3.5" />
          {formatDate(task.createdAt)}
        </div>

        <div className="flex items-center gap-1">
          <button
            id={`edit-task-${task.id}`}
            onClick={() => onEdit(task)}
            className="p-2 rounded-lg text-text-muted hover:text-brand-400 hover:bg-brand-500/10 transition-all duration-200 cursor-pointer"
            title="Edit task"
          >
            <HiOutlinePencilSquare className="w-4 h-4" />
          </button>
          
          {/* Hitting delete once asks for confirmation, the second click actually removes it. */}
          <button
            id={`delete-task-${task.id}`}
            onClick={handleDelete}
            className={`p-2 rounded-lg transition-all duration-200 cursor-pointer ${
              showConfirm
                ? 'bg-red-500/20 text-red-400'
                : 'text-text-muted hover:text-red-400 hover:bg-red-500/10'
            }`}
            title={showConfirm ? 'Click again to confirm' : 'Delete task'}
          >
            <HiOutlineTrash className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
