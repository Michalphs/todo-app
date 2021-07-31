import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(user: CreateUserDto): Promise<Omit<User, 'password' | 'token'>> {
    const password = await bcrypt.hash(user.password, 10);

    const createdUser = await this.prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password,
      },
    });

    return {
      id: createdUser.id,
      email: createdUser.email,
      name: createdUser.name,
    };
  }

  async findOne(email: string): Promise<User | null> {
    return await this.prisma.user.findFirst({ where: { email } });
  }
}
