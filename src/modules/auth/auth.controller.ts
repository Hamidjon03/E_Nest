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
import { Auth } from 'src/common/decorators/Auth.decorator';
import { RoleEnum } from 'src/common/enums/enum';
import { CurrentUser } from 'src/common/decorators/CurrentUser.decorator';
import { UserEntity } from '../user/entities/user.entity';

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

  @Auth(RoleEnum.ADMIN, RoleEnum.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @CurrentUser() currentUser: UserEntity
    ) {
    const { data: foundUser } = await this.userService.findByLogin(
      registerDto.login,
    );

    if (foundUser) {
      throw new UserAlreadyExist();
    }
    
    if (currentUser.role === 'admin') {
      registerDto.companyId = currentUser.company_id
    }
    
    return await this.authService.register(registerDto);
  }
}
