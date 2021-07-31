import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly userService: UsersService,
  ) {}
  async register(
    credentials: CreateUserDto,
  ): Promise<Omit<User, 'password' | 'token'>> {
    const user = await this.userService.findOne(credentials.email);

    if (user) {
      throw new ConflictException('Email is already in use');
    }

    return await this.userService.create({
      email: credentials.email,
      name: credentials.name,
      password: credentials.password,
    });
  }

  async login(credentials: LoginUserDto): Promise<string> {
    const user = await this.userService.findOne(credentials.email);

    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const isMatch = await bcrypt.compare(credentials.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const token = crypto.randomBytes(64).toString('hex');

    await this.prisma.session.create({
      data: {
        token,
        userId: user.id,
        expiration: new Date(
          new Date().setSeconds(
            new Date().getSeconds() + Number(process.env.EXPIRATION_TIME),
          ),
        ),
      },
    });

    return token;
  }

  async validateToken(token: string): Promise<User> {
    if (!token) {
      throw new UnauthorizedException();
    }

    const session = await this.prisma.session.findFirst({ where: { token } });

    if (!session) {
      throw new UnauthorizedException();
    }

    if (session.expiration < new Date()) {
      throw new UnauthorizedException();
    }

    const user = await this.prisma.user.findFirst({
      where: { sessions: { some: { token } } },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
