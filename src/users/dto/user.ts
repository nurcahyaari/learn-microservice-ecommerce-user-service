import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserLoginRequest {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UserInfoFromAuthRequest {
  @ApiProperty()
  @IsString()
  user_id: string;
}

export class UserLoginAccessTokenPayload {
  @ApiProperty()
  id: number;
  @ApiProperty()
  token_type: string;
  @ApiProperty()
  user: string;
  @ApiProperty()
  role: string;
  @ApiProperty()
  exp: number;
}

export class UserLoginRefreshTokenPayload extends UserLoginAccessTokenPayload {}

export class UserTokenResponse {
  @ApiProperty()
  access_token: UserLoginAccessTokenPayload;
  @ApiProperty()
  refresh_token: UserLoginRefreshTokenPayload;
}
