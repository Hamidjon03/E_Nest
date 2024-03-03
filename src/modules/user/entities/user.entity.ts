import { ID } from 'src/common/types/type';
import { CreateUserDto } from '../dto/create-user.dto';
import { RoleEnum } from 'src/common/enums/enum';

export class UserEntity {
  id: ID;
  login: string;
  password: string;
  full_name: string;
  company_id: number;
  created_at: Date;
  last_updated_at: Date;
  created_by: number;
  last_updated_by: number;
  role: RoleEnum;

  constructor(dto: CreateUserDto) {
    this.login = dto.login;
    this.password = dto.password;
    this.full_name = dto.fullName;
    this.company_id = dto.companyId;
    this.created_at = dto.createdAt;
    this.last_updated_at = dto.lastUpdatedAt;
    this.created_by = dto.createdBy;
    this.last_updated_by = dto.lastUpdatedBy;
    this.role = dto.role;
  }
}
