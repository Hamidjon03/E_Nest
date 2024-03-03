import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserTaskModule } from './modules/user-task/user-task.module';
import { TaskModule } from './modules/task/task.module';
import { UserModule } from './modules/user/user.module';
import { CompanyModule } from './modules/company/company.module';

@Module({
  imports: [CompanyModule, UserModule, TaskModule, UserTaskModule, AuthModule],
})
export class AppModule {}
