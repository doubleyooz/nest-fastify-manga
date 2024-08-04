import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { AuthService } from './auth.service';
import { IUser } from 'src/models/users/user.interface';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(
    @CurrentUser() user: IUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log(console);
    return this.authService.login(user, response);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(
    @CurrentUser() user: IUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.logout(user, response);
  }
}
