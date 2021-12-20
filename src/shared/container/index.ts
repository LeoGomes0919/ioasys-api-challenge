import { container } from 'tsyringe';

import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersRepository';

import { ICompaniesRepository } from '../../modules/companies/repositories/ICompaniesRepository';
import { CompaniesRepository } from '../../modules/companies/infra/typeorm/repositories/CompaniesRepository';

import { IUsersCompaniesRepository } from '../../modules/accounts/repositories/IUsersCompaniesRepository';
import { UsersCompaniesRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersCompaniesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICompaniesRepository>(
  'CompaniesRepository',
  CompaniesRepository,
);

container.registerSingleton<IUsersCompaniesRepository>(
  'UsersCompaniesRepository',
  UsersCompaniesRepository,
);
