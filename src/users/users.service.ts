import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { UserRepository } from './repository/user.repo';
import { compare } from 'bcryptjs';
import {
  UserInfoFromAuthRequest,
  UserLoginAccessTokenPayload,
  UserLoginRefreshTokenPayload,
  UserLoginRequest,
  UserTokenResponse,
} from './dto/user';
import { GenerateTokenExpTime } from './utils/generate-token-exp';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async LoginUserWithEmailPassword(
    userProps: UserLoginRequest,
  ): Promise<UserTokenResponse> {
    const user = await this.userRepository.FindByEmail(userProps.email);
    if (!user) {
      throw new Error('user not found');
    }

    const passwordMatch = await compare(userProps.password, user.password);
    if (!passwordMatch) {
      throw new Error("password did'n match");
    }

    const accessToken: UserLoginAccessTokenPayload = {
      id: user.user_id,
      token_type: 'access_token',
      user: user.name,
      role: 'customers',
      exp: GenerateTokenExpTime(10000),
    };

    const refreshToken: UserLoginRefreshTokenPayload = {
      id: user.user_id,
      token_type: 'refresh_token',
      user: user.name,
      role: 'customers',
      exp: GenerateTokenExpTime(36000),
    };

    const userTokenResponse: UserTokenResponse = {
      access_token: accessToken,
      refresh_token: refreshToken,
    };

    return userTokenResponse;
  }

  async GetProfile(userAuth: UserInfoFromAuthRequest): Promise<Users> {
    const user = await this.userRepository.findOne(userAuth.user_id);
    return user;
  }
}
