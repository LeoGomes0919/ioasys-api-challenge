import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { UsersCompaniesRepository } from '../../accounts/infra/typeorm/repositories/UsersCompaniesRepository';
import { CompaniesRepository } from '../infra/typeorm/repositories/CompaniesRepository';

@injectable()
export class DeleteCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: CompaniesRepository,

    @inject('UsersCompaniesRepository')
    private usersCompaniesRepository: UsersCompaniesRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const companyAlreadyExists = await this.companiesRepository.findById(id);

    if (!companyAlreadyExists) {
      throw new AppError('Company not found', 404);
    }

    await this.companiesRepository.delete(id);
    await this.usersCompaniesRepository.delete({ company_id: id });
  }
}
