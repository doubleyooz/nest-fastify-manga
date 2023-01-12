import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user-request.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Post('users')
  async createUser(@Body() request: CreateUserRequest) {
    return this.usersService.createUser(request);
  }
}
