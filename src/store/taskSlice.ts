import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the task structure
interface Task {
  [x: string]: string;
  id: string;
  title: string;
  
  category: 'work' | 'personal' | 'other';
  tags?: string[];
  dueDate?: string; // ISO format
  isCompleted: boolean;
}

// Define the initial state interface
interface TasksState {
  tasks: Task[];
  sortDirection: 'asc' | 'desc';
}

// Load tasks from localStorage
const loadTasksFromLocalStorage = (): Task[] => {
  try {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error('Failed to load tasks from localStorage:', error);
    return [];
  }
};

// Save tasks to localStorage
const saveTasksToLocalStorage = (tasks: Task[]) => {
  try {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks to localStorage:', error);
  }
};

// Initial state
const initialState: TasksState = {
  tasks: loadTasksFromLocalStorage(),
  sortDirection: 'asc',
};

// Create a slice for tasks
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
      saveTasksToLocalStorage(state.tasks);
    },
    editTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        saveTasksToLocalStorage(state.tasks);
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasksToLocalStorage(state.tasks);
    },
    toggleTaskCompletion(state, action: PayloadAction<string>) {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.isCompleted = !task.isCompleted;
        saveTasksToLocalStorage(state.tasks);
      }
    },
    setSortDirection(state, action: PayloadAction<'asc' | 'desc'>) {
      state.sortDirection = action.payload;
    },
    sortTasks(state) {
      state.tasks.sort((a, b) =>
        state.sortDirection === 'asc'
          ? new Date(a.dueDate || '').getTime() - new Date(b.dueDate || '').getTime()
          : new Date(b.dueDate || '').getTime() - new Date(a.dueDate || '').getTime()
      );
    },
    performBatchActions(
      state,
      action: PayloadAction<{ taskIds: string[]; markComplete?: boolean; delete?: boolean }>
    ) {
      const { taskIds, markComplete, delete: deleteTasks } = action.payload;

      if (markComplete !== undefined) {
        state.tasks.forEach((task) => {
          if (taskIds.includes(task.id)) {
            task.isCompleted = markComplete;
          }
        });
      }

      if (deleteTasks) {
        state.tasks = state.tasks.filter((task) => !taskIds.includes(task.id));
      }

      saveTasksToLocalStorage(state.tasks);
    },
    rearrangeTasks(state, action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>) {
      const { sourceIndex, destinationIndex } = action.payload;
      const [movedTask] = state.tasks.splice(sourceIndex, 1);
      state.tasks.splice(destinationIndex, 0, movedTask);
      saveTasksToLocalStorage(state.tasks);
    },
  },
});

// Export actions
export const {
  addTask,
  editTask,
  deleteTask,
  toggleTaskCompletion,
  setSortDirection,
  sortTasks,
  performBatchActions,
  rearrangeTasks,
} = taskSlice.actions;

// Export the reducer
export default taskSlice.reducer;
