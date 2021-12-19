import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCompanyService } from '../../../services/CreateCompanyService';

export class CreateCompanyController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description, foundedIn, occupationArea, director } = req.body;

    const createCompanyService = container.resolve(CreateCompanyService);

    const company = await createCompanyService.execute({
      name,
      description,
      foundedIn,
      occupationArea,
      director,
    });

    return res.status(201).json(company);
  }
}
