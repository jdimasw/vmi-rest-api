import { Controller, Get, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { LoginUserDto } from './users/dto/login-user.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiTags('auth')
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Body() loginUserDto: LoginUserDto, @Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('userme')
  @ApiBearerAuth()
  getProfile(@Request() req) {
    return req.user;
  }
}
