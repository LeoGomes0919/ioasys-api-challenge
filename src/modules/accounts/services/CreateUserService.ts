import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';
import { UserMap } from '../mapper/UserMap';

import { User } from '../infra/typeorm/entities/User';
import { ICreateUserDTO, SCHOLINGTYPE } from '../dtos/ICreateUserDTO';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';
import { AppError } from '../../../shared/errors/AppError';

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    name,
    email,
    password,
    birthDate,
    city,
    uf,
    schooling,
  }: ICreateUserDTO): Promise<User> {
    const userEmailAlreadyExists = await this.usersRepository.findByEmail(
      email,
    );

    if (userEmailAlreadyExists) {
      throw new AppError('Email address already exists');
    }

    if (!Object.values(SCHOLINGTYPE).includes(schooling)) {
      throw new AppError(
        'Invalid school education, accepted types [Infantil, Fundamental, Médio, Superior, Pós-graduação, Mestrado, Doutorado]',
      );
    }

    const passwordHashed = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHashed,
      birthDate,
      city,
      uf,
      schooling,
    });

    return UserMap.toDTO(user) as User;
  }
}
