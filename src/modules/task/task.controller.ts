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
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ITaskService } from './interfaces/task.service';
import { ApiTags } from '@nestjs/swagger';
import { RoleEnum } from 'src/common/enums/enum';
import { Auth } from 'src/common/decorators/Auth.decorator';
import { CurrentUser } from 'src/common/decorators/CurrentUser.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { AuthGuard } from '../auth/guards/auth.guard';

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(
    @Inject('ITaskService')
    private readonly taskService: ITaskService,
  ) {}

  @Auth(RoleEnum.ADMIN, RoleEnum.MANAGER, RoleEnum.SUPERADMIN)
  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    if (currentUser.role === 'admin' || currentUser.role === 'manager') {
      createTaskDto.companyId = currentUser.company_id;
    }
    return await this.taskService.create(createTaskDto);
  }

  @UseGuards(AuthGuard)
  @Get('companyId/:id')
  async findAll(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: UserEntity,
  ) {
    if (currentUser.role === 'superAdmin') {
      return await this.taskService.findByCompnayId(id);
    } else if (
      currentUser.role === 'manager' ||
      currentUser.role === 'admin' ||
      currentUser.role === 'worker'
    ) {
      return await this.taskService.findByCompnayId(currentUser.company_id);
    } else {
      return await this.taskService.findByCompnayId(currentUser.company_id);
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.taskService.findOneById(id);
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.MANAGER, RoleEnum.SUPERADMIN)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    if (currentUser.role === 'admin') {
      updateTaskDto.companyId = currentUser.company_id;
    }
    return await this.taskService.update(id, updateTaskDto);
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.SUPERADMIN)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: UserEntity,
  ) {
    const { data: currentTask } = await this.taskService.findOneById(id);
    if (
      currentUser.role === 'admin' &&
      currentUser.company_id === currentTask.company_id
    ) {
      return await this.taskService.delete(id);
    }
    return await this.taskService.delete(id);
  }
}
