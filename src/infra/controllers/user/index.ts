import { SignUpUserUseCase } from "../../../domain/useCases/user/signUp";
import { UserPrismaRepository } from "../../../respository/implementation/user";
import { SignUpUserController } from "./signUp";

const prismaRepository = new UserPrismaRepository();
const signUpUserUseCase = new SignUpUserUseCase(prismaRepository);
const signUpUserController = new SignUpUserController(signUpUserUseCase);

export { signUpUserController };