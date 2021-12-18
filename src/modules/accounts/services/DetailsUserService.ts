import { inject, injectable } from 'tsyringe';
import { validate } from 'uuid';

import { AppError } from '../../../shared/errors/AppError';
import { IUserResponseDTO } from '../dtos/IUserResponseDTO';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';
import { UserMap } from '../mapper/UserMap';

interface IRequest {
  id: string;
}

@injectable()
export class DetailsUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  async execute({ id }: IRequest): Promise<IUserResponseDTO> {
    const checkIsUuid = validate(id);

    if (!checkIsUuid) {
      throw new AppError('User not found');
    }

    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found');
    }

    return UserMap.toDTO(user);
  }
}
