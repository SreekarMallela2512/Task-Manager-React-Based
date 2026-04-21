# ⚡ Task Manager Pro

A high-performance, responsive task management application built with **React 19** and **Tailwind CSS**. This project demonstrates advanced React patterns for state management and local data persistence.

## 🛠️ Technical Implementation

- **State Management:** Architected using **React Context API** and the **useReducer** hook to manage complex state transitions (CRUD) with a predictable data flow.
- **Dynamic Filtering & Sorting:** Implemented real-time search, priority-based filtering, and chronological sorting using **useMemo** to optimize rendering performance.
- **Persistence Layer:** Integrated **LocalStorage** hooks to synchronize application state with the browser, ensuring zero data loss on refresh.
- **Modern UI/UX:** Styled with **Tailwind CSS 4**, featuring custom animations, a dark-themed glassmorphism aesthetic, and fully responsive layouts.
- **Component Design:** Built with a modular approach, separating concerns between UI components (TaskCard, EditModal) and logic providers (TaskContext).

## 🚀 Key Features

- ✅ **Full CRUD:** Create, Read, Update, and Delete tasks with instant UI updates.
- 🔍 **Real-time Search:** Instantly find tasks by title.
- 📑 **Priority Filtering:** Organize tasks by Low, Medium, or High priority.
- 🕒 **Smart Sorting:** Toggle between newest and oldest tasks.
- 💾 **Auto-Save:** Tasks are automatically persisted to the user's browser.

## 💻 Tech Stack

- **Framework:** React 19 (Functional Components, Hooks)
- **State:** Context API + useReducer
- **Styling:** Tailwind CSS 4
- **Icons:** React Icons
- **Build Tool:** Vite
