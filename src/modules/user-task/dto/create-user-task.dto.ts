import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsNumber, IsString, MinDate } from "class-validator"
import { StatusEnum } from "src/common/enums/enum";

export class CreateUserTaskDto {
  @ApiProperty({ type: Number })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ type: Number })
  @IsInt()
  @IsNotEmpty()
  taskId: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date())
  startAt: Date;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date())
  endAt: Date;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date())
  startedDate: Date;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date())
  endedDate: Date;

  @ApiProperty({ enum: StatusEnum })
  @IsString()
  status: StatusEnum;

  @ApiProperty({ type: Number })
  @IsNumber()
  createdBy: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  lastUpdatedBy: number;
}
