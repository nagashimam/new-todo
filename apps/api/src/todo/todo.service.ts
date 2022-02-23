import { Injectable } from '@nestjs/common';
import {
  UpdateTodoDto,
  CreateTodoDto,
  ReadTodoDto,
} from '@todo/api-interfaces';

const todos: ReadTodoDto[] = [
  { id: 'one', title: '確定申告' },
  { id: 'two', title: '温泉予約' },
];

@Injectable()
export class TodoService {
  create(createTodoDto: CreateTodoDto): Promise<ReadTodoDto[]> {
    const id = new Date().getTime().toString();
    todos.push({ id, title: createTodoDto.title });
    return Promise.resolve(todos);
  }

  findAll(): Promise<ReadTodoDto[]> {
    return Promise.resolve(todos);
  }

  findOne(id: string): Promise<ReadTodoDto> {
    return Promise.resolve(todos.find((todo) => todo.id === id));
  }

  update(id: string, updateTodoDto: UpdateTodoDto): Promise<ReadTodoDto[]> {
    todos.forEach((todo) => {
      if (todo.id === id) {
        todo.title = updateTodoDto.title;
      }
    });
    return Promise.resolve(todos);
  }

  remove(id: string): Promise<ReadTodoDto[]> {
    todos.forEach((todo, index) => {
      if (todo.id === id) {
        todos.splice(index, 1);
      }
    });
    return Promise.resolve(todos);
  }
}
