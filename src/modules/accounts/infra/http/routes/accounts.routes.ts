/**
 * @api {post} /api/user Create user
 * @apiName Create new user
 * @apiPermission admin
 * @apiGroup User
 *
 * @apiParam  {String} [userName] username
 * @apiParam  {String} [email] Email
 * @apiParam  {String} [phone] Phone number
 * @apiParam  {String} [status] Status
 *
 * @apiSuccess (200) {Object} mixed `User` object
 */

import { Router } from 'express';
import { ListUserFromCompanyController } from '../controllers/ListUserFromCompanyController';
import { CreateUserController } from '../controllers/CreateUserController';
import { DeleteUserController } from '../controllers/DeleteUserController';
import { DetailsUserController } from '../controllers/DetailsUserController';
import { ListUserController } from '../controllers/ListUserController';
import { UpdateUserController } from '../controllers/UpdateUserController';
import { ensureAuthenticated } from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';
import { ensureAdmin } from '../../../../../shared/infra/http/middlewares/ensureAdmin';
import { LinkUserCompanyController } from '../controllers/LinkUserCompanyController';
import { UnlinkUserCompanyController } from '../controllers/UnlinkUserCompanyController';

const accountsRoutes = Router();

const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const detailsUserController = new DetailsUserController();
const listUserController = new ListUserController();
const deleteUserController = new DeleteUserController();
const listUserFromCompanyController = new ListUserFromCompanyController();
const linkUserCompanyController = new LinkUserCompanyController();
const unlinkUserCompanyController = new UnlinkUserCompanyController();

accountsRoutes.post('/', createUserController.handle);
accountsRoutes.put('/:id', ensureAuthenticated, updateUserController.handle);
accountsRoutes.get('/:id', ensureAuthenticated, detailsUserController.handle);
accountsRoutes.post(
  '/list',
  ensureAuthenticated,
  ensureAdmin,
  listUserController.handle,
);

accountsRoutes.delete(
  '/:id',
  ensureAuthenticated,
  ensureAdmin,
  deleteUserController.handle,
);

accountsRoutes.post(
  '/company/:id',
  ensureAuthenticated,
  listUserFromCompanyController.handle,
);

accountsRoutes.post(
  '/link/user_company',
  ensureAuthenticated,
  linkUserCompanyController.handle,
);

accountsRoutes.delete(
  '/unlink/user_company',
  ensureAuthenticated,
  unlinkUserCompanyController.handle,
);

export { accountsRoutes };
