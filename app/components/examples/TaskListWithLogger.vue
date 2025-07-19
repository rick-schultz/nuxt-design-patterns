import { withLogger } from '@/decorators/withLogger';
import TaskList from '@/components/TaskList.vue';

// Exemplo de como usar o decorator
export const TaskListWithLogger = withLogger(TaskList);

// Ou você pode usar diretamente em outros componentes:
// export default withLogger(defineComponent({ ... }));
