import { Router } from "express";
import { companiesRoutes } from "./companies.routes";

const companyRoouter = Router();

companyRoouter.use('/companies', companiesRoutes);

export { companyRoouter }
