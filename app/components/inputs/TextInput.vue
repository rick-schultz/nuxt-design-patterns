<template>
  <input
    type="text"
    :value="modelValue"
    @input="updateValue"
    class="border p-2 rounded w-full"
    :placeholder="placeholder"
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{ modelValue: string; placeholder?: string }>();
const emit = defineEmits(['update:modelValue']);

function updateValue(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
}
</script>
