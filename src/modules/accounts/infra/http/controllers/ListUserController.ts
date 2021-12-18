import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListUserService } from '../../../services/ListUserService';

export class ListUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, birthDate, uf, city, schooling } = req.body;

    const listUserService = container.resolve(ListUserService);

    const users = await listUserService.execute({
      name,
      email,
      birthDate,
      uf,
      city,
      schooling,
    });

    return res.status(200).json(users);
  }
}
