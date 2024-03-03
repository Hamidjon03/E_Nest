import { ID } from 'src/common/types/type';
import { CompanyEntity } from '../entities/company.entity';
import { UpdateCompanyDto } from '../dto/update-company.dto';

export interface ICopmanyRepository {
  insert(entity: CompanyEntity): Promise<CompanyEntity>;
  findOneById(id: ID): Promise<CompanyEntity | undefined>;
  findOneByName(name: string): Promise<CompanyEntity | undefined>;
  findAll(): Promise<Array<CompanyEntity>>;
  update(id: ID, dto: UpdateCompanyDto): Promise<CompanyEntity | undefined>;
  delete(id: ID): Promise<CompanyEntity>;
}
