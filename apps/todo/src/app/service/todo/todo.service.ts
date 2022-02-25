import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Todo, Prisma } from '@prisma/client';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoSubject = new BehaviorSubject<Todo[]>([]);

  constructor(private httpClient: HttpClient) {}

  get todos$() {
    return this.todoSubject.asObservable();
  }

  findMany() {
    this.httpClient
      .get<Todo[]>(`${environment.endpoint}/todo`)
      .subscribe((todos) => {
        this.todoSubject.next(todos);
      });
  }

  create(data: Prisma.TodoCreateInput) {
    this.httpClient
      .post<Todo>(`${environment.endpoint}/todo`, data)
      .subscribe((todo) => {
        const todos = this.todoSubject.getValue();
        todos.push(todo);
        this.todoSubject.next(todos);
      });
  }

  delete(id: number) {
    this.httpClient
      .delete<Todo>(`${environment.endpoint}/todo/${id}`)
      .subscribe((deletedTodo) => {
        const todos = this.todoSubject.getValue();
        todos.forEach((todo, index) => {
          if (todo.id === deletedTodo.id) {
            todos.splice(index, 1);
          }
        });
        this.todoSubject.next(todos);
      });
  }

  update(id: number, data: Prisma.TodoUpdateInput) {
    this.httpClient
      .patch<Todo>(`${environment.endpoint}/todo/${id}`, data)
      .subscribe((updatedTodo) => {
        const todos = this.todoSubject.getValue();
        todos.forEach((todo, index) => {
          if (todo.id === updatedTodo.id) {
            todos[index] = updatedTodo;
          }
        });
        this.todoSubject.next(todos);
      });
  }
}
