import { inject, injectable } from 'tsyringe';

import { OFFICETYPE } from '../dtos/ICreateUserCompanyDTO';
import { CompaniesRepository } from '../../companies/infra/typeorm/repositories/CompaniesRepository';
import { UsersCompaniesRepository } from '../infra/typeorm/repositories/UsersCompaniesRepository';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';
import { AppError } from '../../../shared/errors/AppError';

interface IRequest {
  user_id: string;
  company_id: string;
  office: OFFICETYPE;
  userAuthenticated: string;
}

@injectable()
export class LinkUserCompanyService {
  constructor(
    @inject('UsersCompaniesRepository')
    private usersCompaniesRepository: UsersCompaniesRepository,

    @inject('UsersRepository')
    private usersRepository: UsersRepository,

    @inject('CompaniesRepository')
    private companiesRepository: CompaniesRepository,
  ) {}

  async execute({
    user_id,
    company_id,
    office,
    userAuthenticated,
  }: IRequest): Promise<void> {
    const companyAlreadyExists = await this.companiesRepository.findById(
      company_id,
    );

    if (!companyAlreadyExists) {
      throw new AppError('Company not found', 404);
    }

    const userAlreadyExists = await this.usersRepository.findById(user_id);

    if (!userAlreadyExists) {
      throw new AppError('User not found', 404);
    }

    const userAuth = await this.usersRepository.findById(userAuthenticated);

    const userAuthCompany = await this.usersCompaniesRepository.findByUserId(
      userAuthenticated,
    );

    if (!userAuth.isAdmin) {
      if (!userAuthCompany) {
        throw new AppError('Action not allowed', 403);
      }

      if (
        userAuthCompany.company_id !== company_id ||
        userAuthCompany.office === OFFICETYPE.Employee
      ) {
        throw new AppError('Action not allowed', 403);
      }
    }

    const userCompanyAlreadyExists =
      await this.usersCompaniesRepository.findByUserId(user_id);

    if (userCompanyAlreadyExists) {
      throw new AppError(
        'User linked to a company, operation not allowed',
        403,
      );
    }

    if (userAlreadyExists.isAdmin) {
      throw new AppError(
        'User administrators cannot be linked to companies',
        403,
      );
    }

    await this.usersCompaniesRepository.create({
      user_id,
      company_id,
      office,
    });
  }
}
