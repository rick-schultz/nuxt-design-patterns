import type { Task, Priority } from '@/types';

export const taskSortStrategies = {
  byDateAsc: (tasks: Task[]) => [...tasks].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()),
  byPriorityDesc: (tasks: Task[]) => [...tasks].sort((a, b) => {
    const priorityValue: Record<Priority, number> = { low: 1, medium: 2, high: 3 };
    return priorityValue[b.priority] - priorityValue[a.priority];
  }),
  byTitleAsc: (tasks: Task[]) => [...tasks].sort((a, b) => a.title.localeCompare(b.title)),
};
