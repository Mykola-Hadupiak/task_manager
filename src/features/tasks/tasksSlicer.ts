/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Task } from '../../types/task';

export interface TasksState {
  tasks: Task[];
  taskToEdit: Task | null;
}

const initialState: TasksState = {
  tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
  taskToEdit: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    setEdit: (state, action: PayloadAction<Task>) => {
      state.taskToEdit = action.payload;
    },
    removeEdit: (state) => {
      state.taskToEdit = null;
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const taskToUpdate = state.tasks
        .find(task => task.id === action.payload.id);

      if (taskToUpdate) {
        Object.assign(taskToUpdate, action.payload);
      }

      state.taskToEdit = null;
    },
  },
});

export const {
  addTask,
  removeTask,
  setEdit,
  removeEdit,
  updateTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
