import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DetailsUserService } from '../../../services/DetailsUserService';

export class DetailsUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const detailsUserService = container.resolve(DetailsUserService);

    const user = await detailsUserService.execute({ id });

    return res.status(200).json(user);
  }
}
