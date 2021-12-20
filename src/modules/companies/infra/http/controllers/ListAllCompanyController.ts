import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListAllCompanyService } from '../../../services/ListAllCompanyService';

export class ListAllCompanyController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description, foundedIn, occupationArea, director } = req.body;

    const listAllCompaniesService = container.resolve(ListAllCompanyService);

    const companies = await listAllCompaniesService.execute({
      name,
      description,
      foundedIn,
      occupationArea,
      director,
    });

    return res.status(200).json(companies);
  }
}
