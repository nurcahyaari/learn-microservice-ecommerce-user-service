import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { GenerateTokenExpTime } from 'src/users/utils/generate-token-exp';
import {
  SystemUserInfoFromAuthRequest,
  SystemUserLoginAccessTokenPayload,
  SystemUserLoginRefreshTokenPayload,
  SystemUserLoginRequest,
  SystemUserTokenResponse,
} from './dto/system_user.dto';
import { SystemUsers } from './entities/system-users.entity';
import { SystemUsersRepository } from './repository/system-users.repository';

export interface SystemUsersServiceInterface {
  LoginWithEmailAndPassword(
    userProps: SystemUserLoginRequest,
  ): Promise<SystemUserTokenResponse>;
}

@Injectable()
export class SystemUsersService implements SystemUsersServiceInterface {
  constructor(
    @InjectRepository(SystemUsersRepository)
    private readonly systemUserRepository: SystemUsersRepository,
  ) {}

  async LoginWithEmailAndPassword(
    userProps: SystemUserLoginRequest,
  ): Promise<SystemUserTokenResponse> {
    const user = await this.systemUserRepository.FindByEmail(userProps.email);
    if (!user) {
      throw new Error('user not found');
    }

    const passwordMatch = await compare(userProps.password, user.password);
    if (!passwordMatch) {
      throw new Error("password did'n match");
    }

    const accessToken: SystemUserLoginAccessTokenPayload = {
      id: user.system_user_id,
      token_type: 'access_token',
      user: user.name,
      role: 'admin',
      exp: GenerateTokenExpTime(10000),
    };

    const refreshToken: SystemUserLoginRefreshTokenPayload = {
      id: user.system_user_id,
      token_type: 'refresh_token',
      user: user.name,
      role: 'admin',
      exp: GenerateTokenExpTime(36000),
    };

    const userTokenResponse: SystemUserTokenResponse = {
      access_token: accessToken,
      refresh_token: refreshToken,
    };

    return userTokenResponse;
  }

  async GetProfile(
    userAuth: SystemUserInfoFromAuthRequest,
  ): Promise<SystemUsers> {
    return this.systemUserRepository.findOne(userAuth.system_user_id);
  }
}
