import { ResData } from 'src/lib/resData';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { LoginDto, RegisterDto } from '../dto/auth.dto';

export interface ILoginData {
  user: UserEntity;
  token: string;
}

export interface IAuthService {
  login(dto: LoginDto): Promise<ResData<ILoginData>>;
  register(dto: RegisterDto): Promise<ResData<ILoginData>>;
}
