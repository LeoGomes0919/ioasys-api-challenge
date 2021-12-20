import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { OFFICETYPE } from '../dtos/ICreateUserCompanyDTO';
import { UsersCompaniesRepository } from '../infra/typeorm/repositories/UsersCompaniesRepository';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';

interface IRequest {
  user_id: string;
  company_id: string;
  userAuthenticated: string;
}

@injectable()
export class UnlinkUserCompanyService {
  constructor(
    @inject('UsersCompaniesRepository')
    private usersCompaniesRepository: UsersCompaniesRepository,

    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    user_id,
    company_id,
    userAuthenticated,
  }: IRequest): Promise<void> {
    const userCompanyAlreadyExists =
      await this.usersCompaniesRepository.findByUserId(user_id);

    if (!userCompanyAlreadyExists) {
      throw new AppError('User not linked to any company');
    }

    if (
      userCompanyAlreadyExists.company_id !== company_id ||
      userCompanyAlreadyExists.user_id !== user_id
    ) {
      throw new AppError('User or Company is not linked to each other');
    }

    const userAuth = await this.usersRepository.findById(userAuthenticated);

    const userAuthCompany = await this.usersCompaniesRepository.findByUserId(
      userAuthenticated,
    );

    if (!userAuth.isAdmin) {
      if (!userAuthCompany) {
        throw new AppError('Action not allowed', 403);
      }

      if (
        userAuthCompany.company_id !== company_id ||
        userAuthCompany.office === OFFICETYPE.Employee
      ) {
        throw new AppError('Action not allowed', 403);
      }
    }

    await this.usersCompaniesRepository.delete({ user_id });
  }
}
