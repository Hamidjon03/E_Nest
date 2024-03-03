import { ID } from 'src/common/types/type';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { ResData } from 'src/lib/resData';
import { UpdateUserDto } from '../dto/update-user.dto';

export interface IUserService {
  create(dto: CreateUserDto): Promise<ResData<UserEntity>>;
  update(id: ID, dto: UpdateUserDto): Promise<ResData<UserEntity>>;
  delete(id: ID): Promise<ResData<UserEntity | undefined>>;
  findAll(): Promise<ResData<Array<UserEntity>>>;
  findOneById(id: ID): Promise<ResData<UserEntity | undefined>>;
  findByLogin(login: string): Promise<ResData<UserEntity | undefined>>;
}
