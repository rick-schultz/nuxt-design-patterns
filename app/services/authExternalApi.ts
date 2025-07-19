export async function externalLogin(username: string, password: string) {
  // Simulação delay e retorno da API externa
  await new Promise((r) => setTimeout(r, 500));
  if (username === 'rick' && password === '1234') {
    return {
      user_id: 'u123',
      user_name: 'Rick Schultz',
      token_value: 'token_abc_123',
    };
  }
  throw new Error('Invalid credentials');
}
