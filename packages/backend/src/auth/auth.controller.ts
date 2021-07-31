import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const token = await this.authService.login(loginUserDto);
    res.cookie('Authentication', token, {
      httpOnly: true,
      path: '/',
      expires: new Date(
        Date.now() + Number(process.env.EXPIRATION_TIME) * 1000,
      ),
    });
    res.status(HttpStatus.OK).send();
  }
  @UseGuards(AuthGuard)
  @Post('/logout')
  logout(@Res() res: Response) {
    res.cookie('Authentication', '', {
      httpOnly: true,
      path: '/',
      expires: new Date(),
      maxAge: 0,
    });
    res.status(HttpStatus.OK).send();
  }
}
