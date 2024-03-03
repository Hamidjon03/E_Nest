import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCompanyDto } from './create-company.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
