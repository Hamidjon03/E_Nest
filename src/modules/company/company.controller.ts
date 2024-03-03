import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  Inject,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiTags } from '@nestjs/swagger';
import { CompanyALreadyExistException } from './exception/company.exception';
import { ID } from 'src/common/types/type';
import { RoleEnum } from 'src/common/enums/enum';
import { Auth } from 'src/common/decorators/Auth.decorator';
import { CurrentUser } from 'src/common/decorators/CurrentUser.decorator';
import { UserEntity } from '../user/entities/user.entity';

@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(
    @Inject('ICompanyService')
    private readonly companyService: CompanyService,
  ) {}

  @Post()
  @Auth(RoleEnum.SUPERADMIN)
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    const foundCompany = await this.companyService.findOneByName(
      createCompanyDto.name,
    );

    if (foundCompany.data) {
      throw new CompanyALreadyExistException();
    }

    return await this.companyService.create(createCompanyDto);
  }

  @Auth(RoleEnum.SUPERADMIN)
  @Get()
  async findAll() {
    return await this.companyService.findAll();
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.MANAGER, RoleEnum.WORKER)
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: ID,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return await this.companyService.findOneById(currentUser.id);
  }

  @Auth(RoleEnum.SUPERADMIN)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: ID,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return await this.companyService.update(id, updateCompanyDto);
  }

  @Auth(RoleEnum.SUPERADMIN)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: ID) {
    return await this.companyService.delete(id);
  }
}
