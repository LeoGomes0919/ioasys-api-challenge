import { Router } from 'express';
import { ensureAdmin } from '../../../../../shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';
import { CreateCompanyController } from '../controllers/CreateCompanyController';

const companiesRoutes = Router();

const createCompanyController = new CreateCompanyController();

companiesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCompanyController.handle,
);

export { companiesRoutes };
