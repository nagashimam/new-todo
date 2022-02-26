import { Body, Controller, Get, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { HashService } from '../hash/hash.service';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private hashService: HashService
  ) {}

  @Post()
  create(@Body() data: Prisma.UserCreateInput) {
    data.password = this.hashService.hash(data.password);
    return this.userService.create(data);
  }

  @Get()
  findOne(@Body() where: Prisma.UserWhereUniqueInput) {
    return this.userService.findOne(where);
  }
}
