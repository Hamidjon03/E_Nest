import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CompanyRepository } from './company.repository';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';

@Module({
  controllers: [CompanyController],
  providers: [
    { provide: 'ICompanyRepository', useClass: CompanyRepository },
    { provide: 'ICompanyService', useClass: CompanyService },
    { provide: 'IUserService', useClass: UserService },
    { provide: 'IUserRepository', useClass: UserRepository },
  ],
})
export class CompanyModule {}
