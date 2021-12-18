import { Router } from "express";

import { accountsRoutes } from "./accounts.routes";
import { authRoutes } from "./authenticate.routes";

const accountRouter = Router();

accountRouter.use('/account', accountsRoutes);
accountRouter.use('sessions', authRoutes);

export { accountRouter };
