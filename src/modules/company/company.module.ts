import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CompanyRepository } from './company.repository';

@Module({
  controllers: [CompanyController],
  providers: [
    { provide: 'ICompanyRepository', useClass: CompanyRepository },
    { provide: 'ICompanyService', useClass: CompanyService },
  ],
})
export class CompanyModule {}
