<template>
  <form @submit.prevent="submit" class="space-y-4 max-w-md">
    <component
      v-for="field in fields"
      :key="field.name"
      :is="getInputComponent(field.type)"
      v-model="formData[field.name]"
      v-bind="field.props"
    />
    <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded">Salvar Tarefa</button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { createInput } from './inputs/InputFactory';
import { useTaskBuilder } from '@/composables/useTaskBuilder';
import useEventBus from '@/composables/useEventBus';
import type { Priority, TaskFormData, FormField } from '@/types';

const fields: FormField[] = [
  { name: 'title', type: 'text', props: { placeholder: 'Título' } },
  { name: 'description', type: 'text', props: { placeholder: 'Descrição' } },
  { name: 'dueDate', type: 'text', props: { placeholder: 'Data de vencimento (YYYY-MM-DD)' } },
  {
    name: 'priority',
    type: 'select',
    props: { options: [
      { label: 'Baixa', value: 'low' },
      { label: 'Média', value: 'medium' },
      { label: 'Alta', value: 'high' }
    ]},
  },
];

const formData: TaskFormData = reactive({
  title: '',
  description: '',
  dueDate: '',
  priority: 'low' as Priority,
});

function getInputComponent(type: string) {
  return createInput(type as 'text' | 'select');
}

const builder = useTaskBuilder();
const bus = useEventBus();

function submit() {
  builder
    .setId(String(Date.now()))
    .setTitle(formData.title)
    .setDescription(formData.description)
    .setDueDate(formData.dueDate)
    .setPriority(formData.priority);

  const newTask = builder.build();

  bus.emit('task-added', newTask);

  // Resetar formulário se quiser
  formData.title = '';
  formData.description = '';
  formData.dueDate = '';
  formData.priority = 'low';
}
</script>
