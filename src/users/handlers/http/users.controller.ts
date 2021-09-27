import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from 'src/external/auth/auth.service';
import { UserLoginRequest } from 'src/users/dto/user';
import { UsersService } from 'src/users/users.service';

@Controller('/v1/users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async LoginWithEmailPassword(@Body() body: UserLoginRequest) {
    try {
      const user = await this.userService.LoginUserWithEmailPassword(body);
      const userToken = this.authService.GenerateToken(user, 'user');
      return userToken;
    } catch (e) {
      return e.message;
    }
  }

  @ApiBearerAuth('token')
  @Get('/profile')
  @HttpCode(HttpStatus.OK)
  async GetUserProfileByUserID(@Request() req) {
    try {
      const user = this.userService.GetProfile(req);
      return user;
    } catch (e) {
      return e.message;
    }
  }
}
