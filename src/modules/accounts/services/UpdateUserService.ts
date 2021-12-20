import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';

import { validate } from 'uuid';
import { AppError } from '../../../shared/errors/AppError';
import { User } from '../infra/typeorm/entities/User';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';
import { ICreateUserDTO, SCHOLINGTYPE } from '../dtos/ICreateUserDTO';
import { OFFICETYPE } from '../dtos/ICreateUserCompanyDTO';

@injectable()
export class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  async exceute({
    id,
    name,
    email,
    password,
    birthDate,
    city,
    uf,
    schooling,
    idAuthenticated,
  }: ICreateUserDTO): Promise<User> {
    const checkIsUuid = validate(id);

    if (!checkIsUuid) {
      throw new AppError('User not found', 404);
    }

    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const userCompanyAuth = await this.usersRepository.findById(
      idAuthenticated,
    );

    if (
      !userCompanyAuth.isAdmin &&
      user.id !== idAuthenticated &&
      (user.userCompany.company_id !== userCompanyAuth.userCompany.company_id ||
        userCompanyAuth.userCompany.office === OFFICETYPE.Employee)
    ) {
      throw new AppError('Access denied', 403);
    }

    if (!Object.values(SCHOLINGTYPE).includes(schooling)) {
      throw new AppError(
        'Invalid school education, accepted types [Infantil, Fundamental, Médio, Superior, Pós-graduação, Mestrado, Doutorado]',
      );
    }

    const pass = await hash(password, 8);

    Object.assign(user, {
      name,
      email,
      password: pass,
      birthDate,
      city,
      uf,
      schooling,
    });

    await this.usersRepository.create(user);
    user.password = '';

    return user;
  }
}
