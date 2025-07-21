<template>
  <div class="max-w-4xl mx-auto p-6 space-y-8">
    <h1 class="text-4xl font-bold text-center">Gerenciador de Tarefas</h1>

    <TaskForm />

    <TaskList />
  </div>
</template>

<script setup lang="ts">
import TaskForm from '@/components/TaskForm.vue';
import TaskList from '@/components/TaskList.vue';
</script>
