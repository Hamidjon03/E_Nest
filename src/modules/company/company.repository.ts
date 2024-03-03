import { Injectable } from '@nestjs/common';
import { Postgres } from 'src/lib/pg';
import { ICopmanyRepository } from './interfaces/company.repository';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyEntity } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { ID } from 'src/common/types/type';

@Injectable()
export class CompanyRepository extends Postgres implements ICopmanyRepository {
  async insert(entity: CreateCompanyDto): Promise<CompanyEntity> {
    return await this.fetch<CompanyEntity, string>(
      `insert into companies (name) values($1) returning *`,
      entity.name,
    );
  }
  async findOneById(id: ID): Promise<CompanyEntity> {
    return await this.fetch<CompanyEntity, ID>(
      `select * from companies where id = $1`,
      id,
    );
  }
  async findOneByName(name: string): Promise<CompanyEntity | undefined> {
    return await this.fetch<CompanyEntity, string>(
      `select * from companies where name = $1`,
      name,
    );
  }

  async findAll(): Promise<Array<CompanyEntity>> {
    return await this.fetchAll<CompanyEntity>('select * from companies');
  }
  async update(id: ID, dto: UpdateCompanyDto): Promise<CompanyEntity> {
    return await this.fetch<CompanyEntity, number | string>(
      `update companies 
      set name = $1 
      where id = $2
      returning *`,
      dto.name,
      id,
    );
  }
  async delete(id: number): Promise<CompanyEntity> {
    return await this.fetch<CompanyEntity, ID>(
      `delete from companies where id = $1 returning *`,
      id,
    );
  }
}
