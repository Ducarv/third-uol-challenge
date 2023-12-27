import { IUser } from "../../domain/entities/User";
import { prisma } from "../../infra/database";
import { UserRepository } from "../user";

export class UserPrismaRepository implements UserRepository {
    constructor() {};

    async signUp(data: IUser) {
        const newUser = await prisma.user.create({
            data: {
                ...data as Omit<IUser, "events">
            }
        })

        return newUser as Partial<IUser>;
    }

    async signIn(email: string, password: string) {
        const target = await prisma.user.findUnique({
            where: {
                email,
                password
            }
        })

        return target as Pick<IUser, "firstName" | "lastName" | "email">        
    }
}