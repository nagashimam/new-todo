import { ReadTodoDto } from '@todo/api-interfaces';

export interface Todo extends ReadTodoDto {
  isBeingEdited: boolean;
}
