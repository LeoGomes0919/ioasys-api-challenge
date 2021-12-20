import { inject, injectable } from 'tsyringe';
import { validate } from 'uuid';

import { AppError } from '../../../shared/errors/AppError';
import { IUserResponseDTO } from '../dtos/IUserResponseDTO';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';
import { UserMap } from '../mapper/UserMap';

interface IRequest {
  id: string;
  userAuthenticated: string;
}

@injectable()
export class DetailsUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    id,
    userAuthenticated,
  }: IRequest): Promise<IUserResponseDTO> {
    const checkIsUuid = validate(id);

    if (!checkIsUuid) {
      throw new AppError('User not found', 404);
    }

    const userAuth = await this.usersRepository.findById(userAuthenticated);

    if (!userAuth.isAdmin && userAuthenticated !== id) {
      throw new AppError('User is not an administrator', 403);
    }

    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return UserMap.toDTO(user);
  }
}
