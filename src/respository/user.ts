import { IUser } from "../domain/entities/User";

export interface UserRepository {
    signUp: (data: IUser) => Promise<IUser>;
    signIn: (email: string, password: string) => Promise<Partial<IUser>>
}