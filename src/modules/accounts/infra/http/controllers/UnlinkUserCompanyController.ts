import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UnlinkUserCompanyService } from '../../../services/UnlinkUserCompanyService';

export class UnlinkUserCompanyController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { user_id, company_id } = req.body;
    const { id: userAuthenticated } = req.user;

    const unlinkUserCompanyService = container.resolve(
      UnlinkUserCompanyService,
    );

    await unlinkUserCompanyService.execute({
      user_id,
      company_id,
      userAuthenticated,
    });

    return res.status(200).send();
  }
}
