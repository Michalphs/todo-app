import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('/me')
  findMe(@Req() req) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = req.user;
    return rest;
  }
}
