import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { Todo } from '../../model/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  readonly todoKey = 'todo';
  private todos$ = new BehaviorSubject<Partial<Todo>[]>([]);

  fetchTodo(): Observable<Partial<Todo>[]> {
    const currentRawTodos = localStorage.getItem(this.todoKey);
    const currentTodos: Partial<Todo>[] = JSON.parse(currentRawTodos || '[]');
    this.todos$.next(currentTodos);
    return this.todos$;
  }

  async addTodo(newTodo: Partial<Todo>): Promise<void> {
    const currentTodos = await firstValueFrom(this.fetchTodo());
    currentTodos.push(newTodo);
    localStorage.setItem(this.todoKey, JSON.stringify(currentTodos));
    this.todos$.next(currentTodos);
  }

  async markAsDone(id: string): Promise<void> {
    const currentTodos = await firstValueFrom(this.fetchTodo());
    const newTodos = currentTodos.filter((todo) => todo.id !== id);
    localStorage.setItem(this.todoKey, JSON.stringify(newTodos));
    this.todos$.next(newTodos);
  }

  async editTodo(newTodo: Partial<Todo>): Promise<void> {
    const currentTodos = await firstValueFrom(this.fetchTodo());
    const newTodos = currentTodos.map((todo) => {
      if (todo.id === newTodo.id) {
        todo.title = newTodo.title;
      }
      return todo;
    });
    localStorage.setItem(this.todoKey, JSON.stringify(newTodos));
    this.todos$.next(newTodos);
  }
}
