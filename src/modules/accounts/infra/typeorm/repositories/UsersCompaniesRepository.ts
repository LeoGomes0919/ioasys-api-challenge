import { getRepository, Repository } from 'typeorm';
import {
  ICreateUserCompanyDTO,
  OFFICETYPE,
} from '../../../dtos/ICreateUserCompanyDTO';
import { SCHOLINGTYPE } from '../../../dtos/ICreateUserDTO';
import { IUsersCompaniesRepository } from '../../../repositories/IUsersCompaniesRepository';
import { UserCompany } from '../entities/UserCompany';

interface IRequest {
  company_id: string;
  name?: string;
  email?: string;
  birthDate?: Date;
  uf?: string;
  city?: string;
  schooling?: SCHOLINGTYPE;
  office?: OFFICETYPE;
}

interface IRequestDelete {
  user_id?: string;
  company_id?: string;
}

export class UsersCompaniesRepository implements IUsersCompaniesRepository {
  private ormRepository: Repository<UserCompany>;

  constructor() {
    this.ormRepository = getRepository(UserCompany);
  }

  async create({
    user_id,
    company_id,
    office,
  }: ICreateUserCompanyDTO): Promise<void> {
    const userCompany = this.ormRepository.create({
      user_id,
      company_id,
      office,
    });
    await this.ormRepository.save(userCompany);
  }

  async delete({ user_id, company_id }: IRequestDelete): Promise<void> {
    await this.ormRepository.softDelete(user_id ? { user_id } : { company_id });
  }

  async findByUserId(id: string): Promise<UserCompany> {
    const userCompany = await this.ormRepository.findOne({ user_id: id });
    return userCompany;
  }

  async findUserByCompanyId({
    company_id,
    name,
    email,
    birthDate,
    uf,
    city,
    schooling,
    office,
  }: IRequest): Promise<UserCompany[]> {
    const usersQuery = this.ormRepository
      .createQueryBuilder('u')
      .innerJoinAndSelect('u.user', 'user')
      .where('u.company_id = :company_id', { company_id });

    if (name) {
      usersQuery.andWhere('LOWER(user.name) like :name', {
        name: `%${name.toLowerCase()}%`,
      });
    }

    if (email) {
      usersQuery.andWhere('LOWER(user.email) like :email', {
        email: `%${email.toLowerCase()}%`,
      });
    }

    if (birthDate) {
      usersQuery.andWhere('user.birth_date = :birthDate', { birthDate });
    }

    if (uf) {
      usersQuery.andWhere('LOWER(user.uf) like :uf', {
        uf: `%${uf.toLowerCase()}%`,
      });
    }

    if (city) {
      usersQuery.andWhere('LOWER(user.city) like :city', {
        city: `%${city.toLowerCase()}%`,
      });
    }

    if (schooling) {
      usersQuery.andWhere('user.schooling = :schooling', { schooling });
    }

    if (office) {
      usersQuery.andWhere('u.office = :office', { office });
    }

    const users = await usersQuery.getMany();
    return users;
  }
}
