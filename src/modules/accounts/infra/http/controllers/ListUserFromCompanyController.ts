import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListUserFromCompanyService } from '../../../services/ListUserFromCompanyService';

export class ListUserFromCompanyController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, birthDate, uf, city, schooling, office } = req.body;
    const { id } = req.params;
    const { id: idAuthenticated } = req.user;

    const listUserFromCompanyService = container.resolve(
      ListUserFromCompanyService,
    );

    const users = await listUserFromCompanyService.execute({
      id,
      idAuthenticated,
      birthDate,
      city,
      email,
      name,
      schooling,
      uf,
      office,
    });

    return res.status(200).json(users);
  }
}
