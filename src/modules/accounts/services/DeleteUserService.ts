import { inject, injectable } from 'tsyringe';
import { validate } from 'uuid';
import { AppError } from '../../../shared/errors/AppError';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
}

@injectable()
export class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const checkIsUuid = validate(id);

    if (!checkIsUuid) {
      throw new AppError('User not found');
    }

    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    await this.usersRepository.delete(id);
  }
}
