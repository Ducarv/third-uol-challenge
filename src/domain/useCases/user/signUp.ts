import { SignUpError } from "../../../providers/errors";
import { UserRepository } from "../../../respository/user";
import { IUser } from "../../entities/User";
import crypto from "node:crypto";

export class SignUpUserUseCase {
  constructor(private respotory: UserRepository) {}

  async execute(data: IUser) {
    try {
        const newUser = await this.respotory.signUp(data);
    
        return newUser;
    } catch(error: unknown) {
        if (error instanceof SignUpError) {
            throw new Error("Error to sign user up")
        }
    }
  }
}
