import { Exclude, Expose } from 'class-transformer';
import { ContactInfoDto } from './contact-info.dto';

@Exclude()
export class EmployeeDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  managerId: number;

  @Expose()
  contactInfo?: ContactInfoDto;
}
