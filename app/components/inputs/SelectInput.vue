<template>
  <select :value="modelValue" @input="updateValue" class="border p-2 rounded w-full">
    <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
  </select>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{ modelValue: string; options: { label: string; value: string }[] }>();
const emit = defineEmits(['update:modelValue']);

function updateValue(event: Event) {
  emit('update:modelValue', (event.target as HTMLSelectElement).value);
}
</script>
