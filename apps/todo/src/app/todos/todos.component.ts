import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ClientTodo } from '../model/todo.model';
import { TodoQuery } from '../service/todo/todo.query';
import { TodoService } from '../service/todo/todo.service';

@Component({
  selector: 'todo-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  @ViewChild('todoInput')
  todoInput: ElementRef | undefined;

  todos: ClientTodo[] = [];

  constructor(
    private todoService: TodoService,
    private todoQuery: TodoQuery,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.todoQuery.selectAll().subscribe((todos) => {
      this.todos = todos.map((todo) => ({
        ...todo,
        isBeingEdited: false,
      }));
    });
    this.todoService.findMany();
  }

  async addTodo(): Promise<void> {
    const title = this.todoInput?.nativeElement.value;
    console.log('title', title);
    if (title) {
      await this.todoService.create(title);
    }
  }

  async markAsDone(id: number): Promise<void> {
    this.todoService.delete(+id);
  }

  startEditing(index: number): void {
    this.todos[index].isBeingEdited = true;
    this.cd.detectChanges();
    const label: HTMLElement | null = document.querySelector(
      `#todo-edit-label-${index}`
    );
    label?.focus();
  }

  cancelEditing(index: number): void {
    this.todos[index].isBeingEdited = false;
  }

  async finishEditing(index: number): Promise<void> {
    const edit: HTMLInputElement | null = document.querySelector(
      `#todo-edit-${index}`
    );
    if (edit) {
      const title = edit.value;
      const id = this.todos[index].id;
      await this.todoService.update({ id, title });
    }
  }
}
