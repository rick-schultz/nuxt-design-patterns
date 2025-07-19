import { externalLogin } from './authExternalApi';

export async function login(username: string, password: string) {
  const response = await externalLogin(username, password);
  return {
    id: response.user_id,
    name: response.user_name,
    token: response.token_value,
  };
}
