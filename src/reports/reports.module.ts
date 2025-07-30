import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { QueryHandlers } from './queries';
import { ReportsController } from './reports.controller';

@Module({
  controllers: [ReportsController],
  imports: [CqrsModule],
  providers: [...QueryHandlers],
})
export class ReportsModule {}
