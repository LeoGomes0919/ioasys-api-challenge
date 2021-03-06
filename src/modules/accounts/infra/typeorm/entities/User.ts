import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UserCompany } from './UserCompany';

import { SCHOLINGTYPE } from '../../../dtos/ICreateUserDTO';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: 'birth_date' })
  birthDate: Date;

  @Column()
  uf: string;

  @Column()
  city: string;

  @Column({ type: 'enum', enum: SCHOLINGTYPE })
  schooling: SCHOLINGTYPE;

  @Column({ name: 'admin' })
  isAdmin?: boolean;

  @OneToOne(() => UserCompany, userCompany => userCompany.user)
  userCompany: UserCompany;

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
