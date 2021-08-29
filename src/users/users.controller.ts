import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UnauthorizedException, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { EncryptService } from '../encrypt.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly encryptService: EncryptService
  ) {}

  
  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createUserDto: CreateUserDto, @Request() req) {
    if(!this.usersService.isAdmin(req.user)){
      throw new UnauthorizedException();
    }
    createUserDto.id = this.usersService.randomId();
    createUserDto.password = this.encryptService.hashPassword(createUserDto.password);
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Request() req) {
    if(!this.usersService.isAdmin(req.user)){
      throw new UnauthorizedException();
    }

    if(updateUserDto.password) {
      updateUserDto.password = this.encryptService.hashPassword(updateUserDto.password);
    }
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string, @Request() req) {
    if(!this.usersService.isAdmin(req.user)){
      throw new UnauthorizedException();
    }

    return this.usersService.remove(+id);
  }

  @Post('checkpass/:id')
  checkPass(@Body() loginUserDto: LoginUserDto, @Param('id') id: string) {
    let user = this.usersService.findOne(+id);
    // console.log(user)
    return this.encryptService.checkPassword(loginUserDto.password, user.password);
  }
}
