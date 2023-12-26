import { UserRepository } from "../../../respository/user";
import { IUser } from "../../entities/User";

export class SignUpUserUseCase {
    constructor(private respotory: UserRepository) {}

    async execute(data: IUser) {
        const newUser = await this.respotory.signUp(data)

        return newUser;
    }
}