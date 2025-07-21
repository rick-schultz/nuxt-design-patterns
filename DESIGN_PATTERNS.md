# Documentação Detalhada dos Design Patterns

Este documento fornece uma explicação detalhada de cada um dos 9 Design Patterns implementados no projeto.

## Padrões Criacionais

### 1. Singleton Pattern
**Arquivo:** `plugins/apiClient.ts`

```typescript
export class ApiClient {
  private static instance: ApiClient;
  
  static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }
}
```

**Vantagens:**
- Garantia de uma única instância
- Controle sobre acesso global
- Economia de recursos

### 2. Builder Pattern
**Arquivo:** `composables/useTaskBuilder.ts`

```typescript
export function useTaskBuilder() {
  const task = reactive({...});
  
  function setId(id: string) { task.id = id; return builder; }
  function setTitle(title: string) { task.title = title; return builder; }
  // Interface fluente
  
  function build(): Task {
    return { ...task };
  }
}
```

**Vantagens:**
- Construção passo a passo
- Interface fluente
- Código mais legível

### 3. Factory Method Pattern
**Arquivo:** `components/inputs/InputFactory.ts`

```typescript
export function createInput(type: InputType) {
  switch (type) {
    case 'select': return SelectInput;
    case 'text':
    default:
      return TextInput;
  }
}
```

**Vantagens:**
- Criação dinâmica de objetos
- Baixo acoplamento
- Fácil extensão

## Padrões Estruturais

### 4. Facade Pattern
**Arquivo:** `services/taskService.ts`

```typescript
export const taskService = {
  async fetchTasks(): Promise<Task[]> {
    return api.get('tasks');
  },
  async createTask(task: Omit<Task, 'id'>): Promise<Task> {
    return { ...task, id: String(Date.now()) };
  },
};
```

**Vantagens:**
- Interface simplificada
- Esconde complexidade
- Fácil manutenção

### 5. Adapter Pattern
**Arquivo:** `services/authAdapter.ts`

```typescript
export async function login(username: string, password: string) {
  const response = await externalLogin(username, password);
  return {
    id: response.user_id,        // Adaptação de campo
    name: response.user_name,    // Adaptação de campo
    token: response.token_value, // Adaptação de campo
  };
}
```

**Vantagens:**
- Integração de APIs diferentes
- Conversão de formatos
- Isolamento de mudanças externas

### 6. Decorator Pattern
**Arquivo:** `decorators/withLogger.ts`

```typescript
export function withLogger(component: any) {
  return defineComponent({
    name: `WithLogger(${component.name})`,
    setup(props, ctx) {
      onMounted(() => {
        console.log(`Componente ${component.name} montado`);
      });
      return () => component.setup?.(props, ctx) || component.render?.();
    },
  });
}
```

**Vantagens:**
- Adiciona funcionalidades dinamicamente
- Não modifica código original
- Composição flexível

## Padrões Comportamentais

### 7. Observer Pattern
**Arquivo:** `composables/useEventBus.ts`

```typescript
import mitt from 'mitt';

const emitter = mitt();

export default function useEventBus() {
  return {
    on: emitter.on,
    emit: emitter.emit,
    off: emitter.off,
  };
}
```

**Vantagens:**
- Baixo acoplamento
- Comunicação entre componentes
- Reatividade

### 8. Strategy Pattern
**Arquivo:** `strategies/taskSortStrategy.ts`

```typescript
export const taskSortStrategies = {
  byDateAsc: (tasks: Task[]) => [...tasks].sort((a, b) => 
    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  ),
  byPriorityDesc: (tasks: Task[]) => [...tasks].sort((a, b) => {
    const priorityValue: Record<Priority, number> = { low: 1, medium: 2, high: 3 };
    return priorityValue[b.priority] - priorityValue[a.priority];
  }),
  byTitleAsc: (tasks: Task[]) => [...tasks].sort((a, b) => 
    a.title.localeCompare(b.title)
  ),
};
```

**Vantagens:**
- Algoritmos intercambiáveis
- Fácil adição de novas estratégias
- Princípio aberto/fechado

### 9. Command Pattern
**Arquivo:** `utils/commandManager.ts`

```typescript
export class CommandManager {
  private history: Command[] = [];
  private undone: Command[] = [];

  executeCommand(command: Command) {
    command.execute();
    this.history.push(command);
    this.undone = [];
  }

  undo() {
    const command = this.history.pop();
    if (command) {
      command.undo();
      this.undone.push(command);
    }
  }

  redo() {
    const command = this.undone.pop();
    if (command) {
      command.execute();
      this.history.push(command);
    }
  }
}
```

**Vantagens:**
- Operações undo/redo
- Encapsulamento de ações
- Histórico de comandos

## Benefícios da Implementação

### Manutenibilidade
- Código organizado por responsabilidades
- Fácil localização de funcionalidades
- Padrões reconhecíveis

### Escalabilidade
- Fácil adição de novos tipos
- Extensibilidade sem modificação
- Baixo acoplamento

### Testabilidade
- Componentes isolados
- Mocks simplificados
- Teste de unidade facilitado

### Reusabilidade
- Padrões reutilizáveis
- Código DRY (Don't Repeat Yourself)
- Componentização eficaz
