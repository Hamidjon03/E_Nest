import { Module } from '@nestjs/common';
import { UserTaskService } from './user-task.service';
import { UserTaskController } from './user-task.controller';
import { UserTaskRepository } from './user-task.repository';

@Module({
  controllers: [UserTaskController],
  providers: [
    { provide: 'IUserTaskService', useClass: UserTaskService },
    { provide: 'IUserTaskRepository', useClass: UserTaskRepository },
  ],
})
export class UserTaskModule {}
