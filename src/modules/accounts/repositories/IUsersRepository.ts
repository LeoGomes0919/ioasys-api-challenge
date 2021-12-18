import { ICreateUserDTO, SCHOLINGTYPE } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';

interface IRequest {
  name?: string;
  email?: string;
  birthDate?: Date;
  uf?: string;
  city?: string;
  schooling?: SCHOLINGTYPE;
}

export interface IUsersRepository {
  create({
    name,
    email,
    birthDate,
    password,
    city,
    uf,
    schooling,
  }: ICreateUserDTO): Promise<User>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  all({
    name,
    email,
    birthDate,
    uf,
    city,
    schooling,
  }: IRequest): Promise<User[]>;
  delete(id: string): Promise<void>;
}
