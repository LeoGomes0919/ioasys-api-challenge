import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { OFFICETYPE } from '../dtos/ICreateUserCompanyDTO';
import { SCHOLINGTYPE } from '../dtos/ICreateUserDTO';
import { UserCompany } from '../infra/typeorm/entities/UserCompany';
import { UsersCompaniesRepository } from '../infra/typeorm/repositories/UsersCompaniesRepository';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
  idAuthenticated: string;
  name?: string;
  email?: string;
  birthDate?: Date;
  uf?: string;
  city?: string;
  schooling?: SCHOLINGTYPE;
  office?: OFFICETYPE;
}

@injectable()
export class ListUserFromCompanyService {
  constructor(
    @inject('UsersCompaniesRepository')
    private usersCompaniesRepository: UsersCompaniesRepository,

    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    id,
    idAuthenticated,
    name,
    email,
    birthDate,
    uf,
    city,
    schooling,
    office,
  }: IRequest): Promise<UserCompany[]> {
    const user = await this.usersRepository.findById(idAuthenticated);

    let company_id = id;
    if (user.isAdmin && !id) {
      throw new AppError('Company not found', 404);
    }

    if (!user.isAdmin) {
      if (user.userCompany.office === OFFICETYPE.Employee) {
        throw new AppError('Access denied', 403);
      }

      company_id = user.userCompany.company_id;
      if (user.userCompany.company_id !== company_id) {
        throw new AppError('Access denied', 403);
      }
    }

    if (schooling) {
      if (!Object.values(SCHOLINGTYPE).includes(schooling)) {
        throw new AppError(
          'Invalid filter for schooling, accepted filters [Infantil, Fundamental, Médio, Superior, Pós-graduação, Mestrado, Doutorado]',
        );
      }
    }

    if (office) {
      if (!Object.values(OFFICETYPE).includes(office)) {
        throw new AppError(
          'Invalid office, accepted types [Diretor, Gestor, Empregado]',
        );
      }
    }

    const users = await this.usersCompaniesRepository.findUserByCompanyId({
      company_id,
      birthDate,
      city,
      email,
      name,
      schooling,
      uf,
      office,
    });

    return users;
  }
}
