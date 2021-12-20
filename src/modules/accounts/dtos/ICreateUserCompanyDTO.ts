export enum OFFICETYPE {
  Director = 'Diretor',
  Manager = 'Gestor',
  Employee = 'Empregado',
}

export interface ICreateUserCompanyDTO {
  id?: string;
  user_id: string;
  company_id: string;
  office?: OFFICETYPE;
}
