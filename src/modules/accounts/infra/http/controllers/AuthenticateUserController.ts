import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticateUserService } from '../../../services/AuthenticateUserService';

export class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authUserService = container.resolve(AuthenticateUserService);

    const token = await authUserService.exceute({ email, password });
    return res.status(200).json(token);
  }
}
