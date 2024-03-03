import { ID } from 'src/common/types/type';
import { TaskEntity } from '../entities/task.entity';

export interface ITaskRepository {
  insert(dto: TaskEntity): Promise<TaskEntity>;
  update(id: ID, dto: TaskEntity): Promise<TaskEntity>;
  delete(id: ID): Promise<TaskEntity | undefined>;
  getOneById(id: ID): Promise<TaskEntity | undefined>;
  getByCompanyId(id: ID): Promise<Array<TaskEntity | undefined>>;
}
