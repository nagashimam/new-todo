import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { HashModule } from '../hash/hash.module';

@Module({
  imports: [PrismaModule, HashModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
