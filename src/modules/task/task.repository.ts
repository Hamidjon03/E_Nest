import { Postgres } from 'src/lib/pg';
import { ID } from 'src/common/types/type';
import { ITaskRepository } from './interfaces/task.repository';
import { TaskEntity } from './entities/task.entity';

export class TaskRepository extends Postgres implements ITaskRepository {
  async getByCompanyId(id: number): Promise<Array<TaskEntity>> {
    return await this.fetchAll<TaskEntity, number>(
      `select * from tasks where company_id = $1`,
      id,
    );
  }
  async insert(dto: TaskEntity): Promise<TaskEntity> {
    return await this.fetch<TaskEntity, string | number | Date>(
      `insert into tasks (title, description, parent_id, company_id, created_by, last_updated_by, day) values ($1, $2, $3, $4, $5, $6, $7) returning *`,
      dto.title,
      dto.description,
      dto.parent_id,
      dto.company_id,
      dto.created_by,
      dto.last_updated_by,
      dto.day,
    );
  }
  async update(id: ID, dto: TaskEntity): Promise<TaskEntity> {
    return await this.fetch<TaskEntity, string | number | Date>(
      `update tasks 
      set title = $1, 
      description = $2, 
      parent_id = $3, 
      company_id = $4, 
      created_by = $5, 
      last_updated_by = $6, 
      day = $7
      where = id = $8
      returning *`,
      dto.title,
      dto.description,
      dto.parent_id,
      dto.company_id,
      dto.created_by,
      dto.last_updated_by,
      dto.day,
      id,
    );
  }
  async delete(id: ID): Promise<TaskEntity> {
    return await this.fetch<TaskEntity, number>(
      `delete from tasks where id = $1 returning *`,
      id,
    );
  }
  async getOneById(id: ID): Promise<TaskEntity> {
    return await this.fetch<TaskEntity, number>(
      `select * from tasks where id = $1`,
      id,
    );
  }
}
