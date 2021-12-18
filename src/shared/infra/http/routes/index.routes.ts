import { Router } from 'express';
import { companyRoouter } from '../../../../modules/companies/infra/http/routes/index.routes';
import { accountRouter } from '../../../../modules/accounts/infra/http/routes/index.routes';

const routes = Router();

routes.use(accountRouter);
routes.use(companyRoouter);

export { routes };
