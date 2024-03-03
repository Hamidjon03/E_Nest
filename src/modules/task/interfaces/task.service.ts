import { ID } from 'src/common/types/type';
import { ResData } from 'src/lib/resData';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskEntity } from '../entities/task.entity';

export interface ITaskService {
  create(dto: CreateTaskDto): Promise<ResData<TaskEntity>>;
  update(id: ID, dto: UpdateTaskDto): Promise<ResData<TaskEntity>>;
  delete(id: ID): Promise<ResData<TaskEntity | undefined>>;
  findOneById(id: ID): Promise<ResData<TaskEntity | undefined>>;
  findOneByCompnayId(id: ID): Promise<ResData<TaskEntity | undefined>>;
}
