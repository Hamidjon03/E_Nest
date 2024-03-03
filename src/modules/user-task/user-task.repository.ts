import { Postgres } from 'src/lib/pg';
import { IUserTaskRepository } from './interfaces/user-task.repository';
import { UserTaskEntity } from './entities/user-task.entity';
import { ID } from 'src/common/types/type';

export class UserTaskRepository
  extends Postgres
  implements IUserTaskRepository
{
  async insert(dto: UserTaskEntity): Promise<UserTaskEntity> {
    return await this.fetch<UserTaskEntity, string | number | Date>(
      `insert into user_tasks (user_id, task_id, start_at, end_at, started_date, ended_date, status, created_by,  last_updated_by) values ($1, $2, $3, $4, $5, $6, $7) returning *`,
      dto.user_id,
      dto.task_id,
      dto.start_at,
      dto.end_at,
      dto.started_date,
      dto.ended_date,
      dto.status,
      dto.created_by,
      dto.last_updated_by,
    );
  }
  async update(id: ID, dto: UserTaskEntity): Promise<UserTaskEntity> {
    return await this.fetch<UserTaskEntity, string | number | Date>(
      `update user_tasks 
      set user_id = $1, 
      task_id = $2, 
      start_at = $3, 
      end_at = $4, 
      started_date = $5, 
      ended_date = $6, 
      status = $7
      created_by = $7
      last_updated_by = $7
      where = id = $8
      returning *`,
      dto.user_id,
      dto.task_id,
      dto.start_at,
      dto.end_at,
      dto.started_date,
      dto.ended_date,
      dto.status,
      dto.created_by,
      dto.last_updated_by,
      id,
    );
  }
  async delete(id: ID): Promise<UserTaskEntity> {
    return await this.fetch<UserTaskEntity, number>(
      `delete from user_tasks where id = $1 returning *`,
      id,
    );
  }

  async getOneById(id: ID): Promise<UserTaskEntity> {
    return await this.fetch<UserTaskEntity, number>(
      `select * from user_tasks where id = $1`,
      id,
    );
  }
  async getOneTaskId(taskId: number): Promise<UserTaskEntity> {
    return await this.fetch<UserTaskEntity, number>(
      `select * from user_tasks where task_id = $1`,
      taskId,
    );
  }
  async getOneUserId(userId: number): Promise<UserTaskEntity> {
    return await this.fetch<UserTaskEntity, number>(
      `select * from user_tasks where user_id = $1`,
      userId,
    );
  }
}
