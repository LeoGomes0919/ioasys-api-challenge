import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UserCompany } from '../../../../accounts/infra/typeorm/entities/UserCompany';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column({ name: 'occupation_area' })
  occupationArea: string;

  @Column({ name: 'founded_in' })
  foundedIn: Date;

  @Column()
  description: string;

  @Column()
  director: string;

  @OneToMany(() => UserCompany, userCompany => userCompany.company)
  companyUser: UserCompany;

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
