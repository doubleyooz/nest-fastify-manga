import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import ms from 'ms';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { TokenPayload } from './token-payload.interface';
import { IUser } from 'src/users/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async verifyUser(email: string, password: string) {
    try {
      const user = await this.usersService.getUser({ email });

      const authenticated = await bcrypt.compare(password, user.password);

      if (!authenticated) throw new UnauthorizedException();
      return user;
    } catch (err) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
  }

  async login(user: IUser, response: Response) {
    const expires = new Date();
    expires.setMilliseconds(
      expires.getMilliseconds() +
        ms(this.configService.get<string>('JWT_EXPIRATION')),
    );

    const tokenPayload: TokenPayload = {
      userId: user._id,
    };

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      secure: true,
      httpOnly: true,
      expires,
    });

    return { tokenPayload };
  }
}
