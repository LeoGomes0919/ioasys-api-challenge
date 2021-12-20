import { instanceToInstance } from 'class-transformer';

import { User } from '../infra/typeorm/entities/User';
import { IUserResponseDTO } from '../dtos/IUserResponseDTO';

export class UserMap {
  static toDTO({
    id,
    name,
    email,
    birthDate,
    city,
    uf,
    isAdmin,
    schooling,
    userCompany,
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      id,
      name,
      email,
      birthDate,
      city,
      uf,
      isAdmin,
      schooling,
      userCompany,
    });
    return user;
  }
}
