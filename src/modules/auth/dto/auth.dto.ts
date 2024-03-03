import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { RoleEnum } from 'src/common/enums/enum';

export class LoginDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RegisterDto {
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

  // @ApiProperty({ type: Number })
  // @IsNumber()
  companyId: number;

  // @ApiProperty({ type: Number })
  // @IsNumber()
  createdBy: number;

  // @ApiProperty({ type: Number })
  // @IsNumber()
  lastUpdatedBy: number;

  @ApiProperty({ enum: RoleEnum })
  @IsString()
  @IsNotEmpty()
  role: RoleEnum;
}
