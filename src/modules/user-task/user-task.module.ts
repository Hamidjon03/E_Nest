import { Module } from '@nestjs/common';
import { UserTaskService } from './user-task.service';
import { UserTaskController } from './user-task.controller';
import { UserTaskRepository } from './user-task.repository';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { TaskRepository } from '../task/task.repository';
import { TaskService } from '../task/task.service';

@Module({
  controllers: [UserTaskController],
  providers: [
    { provide: 'IUserTaskService', useClass: UserTaskService },
    { provide: 'IUserTaskRepository', useClass: UserTaskRepository },
    { provide: 'IUserService', useClass: UserService },
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'ITaskRepository', useClass: TaskRepository },
    { provide: 'ITaskService', useClass: TaskService },
  ],
})
export class UserTaskModule {}
