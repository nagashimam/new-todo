import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthMiddleware } from '../auth/auth.middleware';

@Module({
  imports: [PrismaModule],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { method: RequestMethod.POST, path: '/todo' },
        { method: RequestMethod.PUT, path: '/todo' },
        { method: RequestMethod.PATCH, path: '/todo' },
        { method: RequestMethod.DELETE, path: '/todo' }
      );
  }
}
