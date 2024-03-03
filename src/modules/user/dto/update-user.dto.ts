import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { RoleEnum } from 'src/common/enums/enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
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
