import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SystemUsersModule } from './system-users/system-users.module';
import { AuthModule } from './external/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.ROOT_DB_HOST,
      port: parseInt(process.env.ROOT_DB_PORT, 10),
      username: process.env.ROOT_DB_USER,
      password: process.env.ROOT_DB_PASS,
      database: process.env.ROOT_DB_NAME,
      autoLoadEntities: true,
      synchronize: process.env.ROOT_DB_AUTOSYNC === 'true',
    }),
    UsersModule,
    SystemUsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
