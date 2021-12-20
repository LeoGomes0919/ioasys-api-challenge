import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserService } from '../../../services/CreateUserService';

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password, birthDate, uf, city, schooling } = req.body;

    const createUserSerice = container.resolve(CreateUserService);

    const user = await createUserSerice.execute({
      name,
      email,
      password,
      birthDate,
      city,
      uf,
      schooling,
    });

    return res.status(201).json(user);
  }
}
