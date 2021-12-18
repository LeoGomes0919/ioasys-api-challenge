import { Router } from 'express';
import { CreateUserController } from '../controllers/CreateUserController';
import { DeleteUserController } from '../controllers/DeleteUserController';
import { DetailsUserController } from '../controllers/DetailsUserController';
import { ListUserController } from '../controllers/ListUserController';
import { UpdateUserController } from '../controllers/UpdateUserController';
import { ensureAuthenticated } from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';
import { ensureAdmin } from '../../../../../shared/infra/http/middlewares/ensureAdmin';

const accountsRoutes = Router();

const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const detailsUserController = new DetailsUserController();
const listUserController = new ListUserController();
const deleteUserController = new DeleteUserController();

accountsRoutes.post('/', createUserController.handle);
accountsRoutes.put('/:id', ensureAuthenticated, updateUserController.handle);
accountsRoutes.get('/:id', ensureAuthenticated, detailsUserController.handle);
accountsRoutes.post('/list', ensureAuthenticated, listUserController.handle);
accountsRoutes.delete(
  '/:id',
  ensureAuthenticated,
  ensureAdmin,
  deleteUserController.handle,
);

export { accountsRoutes };
