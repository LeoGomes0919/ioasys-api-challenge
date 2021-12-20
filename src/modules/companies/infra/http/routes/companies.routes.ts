import { Router } from 'express';
import { ensureAdmin } from '../../../../../shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';
import { CreateCompanyController } from '../controllers/CreateCompanyController';
import { DeleteCompanyController } from '../controllers/DeleteCompanyController';
import { DetailsCompanyController } from '../controllers/DetailsCompanyController';
import { ListAllCompanyController } from '../controllers/ListAllCompanyController';
import { UpdateCompanyController } from '../controllers/UpdateCompanyController';

const companiesRoutes = Router();

const createCompanyController = new CreateCompanyController();
const updatedCompanyController = new UpdateCompanyController();
const listAllCompanyController = new ListAllCompanyController();
const detailsCompanyController = new DetailsCompanyController();
const deleteCompanyController = new DeleteCompanyController();

companiesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCompanyController.handle,
);

companiesRoutes.put(
  '/:id',
  ensureAuthenticated,
  ensureAdmin,
  updatedCompanyController.handle,
);

companiesRoutes.post(
  '/list',
  ensureAuthenticated,
  ensureAdmin,
  listAllCompanyController.handle,
);

companiesRoutes.get(
  '/:id',
  ensureAuthenticated,
  detailsCompanyController.handle,
);

companiesRoutes.delete(
  '/:id',
  ensureAuthenticated,
  ensureAdmin,
  deleteCompanyController.handle,
);

export { companiesRoutes };
