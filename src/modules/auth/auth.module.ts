import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/userRepository';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/common/config/index';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: config.jwtSecretKey,
      signOptions: { expiresIn: config.jwtExpiredIn },
    }),
  ],
  controllers: [AuthController],
  providers: [
    { provide: 'IAuthService', useClass: AuthService },
    { provide: 'IUserService', useClass: UserService },
    { provide: 'IUserRepository', useClass: UserRepository },
  ],
})
export class AuthModule {}
