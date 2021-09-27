import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SystemUserLoginRequest {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SystemUserInfoFromAuthRequest {
  @ApiProperty()
  @IsString()
  system_user_id: string;
}

export class SystemUserLoginAccessTokenPayload {
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

export class SystemUserLoginRefreshTokenPayload extends SystemUserLoginAccessTokenPayload {}

export class SystemUserTokenResponse {
  @ApiProperty()
  access_token: SystemUserLoginAccessTokenPayload;
  @ApiProperty()
  refresh_token: SystemUserLoginRefreshTokenPayload;
}
