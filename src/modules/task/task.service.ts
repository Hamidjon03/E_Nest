import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ResData } from 'src/lib/resData';
import { ID } from 'src/common/types/type';
import { ITaskService } from './interfaces/task.service';
import { TaskEntity } from './entities/task.entity';
import { ITaskRepository } from './interfaces/task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskNotFoundException } from './exception/task.exception';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService implements ITaskService {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
  ) {}

  async findOneByCompnayId(companyid: ID): Promise<ResData<TaskEntity>> {
    const foundTask = await this.taskRepository.getOneCompanyId(companyid);

    if (!foundTask) {
      throw new TaskNotFoundException();
    }

    return new ResData<TaskEntity>('success', 200, foundTask);
  }

  async create(createTaskDto: CreateTaskDto): Promise<ResData<TaskEntity>> {
    const newTaskEntity = new TaskEntity(createTaskDto);

    const newTask = await this.taskRepository.insert(newTaskEntity);

    return new ResData<TaskEntity>(
      'Task was created successfully',
      201,
      newTask,
    );
  }

  async findOneById(id: ID): Promise<ResData<TaskEntity | undefined>> {
    const foundTask = await this.taskRepository.getOneById(id);

    if (!foundTask) {
      throw new TaskNotFoundException();
    }

    return new ResData<TaskEntity>('success', 200, foundTask);
  }

  async update(
    id: ID,
    updateTaskDto: UpdateTaskDto,
  ): Promise<ResData<TaskEntity>> {
    const { data: foundTask } = await this.findOneById(id);

    foundTask.title = updateTaskDto.title;
    foundTask.description = updateTaskDto.description;
    foundTask.company_id = updateTaskDto.companyId;
    foundTask.created_by = updateTaskDto.createdBy;
    foundTask.last_updated_by = updateTaskDto.lastUpdatedBy;
    foundTask.day = updateTaskDto.day;

    const updatedTask = await this.taskRepository.update(id, foundTask);

    return new ResData<TaskEntity>(
      'Task was updated successfully',
      200,
      updatedTask,
    );
  }
  async delete(id: ID): Promise<ResData<TaskEntity>> {
    await this.findOneById(id);
    const deletedTask = await this.taskRepository.delete(id);

    return new ResData<TaskEntity>('Task was deleted', 200, deletedTask);
  }

}
