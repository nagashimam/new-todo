import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Todo, Prisma } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.TodoCreateInput): Promise<Todo> {
    return this.prisma.todo.create({ data });
  }

  findMany(params: {
    where?: Prisma.TodoWhereInput;
    orderBy?: Prisma.TodoOrderByWithRelationInput;
  }): Promise<Todo[]> {
    const { where, orderBy } = params;
    return this.prisma.todo.findMany({ where, orderBy });
  }

  findOne(where: Prisma.TodoWhereUniqueInput): Promise<Todo> {
    return this.prisma.todo.findUnique({ where });
  }

  update(
    where: Prisma.TodoWhereUniqueInput,
    data: Prisma.TodoUpdateInput
  ): Promise<Todo> {
    return this.prisma.todo.update({ where, data });
  }

  remove(where: Prisma.TodoWhereUniqueInput): Promise<Todo> {
    return this.prisma.todo.delete({ where });
  }
}
