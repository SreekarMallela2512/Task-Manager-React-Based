import { createContext, useContext, useReducer, useEffect, useMemo, useState } from 'react';

/* ─── helpers ─── */
const STORAGE_KEY = 'task-manager-tasks';

const loadTasks = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveTasks = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

const generateId = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 9);

/* ─── reducer ─── */
const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK': {
      const newTask = {
        id: generateId(),
        title: action.payload.title,
        description: action.payload.description,
        priority: action.payload.priority,
        createdAt: new Date().toISOString(),
      };
      return [newTask, ...state];
    }
    case 'DELETE_TASK':
      return state.filter((t) => t.id !== action.payload);

    case 'EDIT_TASK':
      return state.map((t) =>
        t.id === action.payload.id ? { ...t, ...action.payload.updates } : t
      );

    case 'SET_TASKS':
      return action.payload;

    default:
      return state;
  }
};

/* ─── context ─── */
const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, [], loadTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');

  // Persist to localStorage on every change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // Derived: filtered + sorted tasks
  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((t) => t.title.toLowerCase().includes(q));
    }

    // Priority filter
    if (priorityFilter !== 'All') {
      result = result.filter((t) => t.priority === priorityFilter);
    }

    // Sort
    result.sort((a, b) => {
      const da = new Date(a.createdAt);
      const db = new Date(b.createdAt);
      return sortOrder === 'newest' ? db - da : da - db;
    });

    return result;
  }, [tasks, searchQuery, priorityFilter, sortOrder]);

  // Actions
  const addTask = (task) => dispatch({ type: 'ADD_TASK', payload: task });
  const deleteTask = (id) => dispatch({ type: 'DELETE_TASK', payload: id });
  const editTask = (id, updates) =>
    dispatch({ type: 'EDIT_TASK', payload: { id, updates } });

  const value = {
    tasks,
    filteredTasks,
    searchQuery,
    setSearchQuery,
    priorityFilter,
    setPriorityFilter,
    sortOrder,
    setSortOrder,
    addTask,
    deleteTask,
    editTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTask = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTask must be used within a TaskProvider');
  return ctx;
};
