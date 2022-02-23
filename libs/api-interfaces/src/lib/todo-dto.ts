export interface ReadTodoDto {
  id: string;
  title: string;
}

export interface CreateTodoDto {
  title: string;
}

export type UpdateTodoDto = CreateTodoDto;
