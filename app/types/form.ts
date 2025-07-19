import type { Priority } from './task';

export interface TaskFormData {
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
}

export interface FormField {
  name: keyof TaskFormData;
  type: 'text' | 'select';
  props: Record<string, any>;
}
