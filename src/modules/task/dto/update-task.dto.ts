import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: Number })
  @IsInt()
  parentId: number;

  @ApiProperty({ type: Number })
  @IsInt()
  @IsNotEmpty()
  companyId: number;

  @ApiProperty({ type: Number })
  @IsInt()
  @IsNotEmpty()
  createdBy: number;

  @ApiProperty({ type: Number })
  @IsInt()
  @IsNotEmpty()
  lastUpdatedBy: number;

  @ApiProperty({ type: Number })
  @IsInt()
  @IsNotEmpty()
  day: number;
}
