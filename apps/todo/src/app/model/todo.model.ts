import { Todo } from '@prisma/client';

export interface ClientTodo extends Todo {
  isBeingEdited: boolean;
}
