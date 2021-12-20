import { inject, injectable } from 'tsyringe';
import { OFFICETYPE } from '../../accounts/dtos/ICreateUserCompanyDTO';
import { AppError } from '../../../shared/errors/AppError';
import { UsersCompaniesRepository } from '../../accounts/infra/typeorm/repositories/UsersCompaniesRepository';
import { UsersRepository } from '../../accounts/infra/typeorm/repositories/UsersRepository';
import { ICreateCompanyDTO } from '../dtos/ICreateCompanyDTO';
import { Company } from '../infra/typeorm/entities/Company';
import { CompaniesRepository } from '../infra/typeorm/repositories/CompaniesRepository';

@injectable()
export class UpdateCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: CompaniesRepository,

    @inject('UsersRepository')
    private usersRepository: UsersRepository,

    @inject('UsersCompaniesRepository')
    private usersCompaniesRepository: UsersCompaniesRepository,
  ) {}

  async execute({
    id,
    name,
    description,
    foundedIn,
    occupationArea,
    director,
  }: ICreateCompanyDTO): Promise<Company> {
    const company = await this.companiesRepository.findById(id);

    if (!company) {
      throw new AppError('Company not found', 404);
    }
    const emailDirector = director;
    const user = await this.usersRepository.findByEmail(emailDirector);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (user.isAdmin) {
      throw new AppError(
        'User administrators cannot be linked to companies',
        403,
      );
    }

    if (company.director !== user.name) {
      const userToBeRemoved = await this.usersRepository.findByName(
        company.director,
      );
      await this.usersCompaniesRepository.delete({
        user_id: userToBeRemoved.id,
      });
      await this.usersCompaniesRepository.create({
        user_id: user.id,
        company_id: company.id,
        office: OFFICETYPE.Director,
      });
    }

    Object.assign(company, {
      name,
      description,
      foundedIn,
      occupationArea,
      director: user.name,
    });

    await this.companiesRepository.create(company);

    return company;
  }
}
