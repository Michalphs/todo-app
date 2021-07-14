import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { PrismaService } from '../prisma.service';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [TodosController],
  providers: [TodosService, PrismaService, AuthService, UsersService],
})
export class TodosModule {}
