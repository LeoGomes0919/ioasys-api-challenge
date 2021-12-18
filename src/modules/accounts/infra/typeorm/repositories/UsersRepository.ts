import { getRepository, Repository } from 'typeorm';
import { ICreateUserDTO, SCHOLINGTYPE } from '../../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { User } from '../entities/User';

interface IRequest {
  name?: string;
  email?: string;
  birthDate?: Date;
  uf?: string;
  city?: string;
  schooling?: SCHOLINGTYPE;
}

export class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async create({
    id,
    name,
    email,
    birthDate,
    password,
    city,
    uf,
    schooling,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      id,
      name,
      email,
      password,
      birthDate,
      city,
      uf,
      schooling,
    });
    await this.ormRepository.save(user);
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.ormRepository.findOne({ email });
    return user;
  }

  async all({
    name,
    email,
    birthDate,
    uf,
    city,
    schooling,
  }: IRequest): Promise<User[]> {
    const usersQuery = this.ormRepository.createQueryBuilder('u');

    if (name) {
      usersQuery.where('u.name like :name', { name: `%${name}%` });
    }

    if (email) {
      usersQuery.andWhere('u.email like :email', { email: `%${email}%` });
    }

    if (birthDate) {
      usersQuery.andWhere('u.birth_date = :birthDate', { birthDate });
    }

    if (uf) {
      usersQuery.andWhere('u.uf like :uf', { uf: `%${uf}%` });
    }

    if (city) {
      usersQuery.andWhere('u.city like :city', { city: `%${city}%` });
    }

    if (schooling) {
      usersQuery.andWhere('u.schooling = :schooling', { schooling });
    }

    const users = await usersQuery.getMany();
    return users;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.softDelete(id);
  }
}
