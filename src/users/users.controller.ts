import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const existingUser = this.usersService.getUserByEmailId(createUserDto.email);
    if (existingUser) {
      throw new NotFoundException('User with this email already exists');
    }
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAllUser();
  }

  @Get(':id')
  findOne(@Param('id') id: any) {
    return this.usersService.findOneUser(id);
  }

  @Patch(':id')
  update(@Param('id') id: any, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: any) {
    return this.usersService.removeUser(id);
  }
}
