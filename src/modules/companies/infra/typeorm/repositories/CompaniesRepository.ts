import { getRepository, Repository } from 'typeorm';
import { ICreateCompanyDTO } from '../../../dtos/ICreateCompanyDTO';
import { ICompaniesRepository } from '../../../repositories/CompaniesRepository';
import { Company } from '../entities/Company';

export class CompaniesRepository implements ICompaniesRepository {
  private ormRepository: Repository<Company>;

  constructor() {
    this.ormRepository = getRepository(Company);
  }

  async create({
    id,
    name,
    description,
    foundedIn,
    occupationArea,
    director,
  }: ICreateCompanyDTO): Promise<Company> {
    const company = this.ormRepository.create({
      id,
      name,
      description,
      foundedIn,
      occupationArea,
      director,
    });
    await this.ormRepository.save(company);
    return company;
  }

  async findById(id: string): Promise<Company> {
    const company = await this.ormRepository.findOne(id);
    return company;
  }

  async findByName(name: string): Promise<Company> {
    const company = await this.ormRepository.findOne({ name });
    return company;
  }
}
