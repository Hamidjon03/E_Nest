import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './userRepository';

@Module({
  controllers: [UserController],
  providers: [
    { provide: 'IUserService', useClass: UserService },
    { provide: 'IUserRepository', useClass: UserRepository },
  ],
})
export class UserModule {}
