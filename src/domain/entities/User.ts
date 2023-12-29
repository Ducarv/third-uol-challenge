import { IEvent } from './Event';

export interface IUser {
  id?: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  city: string;
  country: string;
  email: string;
  password: string;
  confirmPassword: string;
  events?: IEvent[];
}
