import { ApiClient } from '@/plugins/apiClient';
import type { Task } from '@/types';

const api = ApiClient.getInstance();

export const taskService = {
  async fetchTasks(): Promise<Task[]> {
    return api.get('tasks');
  },
  async createTask(task: Omit<Task, 'id'>): Promise<Task> {
    // api.post would be used here if the API supported it
    return { ...task, id: String(Date.now()) };
  },
};
