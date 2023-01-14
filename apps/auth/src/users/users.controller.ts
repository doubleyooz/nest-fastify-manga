import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateUserRequest } from './dto/create-user-request.dto';
import { UpdateUserRequest } from './dto/update-user-request.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('users')
  async createUser(@Body() request: CreateUserRequest) {
    return this.usersService.createUser(request);
  }

  @Get('users/findOne')
  async findOneUser(
    @Query('id') _id: Types.ObjectId,
    @Query('email') _email: string,
  ) {
    return this.usersService.getUser(_email ? { email: _email } : { _id: _id });
  }

  @Get('users')
  async findAllUsers(@Query('name') _name: string) {
    return this.usersService.findAllUsers(_name ? { name: _name } : {});
  }

  @Put('update')
  async updateUser(@Body() request: UpdateUserRequest) {
    return this.usersService.findUserAndUpdate({}, request);
  }
}
