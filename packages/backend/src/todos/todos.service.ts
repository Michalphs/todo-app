import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from '../prisma.service';
import { Status, User } from '@prisma/client';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createTodoDto: CreateTodoDto, user: User) {
    return await this.prisma.todo.create({
      data: {
        title: createTodoDto.title,
        content: createTodoDto.content,
        authorId: user.id,
      },
    });
  }

  async findAll(
    user: User,
    query: {
      skip?: number;
      take?: number;
      search?: string;
      orderBy?: 'asc' | 'desc';
      status?: Status;
    },
  ) {
    const { skip, take, orderBy, search, status } = query;

    const or = search
      ? {
          OR: [
            { title: { contains: search } },
            { content: { contains: search } },
          ],
        }
      : {};

    return await this.prisma.todo.findMany({
      skip: Number(skip) || 0,
      take: Number(take) || 5,
      where: { authorId: user.id, status, ...or },
      orderBy: {
        updatedAt: orderBy,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
