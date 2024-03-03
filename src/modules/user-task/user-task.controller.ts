import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { UserTaskService } from './user-task.service';
import { CreateUserTaskDto } from './dto/create-user-task.dto';
import { UpdateUserTaskDto } from './dto/update-user-task.dto';
import { ApiTags } from '@nestjs/swagger';
import { ID } from 'src/common/types/type';

@ApiTags('user-task')
@Controller('user-task')
export class UserTaskController {
  constructor(
    @Inject('IUserTaskService')
    private readonly userTaskService: UserTaskService,
  ) {}

  @Post()
  async create(@Body() createUserTaskDto: CreateUserTaskDto) {
    return await this.userTaskService.create(createUserTaskDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: ID) {
    return await this.userTaskService.findOneById(id);
  }

  @Get(':id')
  async findOneByUserId(@Param('id', ParseIntPipe) id: ID) {
    return await this.userTaskService.findOneByUserId(id);
  }

  @Get(':id')
  async findOneByTaskId(@Param('id', ParseIntPipe) id: ID) {
    return await this.userTaskService.findOneByTaskId(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserTaskDto: UpdateUserTaskDto,
  ) {
    return await this.userTaskService.update(+id, updateUserTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.userTaskService.remove(id);
  }
}
