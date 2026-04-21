// This is the entry point of the app.
// We wrap everything in React's StrictMode so we catch common mistakes early,
// and in TaskProvider so every component can access the shared task state.

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { TaskProvider } from './context/TaskContext';
import App from './App.jsx';
import './App.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* TaskProvider makes task data and actions available to the whole app */}
    <TaskProvider>
      <App />
    </TaskProvider>
  </StrictMode>,
);
