import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { SystemUsersService } from './system-users.service';
import { SystemUsersController } from './handlers/http/system-users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemUsersRepository } from './repository/system-users.repository';
import { AuthModule } from 'src/external/auth/auth.module';
import { SystemUserAuthMiddleware } from 'src/external/auth/system-user-auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([SystemUsersRepository]), AuthModule],
  providers: [SystemUsersService],
  controllers: [SystemUsersController],
})
export class SystemUsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SystemUserAuthMiddleware)
      .exclude({
        path: '/v1/system-users/login',
        method: RequestMethod.POST,
      })
      .forRoutes(SystemUsersController);
  }
}
