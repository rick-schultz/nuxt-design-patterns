<template>
  <div>
    <h2 class="text-xl font-bold mb-4">Lista de Tarefas</h2>
    <div class="flex gap-2 mb-4">
      <button
        v-for="strategy in sortOptions"
        :key="strategy.key"
        @click="setSort(strategy.key)"
        :class="['px-3 py-1 rounded', sortType === strategy.key ? 'bg-blue-600 text-white' : 'bg-gray-200']"
      >
        {{ strategy.label }}
      </button>
    </div>

    <ul>
      <li v-for="task in sortedTasks" :key="task.id" class="mb-2 border p-2 rounded flex justify-between">
        <div>
          <strong>{{ task.title }}</strong> — {{ task.dueDate }} — Prioridade: {{ task.priority }}
        </div>
        <button @click="removeTask(task)" class="text-red-600 hover:underline">Remover</button>
      </li>
    </ul>

    <div class="mt-4 flex gap-2">
      <button @click="undo" class="bg-yellow-400 px-4 py-2 rounded">Desfazer</button>
      <button @click="redo" class="bg-green-400 px-4 py-2 rounded">Refazer</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import useEventBus from '@/composables/useEventBus';
import { taskSortStrategies } from '@/strategies/taskSortStrategy';
import { CommandManager } from '@/utils/commandManager';
import type { Task, Priority, SortType, SortOption } from '@/types';

const bus = useEventBus();

const tasks = ref<Task[]>([]);

const sortType = ref<SortType>('byDateAsc');

const sortedTasks = computed(() => {
  return taskSortStrategies[sortType.value](tasks.value) as Task[];
});

const sortOptions: SortOption[] = [
  { key: 'byDateAsc', label: 'Data ↑' },
  { key: 'byPriorityDesc', label: 'Prioridade ↓' },
  { key: 'byTitleAsc', label: 'Título ↑' },
];

const commandManager = new CommandManager();

function setSort(key: SortType) {
  sortType.value = key;
}

function addTaskCommand(task: any) {
  return {
    execute: () => tasks.value.push(task),
    undo: () => {
      const index = tasks.value.findIndex(t => t.id === task.id);
      if (index > -1) tasks.value.splice(index, 1);
    },
  };
}

function removeTaskCommand(task: any) {
  return {
    execute: () => {
      const index = tasks.value.findIndex(t => t.id === task.id);
      if (index > -1) tasks.value.splice(index, 1);
    },
    undo: () => tasks.value.push(task),
  };
}

bus.on('task-added', (task) => {
  commandManager.executeCommand(addTaskCommand(task));
});

function removeTask(task: any) {
  commandManager.executeCommand(removeTaskCommand(task));
}

function undo() {
  commandManager.undo();
}

function redo() {
  commandManager.redo();
}

tasks.value = [
  { id: '1', title: 'Tarefa 1', dueDate: '2025-07-20', priority: 'medium' as Priority },
  { id: '2', title: 'Tarefa 2', dueDate: '2025-07-18', priority: 'high' as Priority },
];
</script>
