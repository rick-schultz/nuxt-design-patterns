let instance: ApiClient | null = null;

export class ApiClient {
  private constructor(private baseUrl: string) {}

  static getInstance(baseUrl = 'https://api.example.com') {
    if (!instance) instance = new ApiClient(baseUrl);
    return instance;
  }

  async get(endpoint: string) {
    // Aqui você pode adicionar token, headers, etc
    const res = await fetch(`${this.baseUrl}/${endpoint}`);
    if (!res.ok) throw new Error('Erro na requisição');
    return res.json();
  }
}
