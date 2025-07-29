import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Employee } from './employee.entity';

@Entity()
export class ContactInfo {
  @PrimaryColumn()
  employeeId: number;

  @JoinColumn()
  @OneToOne(() => Employee)
  employee: Employee;

  @Column({ nullable: true })
  phone: string;

  @Column()
  email: string;
}
