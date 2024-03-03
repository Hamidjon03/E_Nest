import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { RoleEnum } from 'src/common/enums/enum';

// must write with class validator
export class CreateUserDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  companyId: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  createdBy: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  lastUpdatedBy: number;

  @ApiProperty({ enum: RoleEnum })
  @IsString()
  @IsNotEmpty()
  role: RoleEnum;
}
