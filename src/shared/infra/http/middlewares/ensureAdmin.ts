import { NextFunction, Request, Response } from 'express';
import { UsersRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UsersRepository';
import { AppError } from '../../../errors/AppError';

export async function ensureAdmin(
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  const { id } = req.user;

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(id);

  if (!user.isAdmin) {
    throw new AppError('User is not an administrator', 403);
  }

  next();
}
