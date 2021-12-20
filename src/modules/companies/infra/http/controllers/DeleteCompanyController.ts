import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteCompanyService } from '../../../services/DeleteCompanyService';

export class DeleteCompanyController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteCompanyService = container.resolve(DeleteCompanyService);

    await deleteCompanyService.execute(id);

    return res.status(200).send();
  }
}
