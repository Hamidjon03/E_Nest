import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ResData } from 'src/lib/resData';
import { IAuthService, ILoginData } from './interfaces/auth.service';
import { BcryptHashing } from 'src/lib/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IUserService } from '../user/interfaces/user.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { LoginOrPasswordWrong } from './exception/auth.exception';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IUserService') private readonly userService: IUserService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<ResData<ILoginData>> {
    const hashedPassword = await BcryptHashing.hash(dto.password);
    dto.password = hashedPassword;

    const { data: newUser } = await this.userService.create(dto);
    const token = await this.jwtService.signAsync({ id: newUser.id });

    return new ResData<ILoginData>(
      'User was created successfully',
      HttpStatus.CREATED,
      {
        user: newUser,
        token,
      },
    );
  }

  async login(dto: LoginDto): Promise<ResData<ILoginData>> {
    const { data: foundUser } = await this.userService.findByLogin(dto.login);

    if (!foundUser) {
      throw new LoginOrPasswordWrong();
    }

    const isMatch = await BcryptHashing.compare(
      dto.password,
      foundUser.password,
    );

    if (!isMatch) {
      throw new LoginOrPasswordWrong();
    }

    const token = await this.jwtService.signAsync({ id: foundUser.id });
    return new ResData<ILoginData>('Success', HttpStatus.OK, {
      user: foundUser,
      token,
    });
  }
}
