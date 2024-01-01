import { IUser } from '../domain/entities/User';

export interface UserRepository {
  signUp: (data: IUser) => Promise<Partial<IUser | undefined>>;
  signIn: (email: string) => Promise<Partial<IUser | undefined>>;
}
