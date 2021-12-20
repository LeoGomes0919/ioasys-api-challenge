import { inject, injectable } from 'tsyringe';
import { validate } from 'uuid';
import { AppError } from '../../../shared/errors/AppError';
import { OFFICETYPE } from '../../accounts/dtos/ICreateUserCompanyDTO';
import { UsersCompaniesRepository } from '../../accounts/infra/typeorm/repositories/UsersCompaniesRepository';
import { UsersRepository } from '../../accounts/infra/typeorm/repositories/UsersRepository';
import { Company } from '../infra/typeorm/entities/Company';
import { CompaniesRepository } from '../infra/typeorm/repositories/CompaniesRepository';

interface IRequest {
  id: string;
  userAuthenticated: string;
}

@injectable()
export class DetailsCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: CompaniesRepository,

    @inject('UsersRepository')
    private usersRepository: UsersRepository,

    @inject('UsersCompaniesRepository')
    private usersCompaniesRepository: UsersCompaniesRepository,
  ) {}

  async execute({ id, userAuthenticated }: IRequest): Promise<Company> {
    const checkIsUuid = validate(id);

    if (!checkIsUuid) {
      throw new AppError('Company not found');
    }

    const userAuth = await this.usersRepository.findById(userAuthenticated);
    const userCompany = await this.usersCompaniesRepository.findByUserId(
      userAuthenticated,
    );
    if (!userAuth.isAdmin) {
      if (!userCompany) {
        throw new AppError('Access denied', 403);
      }

      if (
        userCompany.company_id !== id ||
        userCompany.office === OFFICETYPE.Employee
      ) {
        throw new AppError('Access denied', 403);
      }
    }

    const company = await this.companiesRepository.findById(id);

    if (!company) {
      throw new AppError('Company not found', 404);
    }

    return company;
  }
}
