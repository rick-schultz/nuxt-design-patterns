import { defineComponent, onMounted } from 'vue';

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
