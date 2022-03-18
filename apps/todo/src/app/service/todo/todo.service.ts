import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Todo, Prisma } from '@prisma/client';
import { TodoStore } from './todo.store';
import { AuthService } from '@auth0/auth0-angular';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly endpoint = `${environment.endpoint}/todo`;

  constructor(
    private httpClient: HttpClient,
    private todoStore: TodoStore,
    private authService: AuthService
  ) {}

  async findMany() {
    const user = await firstValueFrom(this.authService.user$);
    if (user) {
      const where: Prisma.TodoWhereInput = {
        userId: user.email,
      };
      this.httpClient
        .put<Todo[]>(this.endpoint, {
          where,
        })
        .subscribe((todos) => {
          this.todoStore.set(todos);
        });
    }
  }

  async create(title: string) {
    const user = await firstValueFrom(this.authService.user$);
    if (user && user.email) {
      const data: Prisma.TodoCreateInput = {
        title,
        userId: user.email,
      };
      this.httpClient.post<Todo>(this.endpoint, data).subscribe((todo) => {
        this.todoStore.add(todo);
      });
    }
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
