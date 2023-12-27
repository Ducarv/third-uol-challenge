import { SignUpError } from "../../../providers/errors";
import { UserRepository } from "../../../respository/user";
import { IUser } from "../../entities/User";
import crypto from "node:crypto";

export class SignUpUserUseCase {
  constructor(private respotory: UserRepository) {}

  async execute(data: IUser) {
    try {
        const newUser = await this.respotory.signUp(data);
    
        const hashPassword = crypto
          .createHash("sha256")
          .update(data.password)
          .digest("hex");
        const hashPasswordConfirm = crypto
          .createHash("sha256")
          .update(data.confirmPassword)
          .digest("hex");
    
        const securityUser: IUser = {
          ...newUser,
          password: hashPassword,
          confirmPassword: hashPasswordConfirm
        };
    
        return securityUser;
    } catch(error: unknown) {
        if (error instanceof SignUpError) {
            throw new Error("Error to sign user up")
        }
    }
  }
}
