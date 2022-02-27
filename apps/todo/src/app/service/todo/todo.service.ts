import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Todo, Prisma } from '@prisma/client';
import { TodoStore } from './todo.store';
import { UserQuery } from '../user/user.query';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly endpoint = `${environment.endpoint}/todo`;

  constructor(
    private httpClient: HttpClient,
    private todoStore: TodoStore,
    private userQuery: UserQuery
  ) {}

  findMany() {
    this.httpClient
      .put<Todo[]>(this.endpoint, {
        userId: this.userQuery.getValue().id,
      })
      .subscribe((todos) => {
        this.todoStore.set(todos);
      });
  }

  create(title: string) {
    const user: Prisma.UserCreateNestedOneWithoutTodoInput = {
      connect: {
        id: this.userQuery.getValue().id,
      },
    };
    const data = {
      title,
      user,
    };
    this.httpClient.post<Todo>(this.endpoint, data).subscribe((todo) => {
      this.todoStore.add(todo);
    });
  }

  delete(id: number) {
    this.httpClient
      .delete<Todo>(this.endpoint, { body: { id } })
      .subscribe((deletedTodo) => {
        this.todoStore.remove(deletedTodo.id);
      });
  }

  update(data: Prisma.TodoUpdateInput & Prisma.TodoWhereUniqueInput) {
    this.httpClient
      .patch<Todo>(this.endpoint, data)
      .subscribe((updatedTodo) => {
        this.todoStore.update(updatedTodo.id, (_) => updatedTodo);
      });
  }
}
