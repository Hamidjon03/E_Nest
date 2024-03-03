import { ID } from 'src/common/types/type';
import { CompanyEntity } from '../entities/company.entity';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { ResData } from 'src/lib/resData';

export interface ICopmanyService {
  create(entity: CompanyEntity): Promise<ResData<CompanyEntity>>;
  findOneById(id: ID): Promise<ResData<CompanyEntity | undefined>>;
  findOneByName(name: string): Promise<ResData<CompanyEntity | undefined>>;
  findAll(): Promise<ResData<Array<CompanyEntity>>>;
  update(id: ID, dto: UpdateCompanyDto): Promise<ResData<CompanyEntity>>;
  delete(id: ID): Promise<ResData<CompanyEntity>>;
}
