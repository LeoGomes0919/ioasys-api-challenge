import { Router } from 'express';
import { CreateUserController } from '../controllers/CreateUserController';
import { DeleteUserController } from '../controllers/DeleteUserController';
import { DetailsUserController } from '../controllers/DetailsUserController';
import { ListUserController } from '../controllers/ListUserController';
import { UpdateUserController } from '../controllers/UpdateUserController';

const accountsRoutes = Router();

const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const detailsUserController = new DetailsUserController();
const listUserController = new ListUserController();
const deleteUserController = new DeleteUserController();

accountsRoutes.post('/', createUserController.handle);
accountsRoutes.put('/:id', updateUserController.handle);
accountsRoutes.get('/:id', detailsUserController.handle);
accountsRoutes.post('/list', listUserController.handle);
accountsRoutes.delete('/:id', deleteUserController.handle);

export { accountsRoutes };
