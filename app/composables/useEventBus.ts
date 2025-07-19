import mitt from 'mitt';

const emitter = mitt();

export default function useEventBus() {
  return {
    emit: emitter.emit,
    on: emitter.on,
    off: emitter.off,
  };
}
