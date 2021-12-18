import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUserService } from '../../../services/UpdateUserService';

export class UpdateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const { name, email, password, birthDate, uf, city, schooling } = req.body;

    const updateUserService = container.resolve(UpdateUserService);

    const user = await updateUserService.exceute({
      id,
      name,
      email,
      password,
      birthDate,
      uf,
      city,
      schooling,
    });

    return res.status(200).json(user);
  }
}
