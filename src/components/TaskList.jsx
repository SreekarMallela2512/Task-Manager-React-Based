import { useTask } from '../context/TaskContext';
import TaskCard from './TaskCard';
import { HiOutlineClipboardDocumentList, HiOutlineMagnifyingGlass } from 'react-icons/hi2';

const TaskList = ({ onEdit }) => {
  const { filteredTasks, tasks, searchQuery, priorityFilter } = useTask();

  // If the user hasn't added any tasks yet, show a welcoming empty state.
  if (tasks.length === 0) {
    return (
      <div className="empty-state animate-fade-in">
        <div className="p-4 rounded-2xl bg-brand-500/10 mb-4">
          <HiOutlineClipboardDocumentList className="w-12 h-12 text-brand-400" />
        </div>
        <h3 className="text-lg font-semibold text-text-secondary mb-1">No tasks yet</h3>
        <p className="text-sm text-text-muted max-w-xs">
          Click the "Add New Task" button above to create your first task.
        </p>
      </div>
    );
  }

  // When they're searching but come up empty-handed, we guide them gracefully.
  if (filteredTasks.length === 0) {
    return (
      <div className="empty-state animate-fade-in">
        <div className="p-4 rounded-2xl bg-surface-lighter/50 mb-4">
          <HiOutlineMagnifyingGlass className="w-12 h-12 text-text-muted" />
        </div>
        <h3 className="text-lg font-semibold text-text-secondary mb-1">No matches found</h3>
        <p className="text-sm text-text-muted max-w-xs">
          {searchQuery
            ? `No tasks match "${searchQuery}"`
            : `No ${priorityFilter.toLowerCase()} priority tasks`}
        </p>
      </div>
    );
  }

  // Display the matched tasks in a nicely spaced out list!
  return (
    <div className="space-y-3 stagger-children" id="task-list">
      {filteredTasks.map((task) => (
        <TaskCard key={task.id} task={task} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default TaskList;
