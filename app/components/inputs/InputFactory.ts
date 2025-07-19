import TextInput from './TextInput.vue';
import SelectInput from './SelectInput.vue';
import type { InputType } from '@/types';

export function createInput(type: InputType) {
  switch (type) {
    case 'select': return SelectInput;
    case 'text':
    default:
      return TextInput;
  }
}
