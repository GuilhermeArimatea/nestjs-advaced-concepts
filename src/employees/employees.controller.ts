import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { AssignManagerCommand } from './commands/assign-manager/assign-manager.command';
import { AssignManagerDto } from './commands/assign-manager/assign-manager.dto';
import { CreateEmployeeCommand } from './commands/create-employee/create-employee.command';
import { CreateEmployeeDto } from './commands/create-employee/create-employee.dto';
import { UpdateEmployeeCommand } from './commands/update-employee/update-employee.command';
import { UpdateEmployeeDto } from './commands/update-employee/update-employee.dto';
import { EmployeeDto } from './queries/get-employee/employee.dto';
import { GetEmployeeQuery } from './queries/get-employee/get.employee.query';

@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  async create(@Body() dto: CreateEmployeeDto) {
    const command = plainToInstance(CreateEmployeeCommand, dto);
    const id: number = await this.commandBus.execute(command);

    const query = plainToInstance(GetEmployeeQuery, { id: Number(id) });
    const employee: EmployeeDto = await this.queryBus.execute(query);
    return employee;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const query = plainToInstance(GetEmployeeQuery, { id: Number(id) });
    const employee: EmployeeDto = await this.queryBus.execute(query);

    return employee;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateEmployeeDto) {
    const command = plainToInstance(UpdateEmployeeCommand, {
      ...dto,
      id: Number(id),
    });

    const affectedRows: number = await this.commandBus.execute(command);

    if (!affectedRows) {
      throw new NotFoundException();
    }

    const query = plainToInstance(GetEmployeeQuery, { id: Number(id) });
    const employee: EmployeeDto = await this.queryBus.execute(query);
    return employee;
  }

  @Patch(':id/assign-manager')
  async assignManager(@Param('id') id: string, @Body() dto: AssignManagerDto) {
    const command = plainToInstance(AssignManagerCommand, {
      ...dto,
      id: Number(id),
    });

    const affectedRows: number = await this.commandBus.execute(command);

    if (!affectedRows) {
      throw new NotFoundException();
    }

    const query = plainToInstance(GetEmployeeQuery, { id: Number(id) });
    const employee: EmployeeDto = await this.queryBus.execute(query);
    return employee;
  }
}
