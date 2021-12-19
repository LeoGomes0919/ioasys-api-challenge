import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { UsersRepository } from '../../accounts/infra/typeorm/repositories/UsersRepository';
import { ICreateCompanyDTO } from '../dtos/ICreateCompanyDTO';
import { Company } from '../infra/typeorm/entities/Company';
import { CompaniesRepository } from '../infra/typeorm/repositories/CompaniesRepository';

@injectable()
export class CreateCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: CompaniesRepository,
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    name,
    description,
    foundedIn,
    occupationArea,
    director,
  }: ICreateCompanyDTO): Promise<Company> {
    const companyAlreadyExists = await this.companiesRepository.findByName(
      name,
    );

    if (companyAlreadyExists) {
      throw new AppError('Company already exists');
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

    const company = await this.companiesRepository.create({
      name,
      description,
      foundedIn,
      occupationArea,
      director: user.name,
    });

    return company;
  }
}
