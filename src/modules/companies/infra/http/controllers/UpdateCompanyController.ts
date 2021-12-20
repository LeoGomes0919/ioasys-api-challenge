import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateCompanyService } from '../../../services/UpdateCompanyService';

export class UpdateCompanyController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, description, foundedIn, occupationArea, director } = req.body;

    const updateCompanyService = container.resolve(UpdateCompanyService);

    const company = await updateCompanyService.execute({
      id,
      name,
      description,
      foundedIn,
      occupationArea,
      director,
    });

    return res.status(200).json(company);
  }
}
