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
import { SystemUserLoginRequest } from 'src/system-users/dto/system_user.dto';
import { SystemUsersService } from 'src/system-users/system-users.service';

@Controller('/v1/system-users')
export class SystemUsersController {
  constructor(
    private readonly systemUserService: SystemUsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async LoginWithEmailPassword(@Body() body: SystemUserLoginRequest) {
    try {
      const user = await this.systemUserService.LoginWithEmailAndPassword(body);
      const userToken = this.authService.GenerateToken(user, 'admin');
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
      const user = this.systemUserService.GetProfile(req);
      return user;
    } catch (e) {
      return e.message;
    }
  }
}
