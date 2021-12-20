import { SCHOLINGTYPE } from '../dtos/ICreateUserDTO';
import { UserCompany } from '../infra/typeorm/entities/UserCompany';

interface IRequest {
  user_id: string;
  company_id: string;
}

interface IRequestDelete {
  user_id?: string;
  company_id?: string;
}

interface IRequestFilter {
  company_id: string;
  name?: string;
  email?: string;
  birthDate?: Date;
  uf?: string;
  city?: string;
  schooling?: SCHOLINGTYPE;
}
export interface IUsersCompaniesRepository {
  create({ user_id, company_id }: IRequest): Promise<void>;
  findByUserId(id: string): Promise<UserCompany>;
  findUserByCompanyId({
    company_id,
    name,
    email,
    birthDate,
    uf,
    city,
    schooling,
  }: IRequestFilter): Promise<UserCompany[]>;
  delete({ user_id, company_id }: IRequestDelete): Promise<void>;
}
