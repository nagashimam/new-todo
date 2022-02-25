import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Prisma } from '@prisma/client';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() data: Prisma.TodoCreateInput) {
    return this.todoService.create(data);
  }

  @Get()
  findMany() {
    return this.todoService.findMany({ orderBy: { id: 'asc' } });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const where = { id: +id };
    return this.todoService.findOne(where);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.TodoUpdateInput) {
    const where = { id: +id };
    return this.todoService.update(where, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const where = { id: +id };
    return this.todoService.remove(where);
  }
}
