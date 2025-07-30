import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandHandlers } from './commands';
import { EmployeesController } from './employees.controller';
import { ContactInfo } from './entities/contact-info.entity';
import { Employee } from './entities/employee.entity';
import { QueryHandlers } from './queries';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Employee, ContactInfo])],
  controllers: [EmployeesController],
  providers: [...QueryHandlers, ...CommandHandlers],
})
export class EmployeesModule {}
