import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../interfaces/token-payload.interface';

import { UsersService } from '../../models/users/users.service';
import { AUTHENTICATION_COOKIE } from '../constants/auth-cookie';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          console.log({ cookies: request?.cookies });
          return request?.cookies[AUTHENTICATION_COOKIE];
        },
      ]),
      secretOrKey: configService.get<string>('REFRESH_TOKEN_SECRET'),
      signOptions: {
        expiresIn: configService.get<string>('REFRESH_TOKEN_EXPIRATION') + 's',
      },
    });
  }

  async validate(token: TokenPayload) {
    try {
      console.log(token);
      const result = await this.usersService.getUser(
        {
          _id: token.userId,
          tokenVersion: token.tokenVersion,
        },
        { tokenVersion: true },
      );
      console.log('validate', result);
      return result;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException();
    }
  }
}
