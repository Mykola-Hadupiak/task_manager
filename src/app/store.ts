import { configureStore } from '@reduxjs/toolkit';
import tasksSlicer from '../features/tasks/tasksSlicer';

export const store = configureStore({
  reducer: {
    tasks: tasksSlicer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
