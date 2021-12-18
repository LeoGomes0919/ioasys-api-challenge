import { Router } from 'express';
import { AuthenticateUserController } from '../controllers/AuthenticateUserController';

const authRoutes = Router();

const authController = new AuthenticateUserController();

authRoutes.post('/', authController.handle);

export { authRoutes };
