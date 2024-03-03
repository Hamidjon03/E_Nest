import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyEntity } from './entities/company.entity';
import { ResData } from 'src/lib/resData';
import { ICopmanyService } from './interfaces/company.service';
import { ICopmanyRepository } from './interfaces/company.repository';
import { CompanyNotFoundException } from './exception/company.exception';

@Injectable()
export class CompanyService implements ICopmanyService {
  constructor(
    @Inject('ICompanyRepository')
    private readonly companyRepository: ICopmanyRepository,
  ) {}
  async create(dto: CreateCompanyDto): Promise<ResData<CompanyEntity>> {
    const newCompanyEntity = new CompanyEntity(dto);
    const newCompany = await this.companyRepository.insert(newCompanyEntity);

    return new ResData<CompanyEntity>(
      'company was created successfully',
      201,
      newCompany,
    );
  }

  async findAll(): Promise<ResData<Array<CompanyEntity>>> {
    const foundCompanies = await this.companyRepository.findAll();

    return new ResData<Array<CompanyEntity>>('success', 200, foundCompanies);
  }

  async findOneById(id: number): Promise<ResData<CompanyEntity | undefined>> {
    const foundCompany = await this.companyRepository.findOneById(id);
    if (!foundCompany) {
      throw new CompanyNotFoundException();
    }

    return new ResData<CompanyEntity>('success', 200, foundCompany);
  }

  async findOneByName(
    name: string,
  ): Promise<ResData<CompanyEntity | undefined>> {
    const foundCompany = await this.companyRepository.findOneByName(name);

    const response = new ResData<CompanyEntity>('success', 200, foundCompany);

    if (!foundCompany) {
      response.message = 'Category not found';
      response.statusCode = HttpStatus.NOT_FOUND;
    }

    return response;
  }

  async update(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<ResData<CompanyEntity>> {
    const foundCompany = await this.companyRepository.findOneById(id);
    if (!foundCompany) {
      throw new CompanyNotFoundException();
    }

    const updatedCompany = await this.companyRepository.update(
      id,
      updateCompanyDto,
    );

    return new ResData<CompanyEntity>(
      'company was updated successfully',
      200,
      updatedCompany,
    );
  }

  async delete(id: number): Promise<ResData<CompanyEntity | undefined>> {
    const foundCompany = await this.companyRepository.findOneById(id);
    if (!foundCompany) {
      throw new CompanyNotFoundException();
    }

    const deletedCompany = await this.companyRepository.delete(id);

    return new ResData('company was deleter successfully', 200, deletedCompany);
  }
}
