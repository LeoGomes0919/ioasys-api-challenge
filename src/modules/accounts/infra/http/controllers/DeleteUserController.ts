import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteUserService } from '../../../services/DeleteUserService';

export class DeleteUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteUserService = container.resolve(DeleteUserService);

    await deleteUserService.execute({ id });

    return res.status(200).send();
  }
}
