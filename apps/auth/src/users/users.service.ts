import {
  Injectable,
  UnauthorizedException,
  NotAcceptableException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { CreateUserRequest } from './dto/create-user-request.dto';
import { UsersRepository } from './users.repository';

import { User } from './schemas/users.schema';
import { FilterQuery } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly configService: ConfigService,
  ) {}

  async createUser(request: CreateUserRequest) {
    try {
      const user = await this.usersRepository.create({
        ...request,
        password: await bcrypt.hash(
          request.password,
          this.configService.get<number>('HASH_SALT'),
        ),
      });

      return user;
    } catch (err) {
      throw new BadRequestException(
        err.code === 11000 ? 'Email already in use.' : err,
      );
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      throw new UnauthorizedException('Credentials are not valid');

    return user;
  }

  async getUser(getUserArgs: Partial<User>) {
    return this.usersRepository.findOne(getUserArgs);
  }

  async findAllUsers(getUserArgs: Partial<User>) {
    return this.usersRepository.find(getUserArgs);
  }

  async findUserAndUpdate(
    filterQuery: FilterQuery<User>,
    getUserArgs: Partial<User>,
  ) {
    return this.usersRepository.findOneAndUpdate(filterQuery, getUserArgs);
  }
}
