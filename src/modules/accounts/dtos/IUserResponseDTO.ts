import { SCHOLINGTYPE } from './ICreateUserDTO';

export interface IUserResponseDTO {
  id?: string;
  name: string;
  email: string;
  birthDate: Date;
  uf: string;
  city: string;
  isAdmin: boolean;
  schooling: SCHOLINGTYPE;
}
