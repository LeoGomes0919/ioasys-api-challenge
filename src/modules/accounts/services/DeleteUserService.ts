import { inject, injectable } from 'tsyringe';
import { validate } from 'uuid';
import { AppError } from '../../../shared/errors/AppError';
import { UsersCompaniesRepository } from '../infra/typeorm/repositories/UsersCompaniesRepository';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
}

@injectable()
export class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
    @inject('UsersCompaniesRepository')
    private usersCompaniesRepository: UsersCompaniesRepository,
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const checkIsUuid = validate(id);

    if (!checkIsUuid) {
      throw new AppError('User not found', 404);
    }

    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    await this.usersRepository.delete(id);

    await this.usersCompaniesRepository.delete({
      user_id: user.id,
    });
  }
}
