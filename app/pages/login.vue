<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-4">
    <h1 class="text-3xl mb-6">Login</h1>
    <form @submit.prevent="handleLogin" class="flex flex-col gap-4 w-full max-w-sm">
      <input v-model="username" placeholder="Usuário" class="border p-2 rounded" />
      <input v-model="password" placeholder="Senha" type="password" class="border p-2 rounded" />
      <button type="submit" class="bg-blue-600 text-white p-2 rounded">Entrar</button>
    </form>
    <p v-if="error" class="text-red-600 mt-2">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { login } from '@/services/authAdapter';

const username = ref('');
const password = ref('');
const error = ref('');

async function handleLogin() {
  try {
    const user = await login(username.value, password.value);
    alert(`Bem-vindo, ${user.name}!`);
    // Aqui você pode redirecionar ou salvar o usuário no store global
  } catch (e) {
    error.value = 'Falha na autenticação';
  }
}
</script>
