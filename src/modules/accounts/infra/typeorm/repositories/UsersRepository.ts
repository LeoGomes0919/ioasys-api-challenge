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
    const user = await this.ormRepository.findOne({
      where: { id },
      relations: ['userCompany', 'userCompany.company'],
    });

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
      usersQuery.where('LOWER(u.name) like :name', {
        name: `%${name.toLowerCase()}%`,
      });
    }

    if (email) {
      usersQuery.andWhere('LOWER(u.email) like :email', {
        email: `%${email.toLowerCase()}%`,
      });
    }

    if (birthDate) {
      usersQuery.andWhere('u.birth_date = :birthDate', { birthDate });
    }

    if (uf) {
      usersQuery.andWhere('LOWER(u.uf) like :uf', {
        uf: `%${uf.toLowerCase()}%`,
      });
    }

    if (city) {
      usersQuery.andWhere('LOWER(u.city) like :city', {
        city: `%${city.toLowerCase()}%`,
      });
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

  async findByName(name: string): Promise<User> {
    const user = await this.ormRepository.findOne({ name });
    return user;
  }
}
