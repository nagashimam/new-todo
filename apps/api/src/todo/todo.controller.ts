import { Controller, Post, Body, Patch, Delete, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Prisma } from '@prisma/client';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() data: Prisma.TodoCreateInput) {
    return this.todoService.create(data);
  }

  @Put()
  findMany(@Body() data: Prisma.TodoWhereInput) {
    const { userId } = data;
    return this.todoService.findMany({
      where: { userId },
      orderBy: { id: 'asc' },
    });
  }

  @Patch()
  update(@Body() param: Prisma.TodoUpdateInput & Prisma.TodoWhereUniqueInput) {
    const { id, ...data } = param;
    const where = { id: +id };
    return this.todoService.update(where, data);
  }

  @Delete()
  remove(@Body() where: Prisma.TodoWhereUniqueInput) {
    return this.todoService.remove(where);
  }
}
