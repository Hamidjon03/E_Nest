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
import { CreateUserTaskDto } from './dto/create-user-task.dto';
import { UpdateUserTaskDto } from './dto/update-user-task.dto';
import { ApiTags } from '@nestjs/swagger';
import { ID } from 'src/common/types/type';
import { RoleEnum } from 'src/common/enums/enum';
import { Auth } from 'src/common/decorators/Auth.decorator';
import { CurrentUser } from 'src/common/decorators/CurrentUser.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { IUserTaskService } from './interfaces/user-task.service';
import { ITaskService } from '../task/interfaces/task.service';
import { IUserService } from '../user/interfaces/user.service';
import { UserTaskService } from './user-task.service';
import { AuthGuard } from '../auth/guards/auth.guard';

@ApiTags('user-task')
@Controller('user-task')
export class UserTaskController {
  constructor(
    @Inject('IUserTaskService')
    private readonly userTaskService: UserTaskService,
    @Inject('ITaskService')
    private readonly taskService: ITaskService,
    @Inject('IUserService')
    private readonly userService: IUserService,
  ) {}

  @Auth(RoleEnum.SUPERADMIN, RoleEnum.ADMIN, RoleEnum.MANAGER)
  @Post()
  async create(
    @Body() createUserTaskDto: CreateUserTaskDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    if (currentUser.role !== 'superAdmin') {
      const { data: foundTask } = await this.taskService.findOneById(
        createUserTaskDto.taskId,
      );
      const { data: foundUser } = await this.userService.findOneById(
        createUserTaskDto.userId,
      );
      if (
        currentUser.company_id === foundTask.company_id &&
        currentUser.company_id === foundUser.company_id
      ) {
        return await this.userTaskService.create(createUserTaskDto);
      }
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: ID) {
    return await this.userTaskService.findOneById(id);
  }

  @UseGuards(AuthGuard)
  @Get('userId/:id')
  async findOneByUserId(@Param('id', ParseIntPipe) id: ID) {
    return await this.userTaskService.findOneByUserId(id);
  }

  @UseGuards(AuthGuard)
  @Get('taskId/:id')
  async findOneByTaskId(@Param('id', ParseIntPipe) id: ID) {
    return await this.userTaskService.findOneByTaskId(id);
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.MANAGER, RoleEnum.SUPERADMIN)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserTaskDto: UpdateUserTaskDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    if (currentUser.role !== 'superAdmin') {
      const { data: foundTask } = await this.taskService.findOneById(
        updateUserTaskDto.taskId,
      );
      const { data: foundUser } = await this.userService.findOneById(
        updateUserTaskDto.userId,
      );
      if (
        currentUser.company_id === foundTask.company_id &&
        currentUser.company_id === foundUser.company_id
      ) {
        return await this.userTaskService.update(id, updateUserTaskDto);
      }
    }
    return await this.userTaskService.update(id, updateUserTaskDto);
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.SUPERADMIN)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: UserEntity,
  ) {
    const { data: currentTask } = await this.userTaskService.findOneById(id);
    if (currentUser.role !== 'superAdmin') {
      const { data: foundTask } = await this.taskService.findOneById(
        currentTask.task_id,
      );
      const { data: foundUser } = await this.userService.findOneById(
        currentTask.task_id,
      );
      if (
        currentUser.company_id === foundTask.company_id &&
        currentUser.company_id === foundUser.company_id
      ) {
        return await this.userTaskService.remove(id);
      }
    }
    return await this.userTaskService.remove(id);
  }
}
