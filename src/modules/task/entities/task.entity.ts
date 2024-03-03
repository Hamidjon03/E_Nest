import { ID } from 'src/common/types/type';
import { CreateTaskDto } from '../dto/create-task.dto';

export class TaskEntity {
  id: ID;
  title: string;
  description: string;
  parent_id: number;
  company_id: number;
  created_by: number;
  last_updated_by: number;
  day: number;
  
  constructor(dto: CreateTaskDto) {
    this.title = dto.title;
    this.description = dto.description;
    this.parent_id = dto.parentId;
    this.company_id = dto.companyId;
    this.created_by = dto.createdBy;
    this.last_updated_by = dto.lastUpdatedBy;
    this.day = dto.day;
  }
}
