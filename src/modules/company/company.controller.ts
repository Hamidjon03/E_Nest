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

@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(
    @Inject('ICompanyService')
    private readonly companyService: CompanyService,
  ) {}

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    const foundCompany = await this.companyService.findOneByName(
      createCompanyDto.name,
    );

    if (foundCompany.data) {
      throw new CompanyALreadyExistException();
    }

    return await this.companyService.create(createCompanyDto);
  }

  @Get()
  async findAll() {
    return await this.companyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: ID) {
    return await this.companyService.findOneById(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: ID,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return await this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: ID) {
    return await this.companyService.delete(id);
  }
}

