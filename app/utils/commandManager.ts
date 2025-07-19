import type { Command } from '@/types';

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
