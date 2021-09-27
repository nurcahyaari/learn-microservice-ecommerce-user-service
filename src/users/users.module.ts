import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthMiddleware } from 'src/external/auth/user-auth.middleware';
import { AuthModule } from 'src/external/auth/auth.module';
import { UsersController } from './handlers/http/users.controller';
import { UserRepository } from './repository/user.repo';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserAuthMiddleware)
      .exclude({
        path: '/v1/users/login',
        method: RequestMethod.POST,
      })
      .forRoutes(UsersController);
  }
}
