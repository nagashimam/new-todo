import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Todo } from '../model/todo.model';
import { TodoService } from '../service/todo/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  @ViewChild('todoInput')
  todoInput: ElementRef | undefined;

  todos: Partial<Todo>[] = [];

  constructor(
    private todoService: TodoService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.todoService.fetchTodo().subscribe((todos) => {
      this.todos = todos;
    });
  }

  async addTodo(): Promise<void> {
    const newTodoTitle = this.todoInput?.nativeElement.value;
    if (newTodoTitle) {
      const newTodo: Todo = {
        id: new Date().getMilliseconds().toLocaleString(),
        title: newTodoTitle,
        isBeingEdited: false,
      };
      await this.todoService.addTodo(newTodo);
    }
  }

  async markAsDone(id: string): Promise<void> {
    await this.todoService.markAsDone(id);
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
      const newTitle = edit.value;
      const newTodo: Partial<Todo> = {
        ...this.todos[index],
        title: newTitle,
        isBeingEdited: false,
      };
      await this.todoService.editTodo(newTodo);
    }
  }
}
