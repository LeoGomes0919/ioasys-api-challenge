import { inject, injectable } from 'tsyringe';
import { hash, compare } from 'bcryptjs';

import { validate } from 'uuid';
import { AppError } from '../../../shared/errors/AppError';
import { User } from '../infra/typeorm/entities/User';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';
import { ICreateUserDTO, SCHOLINGTYPE } from '../dtos/ICreateUserDTO';

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
  }: ICreateUserDTO): Promise<User> {
    const checkIsUuid = validate(id);

    if (!checkIsUuid) {
      throw new AppError('User not found');
    }

    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found');
    }

    if (!Object.values(SCHOLINGTYPE).includes(schooling)) {
      throw new AppError('Invalid school education');
    }
    const comparePasswordChange = await compare(password, user.password);
    let pass = user.password;

    if (!comparePasswordChange) {
      pass = await hash(password, 8);
    }

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

    return user;
  }
}
