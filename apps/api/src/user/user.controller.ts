import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
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

  @Put()
  async findOne(@Body() data: Omit<Prisma.UserCreateInput, 'Todo'>) {
    const { id, password } = data;
    const user = await this.userService.findOne({ id });
    if (user) {
      if (user.password === this.hashService.hash(password)) {
        return user;
      } else {
        throw new HttpException(
          'パスワードが間違っています',
          HttpStatus.UNAUTHORIZED
        );
      }
    } else {
      throw new HttpException('IDが間違っています', HttpStatus.UNAUTHORIZED);
    }
  }
}
