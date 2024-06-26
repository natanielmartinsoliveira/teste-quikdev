import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserEntity } from './user.schema';
import { AuthGuard } from '../auth/auth.guard';
export class Token {
  sub: string;
  email : string;
  access_token: string;
}
export type RequestWithUser = Request & { user: UserEntity }

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  async me(@Req() request: RequestWithUser) {
    return this.userService.me(request.user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.user(id);
  }

  @Post('register')
  async register(@Body() body) {
    const { name, email, password } = body;
    return this.userService.register(name, email, password);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() post: UserEntity) {
    return this.userService.update(id, post);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

}