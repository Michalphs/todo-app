import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, AuthModule, TodosModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
