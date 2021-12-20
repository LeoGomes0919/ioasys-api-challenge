import { getRepository, Repository } from 'typeorm';
import { ICreateCompanyDTO } from '../../../dtos/ICreateCompanyDTO';
import { ICompaniesRepository } from '../../../repositories/ICompaniesRepository';
import { Company } from '../entities/Company';

interface IRequest {
  name?: string;
  description?: string;
  foundedIn?: Date;
  occupationArea?: string;
  director?: string;
}

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

  async delete(id: string): Promise<void> {
    await this.ormRepository.softDelete(id);
  }

  async all({
    name,
    description,
    foundedIn,
    occupationArea,
    director,
  }: IRequest): Promise<Company[]> {
    const companiesQuery = this.ormRepository.createQueryBuilder('c');

    if (name) {
      companiesQuery.where('LOWER(c.name) like :name', {
        name: `%${name.toLowerCase()}%`,
      });
    }

    if (description) {
      companiesQuery.where('LOWER(c.description) like :description', {
        description: `%${description.toLowerCase()}%`,
      });
    }

    if (foundedIn) {
      companiesQuery.where('c.foundedIn = :foundedIn', { foundedIn });
    }

    if (occupationArea) {
      companiesQuery.where('LOWER(c.occupationArea) like :occupationArea', {
        occupationArea: `%${occupationArea.toLowerCase()}%`,
      });
    }

    if (director) {
      companiesQuery.where('LOWER(c.director) like :director', {
        director: `%${director.toLowerCase()}%`,
      });
    }

    const companies = await companiesQuery.getMany();
    return companies;
  }
}
