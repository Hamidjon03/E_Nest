import { ID } from 'src/common/types/type';
import { ResData } from 'src/lib/resData';
import { UserTaskEntity } from '../entities/user-task.entity';
import { CreateUserTaskDto } from '../dto/create-user-task.dto';
import { UpdateUserTaskDto } from '../dto/update-user-task.dto';

export interface IUserTaskService {
  create(dto: CreateUserTaskDto): Promise<ResData<UserTaskEntity>>;
  update(id: ID, dto: UpdateUserTaskDto): Promise<ResData<UserTaskEntity>>;
  delete(id: ID): Promise<ResData<UserTaskEntity | undefined>>;
  getOneById(id: ID): Promise<UserTaskEntity | undefined>;
  getOneTaskId(taskId: ID): Promise<UserTaskEntity | undefined>;
  getOneUserId(userId: ID): Promise<UserTaskEntity | undefined>;
}
