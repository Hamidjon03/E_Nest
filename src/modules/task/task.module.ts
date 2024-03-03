import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';

@Module({
  controllers: [TaskController],
  providers: [
    { provide: 'ITaskService', useClass: TaskService },
    { provide: 'ITaskRepository', useClass: TaskRepository },
    { provide: 'IUserService', useClass: UserService },
    { provide: 'IUserRepository', useClass: UserRepository },
  ],
})
export class TaskModule {}
