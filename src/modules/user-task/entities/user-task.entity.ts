import { ID } from "src/common/types/type";
import { CreateUserTaskDto } from "../dto/create-user-task.dto";

export class UserTaskEntity {
  id: ID;
  user_id: number;
  task_id: number;
  start_at: Date;
  end_at: Date;
  started_date: Date;
  ended_date: Date;
  status: string;
  created_by: number;
  last_updated_by: number;

  constructor(dto: CreateUserTaskDto) {
    this.user_id = dto.userId;
    this.task_id = dto.taskId;
    this.start_at = dto.startAt;
    this.end_at = dto.endAt;
    this.started_date = dto.startedDate;
    this.ended_date = dto.endedDate;
    this.status = dto.status;
    this.created_by = dto.createdBy;
    this.last_updated_by = dto.lastUpdatedBy;
  }
}
