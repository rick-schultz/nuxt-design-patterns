import { ApiClient } from '@/plugins/apiClient';
import type { Task } from '@/types';

const api = ApiClient.getInstance();

export const taskService = {
  async fetchTasks(): Promise<Task[]> {
    return api.get('tasks');
  },
  async createTask(task: Omit<Task, 'id'>): Promise<Task> {
    // Aqui você pode usar api.post, simulação
    return { ...task, id: String(Date.now()) };
  },
};
