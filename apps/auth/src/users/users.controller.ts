import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateUserRequest } from './dto/create-user-request.dto';
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
    return this.usersService.getUser(_name ? { name: _name } : {});
  }
}
