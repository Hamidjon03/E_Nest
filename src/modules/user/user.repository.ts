import { Postgres } from 'src/lib/pg';
import { IUserRepository } from './interfaces/user.repository';
import { UserEntity } from './entities/user.entity';
import { ID } from 'src/common/types/type';

export class UserRepository extends Postgres implements IUserRepository {
  async insert(dto: UserEntity): Promise<UserEntity> {
    return await this.fetch<UserEntity, string | number | Date>(
      `insert into users (login, password, full_name, company_id, created_by, last_updated_by, role) values ($1, $2, $3, $4, $5, $6, $7) returning *`,
      dto.login,
      dto.password,
      dto.full_name,
      dto.company_id,
      dto.created_by,
      dto.last_updated_by,
      dto.role,
    );
  }
  async update(id: ID, dto: UserEntity): Promise<UserEntity> {
    return await this.fetch<UserEntity, string | number | Date>(
      `update users 
      set login = $1, 
      password = $2, 
      full_name = $3, 
      company_id = $4, 
      created_by = $5,
      last_updated_by = $6, 
      role = $7
      where = id = $8
      returning *`,
      dto.login,
      dto.password,
      dto.full_name,
      dto.company_id,
      dto.created_by,
      dto.last_updated_by,
      dto.role,
      id,
    );
  }
  async delete(id: ID): Promise<UserEntity> {
    return await this.fetch<UserEntity, number>(
      `delete from users where id = $1 returning *`,
      id,
    );
  }
  async findAll(): Promise<Array<UserEntity>> {
    return await this.fetchAll<UserEntity>(`select * from users`);
  }
  async getOneById(id: ID): Promise<UserEntity> {
    return await this.fetch<UserEntity, number>(
      `select * from users where id = $1`,
      id,
    );
  }

  async getByCompanyId(id: ID): Promise<Array<UserEntity>> {
    return await this.fetchAll<UserEntity, number>(
      `select * from users where company_id = $1`,
      id,
    );
  }
  async findByLogin(login: string): Promise<UserEntity> {
    return await this.fetch<UserEntity, string>(
      `select * from users where login = $1`,
      login,
    );
  }
}
