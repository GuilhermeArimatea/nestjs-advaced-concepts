import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { Employee } from 'src/employees/entities/employee.entity';
import { DataSource } from 'typeorm';
import { EmployeeDto } from './employee.dto';
import { GetEmployeeQuery } from './get.employee.query';

@QueryHandler(GetEmployeeQuery)
export class GetEmployeeHandler
  implements IQueryHandler<GetEmployeeQuery, EmployeeDto>
{
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async execute(query: GetEmployeeQuery): Promise<EmployeeDto> {
    const { id } = query;
    const data = await this.dataSource.manager.find(Employee, {
      where: { id },
      relations: ['contactInfo'],
    });

    if (!data.length) {
      throw new NotFoundException();
    }

    return data[0] as EmployeeDto;
  }
}
