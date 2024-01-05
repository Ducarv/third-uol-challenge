import { SignInUserUseCase } from '../../../domain/useCases/user/signIn';
import { SignUpUserUseCase } from '../../../domain/useCases/user/signUp';
import { UserPrismaRepository } from '../../../respository/implementation/user';
import { SignUpUserController } from './signUp';
import { SignInUserController } from './signIn';

const prismaRepository = new UserPrismaRepository();
const signUpUserUseCase = new SignUpUserUseCase(prismaRepository);
const signUpUserController = new SignUpUserController(signUpUserUseCase);

const signInUserUseCase = new SignInUserUseCase(prismaRepository);
const signInUserController = new SignInUserController(signInUserUseCase);

export { signUpUserController, signInUserController };
