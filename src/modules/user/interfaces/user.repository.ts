import { ID } from 'src/common/types/type';
import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  insert(dto: UserEntity): Promise<UserEntity>;
  update(id: ID, dto: UserEntity): Promise<UserEntity>;
  delete(id: ID): Promise<UserEntity | undefined>;
  findAll(): Promise<Array<UserEntity>>;
  getOneById(id: ID): Promise<UserEntity | undefined>;
  findByLogin(login: string): Promise<UserEntity | undefined>;
}
