import { Controller, Post, Body, Request, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    const { email, password } = body;
    return this.authService.validateUser(email, password );
  }

  @UseGuards(AuthGuard)
  @Get('validate-token')
  validateToken(@Req() req: Request) {
    return { valid: true };
  }

  
}