import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWT_EXPIRATION_TIME_SPAN } from './constant';
import { JwtStrategy } from './jwt.strategy';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // using ASYNC because ConfigModule needs to be initialized first
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: JWT_EXPIRATION_TIME_SPAN,
        },
      }),
    }),
    // JwtModule.register({
    //   secret: 'topSecret42', // temp solution
    //   signOptions: {
    //     expiresIn: JWT_EXPIRATION_TIME_SPAN,
    //   },
    // }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UsersRepository],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
