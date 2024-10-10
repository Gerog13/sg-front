import { api } from './api';
import { Task } from '@/types/task';

export const getTasks = async (projectId?: string): Promise<Task[]> => {
  return api(`/tasks?project_id=${projectId}`);
};

export const getTask = async (id: string): Promise<Task> => {
  return api(`/tasks/${id}`);
};

export const createTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> => {
  return api('/tasks', 'POST', taskData);
};

export const updateTask = async (id: string, taskData: Partial<Task>): Promise<Task> => {
  return api(`/tasks/${id}`, 'PATCH', taskData);
};

export const deleteTask = async (id: string): Promise<void> => {
  return api(`/tasks/${id}`, 'DELETE');
};