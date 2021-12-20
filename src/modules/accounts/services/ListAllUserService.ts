import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { SCHOLINGTYPE } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';
import { UserMap } from '../mapper/UserMap';

interface IRequest {
  name?: string;
  email?: string;
  birthDate?: Date;
  uf?: string;
  city?: string;
  schooling?: SCHOLINGTYPE;
}

@injectable()
export class ListAllUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    name,
    email,
    birthDate,
    uf,
    city,
    schooling,
  }: IRequest): Promise<User[]> {
    if (schooling) {
      if (!Object.values(SCHOLINGTYPE).includes(schooling)) {
        throw new AppError(
          'Invalid filter for schooling, accepted filters [Infantil, Fundamental, Médio, Superior, Pós-graduação, Mestrado, Doutorado]',
        );
      }
    }

    const users = await this.usersRepository.all({
      name,
      email,
      birthDate,
      uf,
      city,
      schooling,
    });

    return users.map(user => UserMap.toDTO(user) as User);
  }
}
