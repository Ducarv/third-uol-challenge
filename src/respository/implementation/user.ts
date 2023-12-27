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

    async signIn(email: string) {
        const user = await prisma.user.findUnique({ where: { email } }) 
        const result = user as Pick<IUser, "firstName" | "lastName" | "email">
        return result
    }
}