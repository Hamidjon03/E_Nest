import {
  Controller,
  Post,
  Body,
  Inject,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { IAuthService } from './interfaces/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { IUserService } from '../user/interfaces/user.service';
import { UserAlreadyExist } from '../user/exception/user.exception';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService') private readonly authService: IAuthService,
    @Inject('IUserService') private readonly userService: IUserService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const { data: foundUser } = await this.userService.findByLogin(
      registerDto.login,
    );

    if (foundUser) {
      throw new UserAlreadyExist();
    }
    return await this.authService.register(registerDto);
  }
}
