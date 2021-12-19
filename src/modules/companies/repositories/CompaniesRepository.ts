import { ICreateCompanyDTO } from '../dtos/ICreateCompanyDTO';
import { Company } from '../infra/typeorm/entities/Company';

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
}
