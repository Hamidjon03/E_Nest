import { Module } from '@nestjs/common';
import { UserTaskService } from './user-task.service';
import { UserTaskController } from './user-task.controller';

@Module({
  controllers: [UserTaskController],
  providers: [UserTaskService],
})
export class UserTaskModule {}
