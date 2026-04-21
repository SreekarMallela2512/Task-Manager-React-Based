import { createContext, useContext, useReducer, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'task-manager-tasks';

// Let's grab the tasks from local storage so we don't lose them on a page refresh.
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

const generateId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 9);

// Our reducer handles all the heavy lifting for adding, editing, and deleting tasks safely.
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

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, [], loadTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');

  // Keep our local storage up to date whenever our tasks change.
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // We filter and sort our tasks here so the UI components just get exactly what they need to show.
  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((t) => t.title.toLowerCase().includes(q));
    }

    if (priorityFilter !== 'All') {
      result = result.filter((t) => t.priority === priorityFilter);
    }

    result.sort((a, b) => {
      const da = new Date(a.createdAt);
      const db = new Date(b.createdAt);
      return sortOrder === 'newest' ? db - da : da - db;
    });

    return result;
  }, [tasks, searchQuery, priorityFilter, sortOrder]);

  const addTask = (task) => dispatch({ type: 'ADD_TASK', payload: task });
  const deleteTask = (id) => dispatch({ type: 'DELETE_TASK', payload: id });
  const editTask = (id, updates) => dispatch({ type: 'EDIT_TASK', payload: { id, updates } });

  // Bundle everything up nicely so any component can use these values and actions.
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

// A handy custom hook to make using the context a breeze in our components.
export const useTask = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('Oops! useTask must be used within a TaskProvider.');
  return ctx;
};
