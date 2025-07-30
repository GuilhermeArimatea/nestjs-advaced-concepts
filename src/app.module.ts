import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { Meeting } from './entities/meeting.entity';
import { Task } from './entities/task.entity';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      synchronize: true,
      logging: false,
    }),
    TypeOrmModule.forFeature([Task, Meeting]),
    EmployeesModule,
    ReportsModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
