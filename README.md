# Nuxt Design Patterns

Este projeto é uma demonstração completa de como aplicar **9 Design Patterns clássicos** utilizando Nuxt 3, TypeScript e Tailwind CSS, organizados nas três categorias principais.

---

## Design Patterns aplicados

### **Padrões Criacionais (3)**

#### 1. Singleton
- **O que é:** Garante que uma classe tenha apenas uma instância.
- **Onde está:** `plugins/apiClient.ts`
- **Para quê:** Centralizar chamadas HTTP numa única instância reutilizável.

#### 2. Builder
- **O que é:** Constrói objetos complexos passo a passo.
- **Onde está:** `composables/useTaskBuilder.ts`
- **Para quê:** Facilitar a criação de tarefas com interface fluente.

#### 3. Factory Method
- **O que é:** Cria objetos sem especificar suas classes concretas.
- **Onde está:** `components/inputs/InputFactory.ts`
- **Para quê:** Criar diferentes tipos de componentes de input dinamicamente.

### **Padrões Estruturais (3)**

#### 4. Facade
- **O que é:** Simplifica o uso de subsistemas complexos por meio de uma interface simples.
- **Onde está:** `services/taskService.ts`
- **Para quê:** Facilitar o acesso à API de tarefas sem expor detalhes do cliente HTTP.

#### 5. Adapter
- **O que é:** Permite que interfaces incompatíveis trabalhem juntas.
- **Onde está:** `services/authAdapter.ts`
- **Para quê:** Adaptar dados de API externa para o formato interno da aplicação.

#### 6. Decorator
- **O que é:** Adiciona comportamentos a objetos dinamicamente sem alterar sua estrutura.
- **Onde está:** `decorators/withLogger.ts`
- **Para quê:** Adicionar funcionalidade de log aos componentes Vue.

### **Padrões Comportamentais (3)**

#### 7. Observer
- **O que é:** Permite comunicação por eventos entre partes desacopladas da aplicação.
- **Onde está:** `composables/useEventBus.ts`
- **Para quê:** Notificar componentes sobre eventos, como a adição de uma nova tarefa.

#### 8. Strategy
- **O que é:** Define uma família de algoritmos e os torna intercambiáveis.
- **Onde está:** `strategies/taskSortStrategy.ts`
- **Para quê:** Alternar entre diferentes algoritmos de ordenação de tarefas.

#### 9. Command
- **O que é:** Encapsula solicitações como objetos, permitindo desfazer/refazer operações.
- **Onde está:** `utils/commandManager.ts`
- **Para quê:** Implementar funcionalidades de undo/redo para ações de tarefas.

---

## **Como os Padrões Trabalham Juntos**

### Fluxo de Criação de Tarefa:
1. **Factory** cria o componente de input apropriado
2. **Builder** constrói o objeto tarefa com interface fluente
3. **Command** encapsula a ação de adicionar tarefa (permitindo undo/redo)
4. **Observer** notifica outros componentes sobre a nova tarefa
5. **Strategy** aplica a ordenação escolhida à lista
6. **Facade** simplifica chamadas à API
7. **Singleton** garante uma única instância do cliente HTTP
8. **Adapter** adapta dados de APIs externas
9. **Decorator** adiciona logs aos componentes

### Organização de Tipos:
- Todos os tipos TypeScript estão centralizados em `/app/types/`
- Facilita manutenção e reutilização
- Melhor experiência de desenvolvimento com autocomplete

---

## Exemplo prático: Página inicial (`pages/index.vue`)

- Carrega a lista de tarefas usando o Facade `taskService`.
- Escuta eventos de novas tarefas usando o EventBus (Observer).
- Emite eventos ao criar novas tarefas simuladas.

---

## **Documentação Completa**

- **README.md** - Visão geral e instruções básicas
- **DESIGN_PATTERNS.md** - Documentação detalhada de cada padrão com exemplos
- **app/types/README.md** - Documentação da organização de tipos TypeScript

---

## Como rodar

1. Instale dependências:
```bash
npm install
