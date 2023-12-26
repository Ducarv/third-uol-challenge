import { IUser } from "../domain/entities/User";

export interface UserRepository {
    signUp: (data: IUser) => Promise<IUser>;
    signIn: (data: Pick<IUser, "email" | "password">) => Promise<Partial<IUser>>
}