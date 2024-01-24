import { Task } from '../types/task';
import { client } from './fetchTask';

export const getAllTasks = () => {
  return client.get<Task>('/tasks');
};

export const getTask = (id: number) => {
  return client.get<Task[]>(`/tasks/${id}`);
};

export const addTask = (newTask: Task) => {
  return client.post<Task>('/tasks', newTask);
};

export const deleteTask = (id: number) => {
  return client.delete(`/tasks/${id}`);
};

export const updateTask = (id: number, newTask: object) => {
  return client.patch<Task>(`/tasks/${id}`, newTask);
};
