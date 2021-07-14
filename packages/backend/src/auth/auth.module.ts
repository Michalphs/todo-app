import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [UsersService, AuthService, PrismaService, ConfigService],
})
export class AuthModule {}
