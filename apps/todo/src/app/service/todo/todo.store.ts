import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Todo } from '@prisma/client';

export type TodoState = EntityState<Todo>;

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'todo' })
export class TodoStore extends EntityStore<TodoState> {
  constructor() {
    super();
  }
}
