import { ID } from 'src/common/types/type';
import { UserTaskEntity } from '../entities/user-task.entity';

export interface IUserTaskRepository {
  insert(dto: UserTaskEntity): Promise<UserTaskEntity>;
  update(id: ID, dto: UserTaskEntity): Promise<UserTaskEntity>;
  delete(id: ID): Promise<UserTaskEntity | undefined>;
  getOneById(id: ID): Promise<UserTaskEntity | undefined>;
  getOneTaskId(taskId: ID): Promise<UserTaskEntity | undefined>;
  getOneUserId(userId: ID): Promise<UserTaskEntity | undefined>;
}
