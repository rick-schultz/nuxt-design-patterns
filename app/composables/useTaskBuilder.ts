import { reactive } from 'vue';
import type { Priority, Task } from '@/types';

export function useTaskBuilder() {
  const task = reactive({
    id: '',
    title: '',
    description: '',
    dueDate: '',
    priority: 'low' as Priority,
  });

  function setId(id: string) { task.id = id; return builder; }
  function setTitle(title: string) { task.title = title; return builder; }
  function setDescription(desc: string) { task.description = desc; return builder; }
  function setDueDate(date: string) { task.dueDate = date; return builder; }
  function setPriority(priority: Priority) { task.priority = priority; return builder; }

  function build(): Task {
    return { ...task };
  }

  const builder = {
    setId,
    setTitle,
    setDescription,
    setDueDate,
    setPriority,
    build,
  };
  return builder;
}
