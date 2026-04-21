import { useState } from 'react';
import { useTask } from './context/TaskContext';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import SearchBar from './components/SearchBar';
import FilterSort from './components/FilterSort';
import EditModal from './components/EditModal';
import { HiOutlineCheckCircle } from 'react-icons/hi2';
import './App.css';

function App() {
  const { tasks } = useTask();
  const [editingTask, setEditingTask] = useState(null);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* ── Header ── */}
        <header className="text-center space-y-2 pt-4 pb-2 animate-fade-in-up" id="app-header">
          <div className="inline-flex items-center gap-2.5 mb-2">
            <div className="p-2 rounded-xl bg-brand-500/15">
              <HiOutlineCheckCircle className="w-7 h-7 text-brand-400" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-300 via-brand-400 to-purple-400 bg-clip-text text-transparent">
              Task Manager
            </h1>
          </div>
          <p className="text-sm text-text-muted">
            Organize your work, one task at a time
            <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-lighter/60 text-xs text-text-muted">
              {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
            </span>
          </p>
        </header>

        {/* ── Add Task ── */}
        <section id="add-task-section" className="animate-fade-in-up" style={{ animationDelay: '80ms' }}>
          <TaskForm />
        </section>

        {/* ── Search & Filters ── */}
        {tasks.length > 0 && (
          <section id="controls-section" className="space-y-3 animate-fade-in-up" style={{ animationDelay: '160ms' }}>
            <SearchBar />
            <FilterSort />
          </section>
        )}

        {/* ── Task List ── */}
        <section id="task-list-section">
          <TaskList onEdit={setEditingTask} />
        </section>
      </div>

      {/* ── Edit Modal ── */}
      {editingTask && (
        <EditModal task={editingTask} onClose={() => setEditingTask(null)} />
      )}
    </div>
  );
}

export default App;
