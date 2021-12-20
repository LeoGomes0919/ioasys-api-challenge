import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DetailsCompanyService } from '../../../services/DetailsCompanyService';

export class DetailsCompanyController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: userAuthenticated } = req.user;
    const { id } = req.params;
    const detailsCompanyService = container.resolve(DetailsCompanyService);

    const company = await detailsCompanyService.execute({
      id,
      userAuthenticated,
    });

    return res.status(200).json(company);
  }
}
