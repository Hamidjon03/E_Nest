import { Inject, Injectable } from '@nestjs/common';
import { CreateUserTaskDto } from './dto/create-user-task.dto';
import { UpdateUserTaskDto } from './dto/update-user-task.dto';
import { IUserTaskRepository } from './interfaces/user-task.repository';
import { ResData } from 'src/lib/resData';
import { UserTaskEntity } from './entities/user-task.entity';
import { ID } from 'src/common/types/type';
import { UserTaskNotFoundException } from './exception/user-task.exception';

@Injectable()
export class UserTaskService {
  constructor(
    @Inject('IUserTaskRepository')
    private readonly userTaskRepostiroy: IUserTaskRepository,
  ) {}

  async create(
    createUserTaskDto: CreateUserTaskDto,
  ): Promise<ResData<UserTaskEntity>> {
    const newUserTaskEntity = new UserTaskEntity(createUserTaskDto);

    const newUserTask = await this.userTaskRepostiroy.insert(newUserTaskEntity);

    return new ResData<UserTaskEntity>(
      'UserTask was created successfully',
      201,
      newUserTask,
    );
  }

  async findOneById(id: ID): Promise<ResData<UserTaskEntity>> {
    const foundUserTask = await this.userTaskRepostiroy.getOneById(id);

    if (!foundUserTask) {
      throw new UserTaskNotFoundException();
    }

    return new ResData<UserTaskEntity>('success', 200, foundUserTask);
  }

  async findOneByUserId(userId: ID): Promise<ResData<UserTaskEntity>> {
    const foundUserTask = await this.userTaskRepostiroy.getOneUserId(userId);

    if (!foundUserTask) {
      throw new UserTaskNotFoundException();
    }

    return new ResData<UserTaskEntity>('success', 200, foundUserTask);
  }

  async findOneByTaskId(taskId: ID): Promise<ResData<UserTaskEntity>> {
    const foundUserTask = await this.userTaskRepostiroy.getOneTaskId(taskId);

    if (!foundUserTask) {
      throw new UserTaskNotFoundException();
    }

    return new ResData<UserTaskEntity>('success', 200, foundUserTask);
  }

  async update(
    id: ID,
    updateUserTaskDto: UpdateUserTaskDto,
  ): Promise<ResData<UserTaskEntity>> {
    const { data: foundUserTask } = await this.findOneById(id);

    foundUserTask.user_id = updateUserTaskDto.userId;
    foundUserTask.task_id = updateUserTaskDto.taskId;
    foundUserTask.start_at = updateUserTaskDto.startAt;
    foundUserTask.end_at = updateUserTaskDto.endAt;
    foundUserTask.started_date = updateUserTaskDto.startedDate;
    foundUserTask.ended_date = updateUserTaskDto.endedDate;
    foundUserTask.status = updateUserTaskDto.status;
    foundUserTask.created_by = updateUserTaskDto.createdBy;
    foundUserTask.last_updated_by = updateUserTaskDto.lastUpdatedBy;
    const updatedTask = await this.userTaskRepostiroy.update(id, foundUserTask);

    return new ResData<UserTaskEntity>(
      'UserTask was updated successfully',
      200,
      updatedTask,
    );
  }

  async remove(id: ID): Promise<ResData<UserTaskEntity>> {
    await this.findOneById(id);
    const deletedTask = await this.userTaskRepostiroy.delete(id);

    return new ResData<UserTaskEntity>('Task was deleted', 200, deletedTask);
  }
}
