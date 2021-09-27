import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { SystemUserTokenResponse } from 'src/system-users/dto/system_user.dto';
import { UserTokenResponse } from 'src/users/dto/user';

@Injectable()
export class AuthService {
  async GenerateToken(
    user: UserTokenResponse | SystemUserTokenResponse,
    userType: string,
  ) {
    try {
      const resp = await axios.post(
        `${process.env.SERVICE_AUTH_HOST}/auth/jwt/generator/${userType}`,
        {
          ...user,
        },
      );

      return resp.data;
    } catch (e) {
      throw new Error('error');
    }
  }
}
