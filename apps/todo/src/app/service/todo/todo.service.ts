import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import {
  CreateTodoDto,
  ReadTodoDto,
  UpdateTodoDto,
} from '@todo/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoSubject = new BehaviorSubject<ReadTodoDto[]>([]);

  constructor(private httpClient: HttpClient) {}

  get todos$() {
    return this.todoSubject.asObservable();
  }

  findAll() {
    this.httpClient
      .get<ReadTodoDto[]>(`${environment.endpoint}/todo`)
      .subscribe((todos) => {
        this.todoSubject.next(todos);
      });
  }

  create(createTodoDto: CreateTodoDto) {
    this.httpClient
      .post<ReadTodoDto[]>(`${environment.endpoint}/todo`, createTodoDto)
      .subscribe((todos) => {
        this.todoSubject.next(todos);
      });
  }

  delete(id: string) {
    this.httpClient
      .delete<ReadTodoDto[]>(`${environment.endpoint}/todo/${id}`)
      .subscribe((todos) => {
        this.todoSubject.next(todos);
      });
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    this.httpClient
      .patch<ReadTodoDto[]>(`${environment.endpoint}/todo/${id}`, updateTodoDto)
      .subscribe((todos) => {
        this.todoSubject.next(todos);
      });
  }
}
