import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListAllUserService } from '../../../services/ListAllUserService';

export class ListUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, birthDate, uf, city, schooling } = req.body;

    const listAllUserService = container.resolve(ListAllUserService);

    const users = await listAllUserService.execute({
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
