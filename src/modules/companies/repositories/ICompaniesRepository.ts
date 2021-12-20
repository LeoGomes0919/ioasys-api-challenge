import { ICreateCompanyDTO } from '../dtos/ICreateCompanyDTO';
import { Company } from '../infra/typeorm/entities/Company';

interface IRequest {
  name?: string;
  description?: string;
  foundedIn?: Date;
  occupationArea?: string;
  director?: string;
}

export interface ICompaniesRepository {
  create({
    name,
    description,
    foundedIn,
    occupationArea,
    director,
  }: ICreateCompanyDTO): Promise<Company>;
  findById(id: string): Promise<Company>;
  findByName(name: string): Promise<Company>;
  delete(id: string): Promise<void>;
  all({
    name,
    description,
    foundedIn,
    occupationArea,
    director,
  }: IRequest): Promise<Company[]>;
}
