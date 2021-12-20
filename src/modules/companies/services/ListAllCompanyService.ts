import { inject, injectable } from 'tsyringe';
import { Company } from '../infra/typeorm/entities/Company';
import { CompaniesRepository } from '../infra/typeorm/repositories/CompaniesRepository';

interface IRequest {
  name?: string;
  description?: string;
  foundedIn?: Date;
  occupationArea?: string;
  director?: string;
}

@injectable()
export class ListAllCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: CompaniesRepository,
  ) {}

  async execute({
    name,
    description,
    foundedIn,
    occupationArea,
    director,
  }: IRequest): Promise<Company[]> {
    const companies = await this.companiesRepository.all({
      name,
      description,
      foundedIn,
      occupationArea,
      director,
    });

    return companies;
  }
}
