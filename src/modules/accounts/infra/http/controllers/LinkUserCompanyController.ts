import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { LinkUserCompanyService } from '../../../services/LinkUserCompanyService';

export class LinkUserCompanyController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { user_id, company_id, office } = req.body;
    const { id: userAuthenticated } = req.user;

    const linkUserCompanyService = container.resolve(LinkUserCompanyService);

    await linkUserCompanyService.execute({
      user_id,
      company_id,
      office,
      userAuthenticated,
    });

    return res.status(201).send();
  }
}
