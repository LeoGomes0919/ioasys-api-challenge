export enum SCHOLINGTYPE {
  Childish = 'Infantil',
  Fundamental = 'Fundamental',
  Average = 'Médio',
  Higher = 'Superior',
  Posgraduate = 'Pós-graduação',
  Master = 'Mestrado',
  Doctorate = 'Doutorado',
}

export interface ICreateUserDTO {
  id?: string;
  name: string;
  email: string;
  password: string;
  birthDate: Date;
  uf: string;
  city: string;
  schooling: SCHOLINGTYPE;
}
