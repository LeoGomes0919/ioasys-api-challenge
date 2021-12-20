import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { User } from './User';
import { Company } from '../../../../companies/infra/typeorm/entities/Company';
import { OFFICETYPE } from '../../../dtos/ICreateUserCompanyDTO';

@Entity('users_companies')
export class UserCompany {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  user_id: string;

  @Column()
  company_id: string;

  @Column({ type: 'enum', enum: OFFICETYPE })
  office: OFFICETYPE;

  @ManyToOne(() => Company, company => company.companyUser)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @OneToOne(() => User, user => user.userCompany)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
